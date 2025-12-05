const links = {
  SetSceneItemEnabled(obs, params) {
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
