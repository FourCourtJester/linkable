import { api, atom, createStore, injectAtomInstance } from '@zedux/react'
import { clientsAtom, credentialsAtom, registryAtom } from '@/components/zedux/atoms'

// Typescript Definitions

// Atom

export const linkableAtom = atom('linkable', () => {
  const clients = injectAtomInstance(clientsAtom)
  const credentials = injectAtomInstance(credentialsAtom)
  const registry = injectAtomInstance(registryAtom)

  const { create, destroy } = clients.exports
  const { add, remove } = credentials.exports
  const { register, unregister } = registry.exports

  const store = createStore()

  store.use({ clients: clients.store, credentials: credentials.store, registry: registry.store })

  const storeAPI = api(store)

  storeAPI.setExports({
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
