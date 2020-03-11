# ShareTune

> お気に入りの音楽を見つけ、思いを共有するSNS

このプロジェクトは Nuxt.js と Firebase を利用したアプリケーションのサンプルです。

## 開発

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

### 環境変数の設定
``` bash
export FIREBASE_API_KEY=
export FIREBASE_AUTH_DOMAIN=
export FIREBASE_DATABASE_URL=
export FIREBASE_PROJECT_ID=
export FIREBASE_STORAGE_BUCKET=
export FIREBASE_MSG_SENDER_ID=
export FIREBASE_APP_ID=
export FIREBASE_MEASURE_ID=
```

### デプロイ
master ブランチに対しての push をトリガーにして CI (GitHub Actions) によって、Firebase Hosting にデプロイが行われます。
