import { useEffect } from "react"
import { useAtomInstance } from "@zedux/react"
import { registryAtom } from "@/components/zedux"

import "@/scss/app.css"

function App() {
  const registry = useAtomInstance(registryAtom, [])

  useEffect(() => {
    const { register, unregister } = registry.exports.actions

    register("../../plugins/obs")

    return () => unregister("obs")
  }, [])

  return <div>foo</div>
}

export default App
