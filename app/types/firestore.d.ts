export type User = {
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
