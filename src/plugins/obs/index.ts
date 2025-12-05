// API: https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md

import client from './client'
import plugin from './plugin'

export default {
  client,
  ...plugin,
}
