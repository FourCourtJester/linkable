import { useEffect } from 'react'
import { useAtomInstance } from '@zedux/react'
import { linkableAtom } from '@/components/zedux'

import '@/scss/app.css'

function App() {
  const context = useAtomInstance(linkableAtom, [])

  useEffect(() => {
    const { register, unregister } = context.exports

    register('/plugins/obs')

    return () => unregister('obs')
  }, [])

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const file = await fetch('/linkable/chain.json')
        const json = await file.json()

        context.exports.build(json)
      } catch (err) {
        console.error(err)
      }
    }, 2 * 1000)

    return () => clearTimeout(t)
  }, [])

  return <div>foo</div>
}

export default App
