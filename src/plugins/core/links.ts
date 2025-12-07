const links = {
  RNG(params) {
    if (params.path === undefined) throw new Error(`No path submitted for RNG: ${params}`)

    const min = Number(params.min ?? 0)
    const max = Number(params.max ?? 100)

    if (isNaN(min) || isNaN(max)) throw new Error(`Unknown min & max parameters for RNG: ${params}`)

    return {
      state: {
        [params.path]: Math.floor(Math.random() * (max - min + 1)) + min,
      },
    }
  },
  SetState(params) {
    if (params.path === undefined) throw new Error(`No path submitted for SetState: ${params}`)
    if (params.value === undefined) throw new Error(`No value submitted for SetState: ${params}`)

    return {
      state: {
        [params.path]: params.value,
      },
    }
  },
  Wait(params) {
    if (params.path === undefined) throw new Error(`No path submitted for Wait: ${params}`)

    const ms = Number(params.amount)

    if (isNaN(ms)) throw new Error(`Unknown Wait amount: ${params}`)

    return new Promise((resolve) => setTimeout(resolve, ms)).then(() => undefined)
  },
}

export default links
