import OBSWebSocket from 'obs-websocket-js/json'

import type { OBSEventTypes } from 'obs-websocket-js/json'

type OBSClientConfig = {
  host: string
  identificationParams?: Record<string, any>
  password?: string
  port: number
}

type OBSListener = (...args: any) => void

export default class OBSClient {
  #config: OBSClientConfig = {
    host: '127.0.0.1',
    port: 4455,
  }
  #obs = new OBSWebSocket()

  constructor(config: Partial<OBSClientConfig>) {
    this.#config = { ...this.#config, ...config }
    this.#connect()

    // Close event
    this.#obs.on('ConnectionClosed', () => {
      // Reconnect attempts
      this.#obs.disconnect().then(() => setTimeout(() => this.#connect(), 5 * 1000))
    })
  }

  #connect() {
    const url = `ws://${this.#config.host}:${this.#config.port}`

    this.#obs
      .connect(url, this.#config.password, this.#config.identificationParams)
      .catch(console.error)
  }

  // event emitters are all normalized
  #on(event: keyof OBSEventTypes, fn: OBSListener) {
    this.#obs.on(event, fn)
  }

  destroy() {
    this.#obs.disconnect()
  }

  // Events

  CurrentProgramSceneChanged(fn: OBSListener) {
    this.#on('CurrentProgramSceneChanged', fn)
  }

  // Requests

  async SetSceneItemEnabled(params: Record<string, any>) {
    return this.#obs
      .call('GetSceneItemId', { sceneName: params.sceneName, sourceName: params.sourceName })
      .then(({ sceneItemId }) =>
        this.#obs.call('SetSceneItemEnabled', {
          sceneName: params.sceneName,
          sceneItemId,
          sceneItemEnabled: params.sceneItemEnabled,
        })
      )
  }
}
