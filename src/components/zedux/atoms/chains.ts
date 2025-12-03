import {
  actionFactory,
  api,
  atom,
  createReducer,
  createStore,
  injectAtomInstance,
} from '@zedux/react'
import { clientsAtom } from './clients'

// Typescript Definitions

export type Plugin = {
  id: string
}
type State = Record<string, Record<string, any>>

// Actions

const add = actionFactory<Record<string, any>>('chains/build')

// Exports

// Atom

export const chainsAtom = atom('chains', () => {
  const allClients = injectAtomInstance(clientsAtom)

  const reducer = createReducer({}).reduce(add, (state: State, chain: Record<string, any>) => {
    if (!chain || !chain.links || !chain.links.length) return state

    const event = chain.links.at(0)
    const client = allClients.exports.get(event.plugin)

    client.listen(event.event, console.log)

    return { ...state, [chain.name]: chain }
  })

  const store = createStore(reducer)
  const storeAPI = api(store)

  storeAPI.addExports({
    build: (chain: Record<string, any>) => store.dispatch(add(chain)),
  })

  return storeAPI
})
