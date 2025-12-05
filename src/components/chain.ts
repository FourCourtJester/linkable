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
    const link = this.#links.shift()
    const client = this.#clients[link.plugin]

    try {
      if (client === undefined) throw new Error(`Client not found for ${link.plugin}/${link.link}`)

      const result = await client[link.link](resolver(link.params, { event: payload }))

      if (result === false) throw new Error(`${link.plugin}/${link.link} was false, aborting`)

      return result ? this.execute(payload) : false
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
