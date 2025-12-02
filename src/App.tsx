import { useEffect } from 'react'
import { useAtomInstance } from '@zedux/react'
import { linkableAtom } from '@/components/zedux'

import '@/scss/app.css'

function App() {
  const context = useAtomInstance(linkableAtom, [])

  useEffect(() => {
    const { register, unregister } = context.exports

    register('../../../plugins/obs')

    return () => unregister('obs')
  }, [])

  return <div>foo</div>
}

export default App
