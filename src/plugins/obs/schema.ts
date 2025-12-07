const CurrentProgramSceneChanged = {
  id: 'obs.CurrentProgramSceneChanged',
  description: 'Listens for a program scene change',

  // Outputs
  return: {
    event: {
      sceneName: { label: 'Scene Name', type: 'string' },
      sceneUuid: { label: 'Scene Uuid', type: 'string' },
    },
  },
}

const SetSceneItemEnabled = {
  id: 'obs.SetSceneItemEnabled',
  label: 'Set Scene Item Enabled',
  description: 'Sets the enable state of a scene item.',

  // Inputs
  inputs: {
    sceneName: { label: 'Scene Name', type: 'string', required: true },
    sourceName: { label: 'Source Name', type: 'string', required: true },
    sceneItemEnabled: { label: 'Enabled', type: 'boolean', required: true },
  },
}

export default {
  events: { CurrentProgramSceneChanged },
  links: { SetSceneItemEnabled },
}
