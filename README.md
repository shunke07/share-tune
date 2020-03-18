# ShareTune

> お気に入りの音楽を見つけ、思いを共有するSNS

このプロジェクトは Nuxt.js と Firebase を利用したアプリケーションのサンプルです。



## テスト

下記情報でログインできます。

- メールアドレス: sharetune.app@gmail.com

- パスワード: test123 

  

## 開発

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3333
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

firebase functions:config:set spotify.client_id={CLIENT_ID} 
firebase functions:config:set spotify.client_secret={CLIENT_SECRET}
```

### デプロイ

**Firebase Hosting**

master ブランチに対しての push をトリガーにして CI (GitHub Actions) によって、Firebase Hosting にデプロイが行われます。

**Cloud Functions**

`firebase deploy --only functions`



### コーディング

- SFC の記述に関しては、[Vue.js スタイルガイド](https://jp.vuejs.org/v2/style-guide/index.html) に従う

- SFC 内の CSS の記述に関しては、Scoped SCSS を使用した上で、[RSCSS](https://github.com/rstacruz/rscss/tree/master/docs) の記法に従う



## 依存ライブラリ

使用している主なライブラリについて、下記に示します。

Nuxt 

- [@nuxtjs/pwa](https://github.com/nuxt-community/pwa-module)
- [@nuxtjs/svg-sprite](https://github.com/nuxt-community/svg-sprite-module)
- [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module)
- [dayjs](https://github.com/iamkun/dayjs)

Cloud Functions

- [axios](https://github.com/axios/axios)
