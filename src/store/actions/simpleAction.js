export const SIMPLE_ACTION = 'SIMPLE_ACTION'

const simpleAction = text => {
  return { type: SIMPLE_ACTION, text }
}

export default {
  simpleAction
}
