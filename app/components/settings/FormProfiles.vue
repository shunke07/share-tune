<template>
  <form class="form-profile">
    <ImageUploader class="input" @onFileUploaded="file = $event" />

    <BaseInputText
      type="text"
      class="input"
      label="ユーザーネーム"
      :required="true"
      :max-length="20"
      :is-value-valid="isNameValid"
      :current-value="loginUser.displayName"
      @onChangeValue="displayName = $event"
    />
    <p class="counter">{{ displayName.length }}/20</p>

    <BaseTextarea
      class="textarea"
      label="プロフィール"
      :max-length="160"
      :is-value-valid="isProfileTextValid"
      :current-value="loginUser.profileText"
      @onChangeValue="profileText = $event"
    />
    <p class="counter">{{ profileText.length }}/160</p>

    <BaseInputText
      class="input"
      type="text"
      label="ウェブサイト"
      :max-length="100"
      :is-value-valid="isUrlValid"
      :current-value="loginUser.siteUrl"
      @onChangeValue="siteUrl = $event"
    />
    <p class="counter">{{ siteUrl.length }}/100</p>

    <BaseButton
      label="保存"
      class="save"
      :disabled="!isFormValid"
      @onClick="save()"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import ImageUploader from '~/components/form/ImageUploader.vue'
import BaseInputText from '~/components/form/BaseInputText.vue'
import BaseTextarea from '~/components/form/BaseTextarea.vue'
import BaseButton from '~/components/form/BaseButton.vue'

import { User } from '~/types/firestore'
import { RootState } from '~/store'

import { updateUser } from '~/repositories/firestore/users'
import { useDocumentId } from '~/utils/use-document-id'
import { useUploadImage } from '~/utils/use-upload-image'

type Profile = {
  displayName: User['displayName']
  profileText: User['profileText']
  siteUrl: User['siteUrl']
  image: User['image']
  file: null | File
}

export default Vue.extend({
  components: {
    BaseInputText,
    BaseTextarea,
    BaseButton,
    ImageUploader
  },

  data(): Profile {
    return {
      displayName: '',
      profileText: '',
      siteUrl: '',
      file: null,
      image: {
        id: null,
        url: null
      }
    }
  },

  computed: {
    loginUser(): User | null {
      return (this.$store.state as RootState).loginUser
    },

    isNameValid(): boolean {
      const { displayName } = this
      return !!displayName && displayName.length <= 20
    },

    isProfileTextValid(): boolean {
      const { profileText } = this
      return !profileText || profileText.length <= 160
    },

    isUrlValid(): boolean {
      const { siteUrl } = this
      const regexpUrl = /^(http:\/\/|https:\/\/)(.{4,})$/
      const isUrlValid =
        !siteUrl || (siteUrl.length <= 100 && regexpUrl.test(siteUrl))

      return isUrlValid
    },

    isFormValid(): boolean {
      const { isNameValid, isProfileTextValid, isUrlValid } = this
      return isNameValid && isProfileTextValid && isUrlValid
    }
  },

  methods: {
    async uploadImage(): Promise<void> {
      if (!this.file) return

      const id = useDocumentId()
      const uid = this.$firebase.currentUser?.uid
      const storagePath = `users/${uid}/icons/${id}`

      const url = await useUploadImage({
        path: storagePath,
        file: this.file
      }).catch((error: Error) => this.$nuxt.error(error))

      if (url) this.image = { id, url }
    },

    async save(): Promise<void> {
      if (!this.isFormValid) return

      if (this.file) await this.uploadImage()

      const { displayName, profileText, siteUrl, loginUser } = this
      if (!loginUser) return

      const { id, url } = this.image
      const uid = loginUser.uid
      const data = {
        uid,
        displayName,
        profileText,
        siteUrl,
        image: {
          id,
          url
        }
      }

      this.$store.commit('setIsLoading', true)

      await updateUser(data).catch((error: Error) => {
        this.$nuxt.error(error)
      })

      // listen updating firestore
      await new Promise((resolve) => {
        const now = this.$firestore.Timestamp.now()
        const ref = this.$firestore().doc(`users/${uid}`)

        const unsubscribe = ref.onSnapshot(
          (snapshot: firebase.firestore.DocumentSnapshot) => {
            const updatedAt = snapshot.get('updatedAt').toMillis() / 1000
            if (now.seconds > updatedAt) return // if update not completed

            const {
              displayName,
              profileText,
              siteUrl,
              image
            } = snapshot.data() as User

            const newProfile = {
              uid,
              displayName,
              profileText,
              siteUrl,
              image
            }
            this.$store.commit('setLoginUser', newProfile) // update store state
            this.$store.commit('setIsLoading', false)
            this.$router.push(`/users/${uid}/`)
            resolve()
            unsubscribe()
          }
        )
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.form-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;

  > .input {
    margin-bottom: 16px;
  }

  > .textarea {
    margin-bottom: 32px;
  }

  > .save {
    margin-top: 32px;
  }

  > .counter {
    width: 100%;
    text-align: right;
    margin-top: -12px;
    color: $gray;
  }
}
</style>
