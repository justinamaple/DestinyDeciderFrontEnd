export const SIMPLE_ACTION = 'SIMPLE_ACTION'

export function simpleAction(text) {
  return { type: SIMPLE_ACTION, text }
}
