import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 開発環境では直接IAPをインポートしない
const IAP = __DEV__ ? {
  // モックIAP実装
  initConnection: async () => Promise.resolve(),
  endConnection: () => {},
  getSubscriptions: async () => Promise.resolve([]),
  getPurchaseHistory: async () => Promise.resolve([]),
  requestSubscription: async () => Promise.resolve(),
} : require('react-native-iap');

// 保存キー
const SUBSCRIPTION_STORAGE_KEY = 'subscription_status';

// 月額サブスクリプションのSKU/Product ID
const SUBSCRIPTION_SKUS = Platform.select({
  ios: ['f_zero_subscription_monthly'],
  android: ['f_zero_subscription_monthly'],
}) || [];

// サブスクリプション情報の型
interface SubscriptionInfo {
  isActive: boolean;
  expiryDate: number | null;
  purchaseToken: string | null;
}

// モック商品の型
interface MockSubscription {
  title: string;
  description: string;
  price: string;
  localizedPrice: string;
  currency: string;
  productId: string;
}

// 購入情報の型
interface PurchaseInfo {
  productId: string;
  transactionReceipt?: string;
  [key: string]: any;
}

// コンテキストの型定義
interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionInfo: SubscriptionInfo;
  loading: boolean;
  products: any[]; // 開発環境と本番環境で型が異なるため any を使用
  purchaseSubscription: () => Promise<void>;
  restorePurchases: () => Promise<void>;
}

// デフォルトのサブスクリプション情報
const defaultSubscriptionInfo: SubscriptionInfo = {
  isActive: false,
  expiryDate: null,
  purchaseToken: null,
};

// モック商品データ
const mockProducts: MockSubscription[] = [{
  title: 'F-ZEROサブスクリプション月額',
  description: '広告非表示',
  price: '¥100',
  localizedPrice: '¥100',
  currency: 'JPY',
  productId: 'f_zero_subscription_monthly'
}];

// コンテキスト作成
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// コンテキストプロバイダーコンポーネント
export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>(defaultSubscriptionInfo);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);

  // サブスクリプション情報の初期化
  useEffect(() => {
    const initializeIAP = async () => {
      try {
        if (__DEV__) {
          // 開発環境ではモックデータを使用
          console.log('開発環境ではモックIAPを使用します');
          setProducts(mockProducts);
          
          // ローカルに保存されたサブスクリプション情報を読み込み
          await loadSubscriptionStatus();
        } else {
          // 本番環境ではIAPを初期化
          await IAP.initConnection();
          
          // サブスクリプションのアイテム情報を取得
          const subscriptions = await IAP.getSubscriptions({ skus: SUBSCRIPTION_SKUS });
          setProducts(subscriptions);

          // ローカルに保存されたサブスクリプション情報を読み込み
          await loadSubscriptionStatus();
          
          // 過去の購入情報からサブスクリプションを復元
          await checkPurchaseHistory();
        }
      } catch (error) {
        console.error('Failed to initialize IAP:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeIAP();

    // クリーンアップ
    return () => {
      if (!__DEV__) {
        IAP.endConnection();
      }
    };
  }, []);

  // 購入履歴を確認
  const checkPurchaseHistory = async () => {
    if (__DEV__) {
      // 開発環境ではスキップ
      return;
    }
    
    try {
      // 過去の購入を取得
      const purchases = await IAP.getPurchaseHistory();
      
      // 有効なサブスクリプションがあるか確認
      const validSubscription = purchases.find((purchase: PurchaseInfo) => {
        const sku = purchase.productId;
        // 有効かどうかの判定ロジック（実際にはプラットフォームごとに異なる）
        return SUBSCRIPTION_SKUS.includes(sku);
      });

      if (validSubscription) {
        // 有効なサブスクリプションが見つかった場合
        // 注: 実際のアプリではサーバー側でサブスクリプションの有効性を確認する必要がある
        const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // デモ用：30日後
        
        const newSubscriptionInfo: SubscriptionInfo = {
          isActive: true,
          expiryDate: expiryTime,
          purchaseToken: validSubscription.transactionReceipt || null,
        };
        
        setSubscriptionInfo(newSubscriptionInfo);
        await saveSubscriptionStatus(newSubscriptionInfo);
      }
    } catch (error) {
      console.error('Failed to check purchase history:', error);
    }
  };

  // 保存されたサブスクリプション情報を読み込む
  const loadSubscriptionStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
      if (jsonValue) {
        const savedInfo: SubscriptionInfo = JSON.parse(jsonValue);
        
        // 有効期限を確認
        if (savedInfo.expiryDate && savedInfo.expiryDate < Date.now()) {
          // 有効期限切れの場合はリセット
          await saveSubscriptionStatus(defaultSubscriptionInfo);
          setSubscriptionInfo(defaultSubscriptionInfo);
        } else {
          setSubscriptionInfo(savedInfo);
        }
      }
    } catch (error) {
      console.error('Failed to load subscription status:', error);
    }
  };

  // サブスクリプション情報を保存
  const saveSubscriptionStatus = async (info: SubscriptionInfo) => {
    try {
      const jsonValue = JSON.stringify(info);
      await AsyncStorage.setItem(SUBSCRIPTION_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Failed to save subscription status:', error);
    }
  };

  // サブスクリプションを購入する
  const purchaseSubscription = async () => {
    try {
      setLoading(true);
      
      if (__DEV__) {
        // 開発環境ではモック購入を実行
        console.log('開発環境ではモック購入を実行します');
        const newSubscriptionInfo: SubscriptionInfo = {
          isActive: true,
          expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30日後
          purchaseToken: 'dev-mock-token',
        };
        
        setSubscriptionInfo(newSubscriptionInfo);
        await saveSubscriptionStatus(newSubscriptionInfo);
        return;
      }
      
      // 本番環境での購入処理
      // 利用可能なサブスクリプション商品がない場合
      if (products.length === 0) {
        console.error('No subscription products available');
        return;
      }
      
      // 最初のサブスクリプション商品を購入
      await IAP.requestSubscription({
        sku: SUBSCRIPTION_SKUS[0],
        andDangerouslyFinishTransactionAutomaticallyIOS: false
      });
      
      // 購入リスナーでサブスクリプション情報を更新（実際のアプリでは購入リスナーで処理）
      // ここではデモのため直接更新
      const newSubscriptionInfo: SubscriptionInfo = {
        isActive: true,
        expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30日後
        purchaseToken: 'demo-token',
      };
      
      setSubscriptionInfo(newSubscriptionInfo);
      await saveSubscriptionStatus(newSubscriptionInfo);
    } catch (error) {
      console.error('Failed to purchase subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  // 過去の購入を復元
  const restorePurchases = async () => {
    try {
      setLoading(true);
      
      if (__DEV__) {
        // 開発環境では何もしない、または開発用のモック復元を実行
        console.log('開発環境では購入復元をスキップします');
        
        // デモンストレーション用：50%の確率で購入が見つかる
        if (Math.random() > 0.5) {
          const newSubscriptionInfo: SubscriptionInfo = {
            isActive: true,
            expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30日後
            purchaseToken: 'restored-mock-token',
          };
          
          setSubscriptionInfo(newSubscriptionInfo);
          await saveSubscriptionStatus(newSubscriptionInfo);
          console.log('モック購入が復元されました');
        } else {
          console.log('復元する購入が見つかりませんでした');
        }
        return;
      }
      
      await checkPurchaseHistory();
    } catch (error) {
      console.error('Failed to restore purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed: subscriptionInfo.isActive,
        subscriptionInfo,
        loading,
        products,
        purchaseSubscription,
        restorePurchases,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}; 