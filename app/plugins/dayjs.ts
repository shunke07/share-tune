import { Plugin } from '@nuxt/types'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'

dayjs.locale('ja')
dayjs.extend(relativeTime)

// eslint-disable-next-line
const dayjsPlugin: Plugin = (context, inject) => {
  inject('dayjs', dayjs)
}
export default dayjsPlugin
