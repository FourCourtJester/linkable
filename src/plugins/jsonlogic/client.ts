import jsonLogic from 'json-logic-js'

export default class JSONLogicClient {
  constructor() {}

  execute(command: string, params: jsonLogic.RulesLogic<jsonLogic.AdditionalOperation>) {
    return jsonLogic.apply(params) ? undefined : false
  }
}
