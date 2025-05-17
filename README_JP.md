# F-ZERO クリア状況管理アプリ

## 起動方法

Windows環境でこのアプリを起動するには、以下の方法のいずれかを使用してください：

### 方法1: 付属のバッチファイルを使用する

プロジェクトフォルダにある `start-app.bat` ファイルをダブルクリックして実行します。

### 方法2: コマンドプロンプトを使用する

1. コマンドプロンプト（CMD）を起動します（PowerShellではなく）
2. プロジェクトフォルダに移動します：
   ```
   cd C:\dev\f-zero-completion
   ```
3. 以下のコマンドを実行します：
   ```
   npm run start-clear
   ```

### 方法3: Visual Studio Codeのターミナルを使用する

1. Visual Studio Codeでプロジェクトを開きます
2. 上部メニューの「ターミナル」→「新しいターミナル」を選択します
3. ターミナルのドロップダウンから「コマンドプロンプト」を選択します
4. 以下のコマンドを実行します：
   ```
   npm run start-clear
   ```

## トラブルシューティング

エラーが発生した場合は、以下の手順を試してください：

1. プロジェクトの `node_modules` フォルダを削除し、依存関係を再インストールします：
   ```
   rd /s /q node_modules
   npm install
   ```

2. Expoのキャッシュをクリアします：
   ```
   npm run start-clear
   ```

3. Windows環境でPowerShellを使用する場合は、管理者として以下を実行してから起動します：
   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   npm run start-clear
   ``` 