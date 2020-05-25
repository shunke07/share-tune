import firebase from '../plugins/firebase/init'
import 'firebase/storage'

type Payload = {
  path: string
  file: File
}

export const useUploadImage = async (payload: Payload): Promise<string> => {
  const { path, file } = payload
  const ref: firebase.storage.Reference = firebase
    .storage()
    .ref()
    .child(path)
  const meta: firebase.storage.UploadMetadata = {
    cacheControl: 'public, max-age=86400' // cahce 24 hours
  }
  // upload image to storage
  await ref.put(file, meta).catch(() => {
    throw new Error('アップロードエラー')
  })
  // download url from storage
  const url: string = await ref.getDownloadURL().catch(() => {
    throw new Error('ダウンロードエラー')
  })

  return url
}
