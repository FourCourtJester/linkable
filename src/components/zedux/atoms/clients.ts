import { actionFactory, api, atom, createReducer, createStore } from '@zedux/react'

import type { Plugin } from '@/components/zedux/atoms/registry'

// Typescript Definitions

type State = Record<string, Plugin>

// Actions

const create = actionFactory<Record<string, any>>('clients/create')
const destroy = actionFactory<string>('clients/destroy')

// Exports

// Atom

export const clientsAtom = atom('clients', () => {
  const reducer = createReducer({})
    .reduce(create, (state: State, { config, plugin }) => {
      if (state[plugin.id]) return state

      const instance = new plugin.client(config)
      return { ...state, [plugin.id]: instance }
    })
    .reduce(destroy, (state: State, id: string) => {
      const _state = { ...state }
      delete _state?.[id]

      return _state
    })

  const store = createStore(reducer)
  const storeAPI = api(store)

  storeAPI.addExports({
    create: async (plugin: Plugin, config: Record<string, any>) =>
      store.dispatch(create({ plugin, config })),
    destroy: (id: string) => store.dispatch(destroy(id)),
  })

  return storeAPI
})
