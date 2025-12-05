import { api, atom, createStore, injectAtomInstance } from '@zedux/react'
import { engineAtom, clientsAtom, credentialsAtom, registryAtom } from '@/components/zedux/atoms'

// Typescript Definitions

// Atom

export const linkableAtom = atom('linkable', () => {
  const engine = injectAtomInstance(engineAtom)
  const clients = injectAtomInstance(clientsAtom)
  const credentials = injectAtomInstance(credentialsAtom)
  const registry = injectAtomInstance(registryAtom)

  const { build } = engine.exports
  const { create, destroy } = clients.exports
  const { add, remove } = credentials.exports
  const { register, unregister } = registry.exports

  const store = createStore()

  store.use({
    engine: engine.store,
    clients: clients.store,
    credentials: credentials.store,
    registry: registry.store,
  })

  const storeAPI = api(store)

  storeAPI.setExports({
    build: (chain: Record<string, any>) => build(chain),
    register: async (url: string) => {
      const plugin = await register(url)
      const config = add(plugin.id, { password: '123456' })

      create(plugin, config[plugin.id])
    },
    unregister: (id: string) => {
      unregister(id)
      remove(id)
      destroy(id)
    },
  })

  return storeAPI
})
