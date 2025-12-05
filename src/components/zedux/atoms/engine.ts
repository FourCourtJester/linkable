import {
  actionFactory,
  api,
  atom,
  createReducer,
  createStore,
  injectAtomInstance,
} from '@zedux/react'
import { clientsAtom } from './clients'
import { Chain } from '@/components/chain'

// Typescript Definitions

export type Plugin = {
  id: string
}
type State = Record<string, Record<string, any>>

// Actions

const add = actionFactory<Record<string, any>>('engine/build')

// Exports

// Atom

export const engineAtom = atom('engine', () => {
  const allClients = injectAtomInstance(clientsAtom)

  const reducer = createReducer({}).reduce(add, (state: State, chain: Record<string, any>) => {
    if (!chain || !chain.links || !chain.links.length) return state

    const chainClients = chain.plugins.reduce((obj, plugin: string) => {
      return { ...obj, [plugin]: allClients.exports.get(plugin) }
    }, {})

    const event = chain.links.at(0)
    const plugin = chainClients[event.plugin]

    plugin.on(event.on, (result) => {
      new Chain(chain.links.slice(1), chainClients).execute(result)
    })

    return { ...state, [chain.name]: chain }
  })

  const store = createStore(reducer)
  const storeAPI = api(store)

  storeAPI.addExports({
    build: (chain: Record<string, any>) => store.dispatch(add(chain)),
  })

  return storeAPI
})
