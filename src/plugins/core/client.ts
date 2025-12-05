import Links from './links'

export default class CoreClient {
  constructor() {}

  async execute(command: string, params: Record<string, any>) {
    try {
      switch (command.toLowerCase()) {
        case 'wait': {
          if (Object.prototype.hasOwnProperty.call(Links, command)) return Links[command](params)

          throw new Error(`Unknown core plugin function: ${command}`)
        }

        default: {
          throw new Error(`Unknown core plugin function: ${command}`)
        }
      }
    } catch (err) {
      console.error()
    }
  }
}
