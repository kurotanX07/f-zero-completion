import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// モックIAP実装を常に使用
const IAP = {
  // モックIAP実装
  initConnection: async () => Promise.resolve(),
  endConnection: () => {},
  getSubscriptions: async () => Promise.resolve([]),
  getPurchaseHistory: async () => Promise.resolve([]),
  requestSubscription: async () => Promise.resolve(),
};

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
        // モックデータを使用
        console.log('モックIAPを使用します');
        setProducts(mockProducts);
        
        // ローカルに保存されたサブスクリプション情報を読み込み
        await loadSubscriptionStatus();
      } catch (error) {
        console.error('Failed to initialize IAP:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeIAP();
  }, []);

  // 購入履歴を確認
  const checkPurchaseHistory = async () => {
    try {
      // 過去の購入を取得
      const purchases: any[] = await IAP.getPurchaseHistory();
      
      // 有効なサブスクリプションがあるか確認
      const validSubscription = purchases.find((purchase: any) => {
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
      
      // 購入処理
      // 利用可能なサブスクリプション商品がない場合
      if (products.length === 0) {
        console.error('No subscription products available');
        return;
      }
      
      // モック購入処理
      console.log('モック購入を実行します');
      const newSubscriptionInfo: SubscriptionInfo = {
        isActive: true,
        expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30日後
        purchaseToken: 'mock-token',
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
      
      // モック復元処理
      console.log('モック購入復元を実行します');
      
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