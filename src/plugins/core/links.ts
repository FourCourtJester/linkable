const links = {
  Set(params) {
    return {
      state: {
        [params.path]: params.value,
      },
    }
    return undefined
  },
  Wait(params) {
    const ms = Number(params.amount)

    if (isNaN(ms)) throw new Error(`Unknown wait amount: ${params.amount}`)

    return new Promise((resolve) => setTimeout(resolve, ms))
  },
}

export default links
