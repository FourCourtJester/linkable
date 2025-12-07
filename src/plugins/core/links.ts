const links = {
  RNG(params) {
    const num = {
      min: params.min ?? 0,
      max: params.max ?? 100,
    }

    const min = Number(num.min)
    const max = Number(num.max)

    if (isNaN(min) || isNaN(max)) throw new Error(`Unknown parameters for RNG: ${params}`)

    return {
      state: {
        [params.path]: Math.floor(Math.random() * (max - min + 1)) + min,
      },
    }
  },
  SetState(params) {
    return {
      state: {
        [params.path]: params.value,
      },
    }
  },
  Wait(params) {
    const ms = Number(params.amount)

    if (isNaN(ms)) throw new Error(`Unknown wait amount: ${params.amount}`)

    return new Promise((resolve) => setTimeout(resolve, ms)).then(() => undefined)
  },
}

export default links
