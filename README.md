# ShareTune

> お気に入りの音楽を見つけ、思いを共有するSNS

このプロジェクトは Nuxt.js と Firebase を利用したアプリケーションのサンプルです。

## 開発

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

### デプロイ
master ブランチに対しての push をトリガーにして CI (GitHub Actions) によって、Firebase Hosting にデプロイが行われます。そして、サイト https://share-tune.web.app が更新されます。
