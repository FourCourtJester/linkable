import { actionFactory, api, atom, createReducer, createStore } from '@zedux/react'

// Typescript Definitions

type State = Record<string, any>

// Actions

const add = actionFactory<Record<string, any>>('credentials/add')
const remove = actionFactory<string>('credentials/remove')

// Exports

// Atom

export const credentialsAtom = atom('credentials', () => {
  const reducer = createReducer({})
    .reduce(add, (state: State, { plugin, credentials }) => {
      return { ...state, [plugin]: credentials }
    })
    .reduce(remove, (state: State, plugin: string) => {
      const _state = { ...state }
      delete _state?.[plugin]

      return _state
    })

  const store = createStore(reducer)
  const apiObj = api(store)

  apiObj.setExports({
    add: (plugin: string, credentials: Record<string, any>) =>
      store.dispatch(add({ plugin, credentials })),
    remove: (plugin: string) => store.dispatch(remove(plugin)),
  })

  return apiObj
})
