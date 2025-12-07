import { merge } from 'lodash'
import { resolver } from '@/toolkits/resolver'

export class Chain {
  #clients: Record<string, any>
  #context: any = {}
  #links: Array<Record<string, any>>

  constructor(chain: Array<Record<string, any>>, clients: Record<string, any>) {
    this.#clients = clients
    this.#links = chain
  }

  async execute(payload: any) {
    if (!this.#links.length) return false

    // Execute the next step
    const { link, params, plugin } = this.#links.shift()
    const client = this.#clients[plugin]

    this.#context = merge(this.#context, payload)

    try {
      if (client === undefined) throw new Error(`Client not found for ${plugin}/${link}`)

      const result = await client.execute(link, resolver(params, this.#context))

      return result === false ? result : await this.execute(result)
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
