import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'

dayjs.locale('ja')
dayjs.extend(relativeTime)

export default dayjs
