const links = {
  SetSceneItemEnabled(obs, params) {
    if (!params.sceneName)
      throw new Error(`No scene name submitted for SetSceneItemEnabled: ${params}`)

    if (!params.sourceName)
      throw new Error(`No source name submitted for SetSceneItemEnabled: ${params}`)

    if (!params.sceneItemEnabled)
      throw new Error(`No setting for the source submitted for SetSceneItemEnabled: ${params}`)

    return obs
      .call('GetSceneItemId', { sceneName: params.sceneName, sourceName: params.sourceName })
      .then(({ sceneItemId }) =>
        obs.call('SetSceneItemEnabled', {
          sceneName: params.sceneName,
          sceneItemId,
          sceneItemEnabled: params.sceneItemEnabled,
        })
      )
  },
}

export default links
