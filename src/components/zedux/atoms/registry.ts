import { actionFactory, api, atom, createReducer, createStore } from '@zedux/react'

import type { Store } from '@zedux/react'

// Typescript Definitions

export type Plugin = {
  id: string
  destroy: () => void
}
type State = Record<string, Plugin>

// Fills in the blank on local plugins vs external plugins
function _url(url: string) {
  if (url.startsWith('/')) return `/linkable/src${url}`
  return url
}

// Actions

const add = actionFactory<Plugin>('registry/add')
const remove = actionFactory<string>('registry/remove')

// Exports

async function register(store: Store<State>, url: string) {
  try {
    const mod = await import(/* @vite-ignore */ _url(url))
    const plugin = mod.default

    if (!plugin || !plugin.id) {
      throw new Error(`Plugin at ${url} did not import correctly`)
    }

    store.dispatch(add(plugin))

    return store.getState()[plugin.id]
  } catch (err) {
    console.error(`Plugin registry failed:`, err)
  }
}

function unregister(store: Store<State>, id: string) {
  store.dispatch(remove(id))
}

// Atom

export const registryAtom = atom('registry', () => {
  const reducer = createReducer({})
    .reduce(add, (state: State, plugin: Plugin) => {
      return { ...state, [plugin.id]: plugin }
    })
    .reduce(remove, (state: State, id: string) => {
      const _state = { ...state }
      delete _state?.[id]

      return _state
    })

  const store = createStore(reducer)
  const storeAPI = api(store)

  storeAPI.addExports({
    register: async (url: string) => register(store, url),
    unregister: (id: string) => unregister(store, id),
  })

  return storeAPI
})
