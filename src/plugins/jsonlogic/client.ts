import jsonLogic from 'json-logic-js'

export default class JSONLogicClient {
  constructor() {}

  evaluate(params: jsonLogic.RulesLogic<jsonLogic.AdditionalOperation>) {
    return Boolean(jsonLogic.apply(params))
  }
}
