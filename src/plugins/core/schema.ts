const RNG = {
  id: 'core.RNG',
  label: 'Random Number Generator',
  description: 'Generate a random number between the min and max parameters. Defaults to 1-100.',

  // Inputs
  inputs: {
    path: { label: 'Path', type: 'string', required: true },
    min: { label: 'Min', type: 'number' },
    max: { label: 'Max', type: 'number' },
  },

  // Outputs
  return: {
    state: {
      '{inputs.path}': 'number',
    },
  },
}

const SetState = {
  id: 'core.SetState',
  label: 'Set State',
  description: 'Saves a custom value into the current chain state.',

  // Inputs
  inputs: {
    path: { label: 'Path', type: 'string', required: true },
    value: { label: 'Value', required: true },
  },

  // Outputs
  return: {
    state: {
      '{inputs.path}': 'any',
    },
  },
}

const Wait = {
  id: 'core.Wait',
  label: 'Wait',
  description: 'Wait a specified number of milliseconds before proceeding.',

  // Inputs
  inputs: {
    path: { label: 'Path', type: 'string', required: true },
    value: { label: 'Value', type: 'number', required: true },
  },
}

export default {
  links: { RNG, SetState, Wait },
}
