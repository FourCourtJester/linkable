import { actionFactory, api, atom, createReducer, createStore } from "@zedux/react"

const add = actionFactory<object>("registry/add")
const remove = actionFactory<string>("registry/remove")

async function register(store, url: string) {
  try {
    const mod = await import(/* @vite-ignore */ url)
    const plugin = mod.default

    if (!plugin || !plugin.id) {
      throw new Error(`Plugin at ${url} did not import correctly`)
    }

    store.dispatch(add(plugin))
  } catch (err) {
    console.error(`Plugin registry failed:`, err)
  }
}

function unregister(store, id: string) {
  store.dispatch(remove(id))
}

export const registryAtom = atom("registry", () => {
  const reducer = createReducer({})
    .reduce(add, (state, plugin: object) => {
      return { ...state, [plugin.id]: plugin }
    })
    .reduce(remove, (state, id: string) => {
      const _state = { ...state }
      delete _state?.[id]

      return _state
    })

  const store = createStore(reducer)
  const apiObj = api(store)

  apiObj.addExports({
    actions: {
      register: (url: string) => register(store, url),
      unregister: (id: string) => unregister(store, id),
    },
  })

  return apiObj
})
