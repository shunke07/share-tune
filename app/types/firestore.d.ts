export type User = {
  uid: string
  displayName: string
  profileText: null | string
  siteUrl: null | string
  image: {
    id: null | string
    url: null | string
  }
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

export type Bookmark = {
  album: {
    id: string
    imageUrl: string
    name: string
    artist: string
  }
  createdAt: firebase.firestore.FieldValue
}

export type Post = {
  album: {
    id: string
    imageUrl: string
    name: string
    artist: string
  }
  comment: string
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}
