export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'

const signIn = userId => {
  return { type: SIGN_IN, userId }
}

const signUp = userId => {
  return { type: SIGN_UP, userId }
}

export default {
  signIn,
  signUp
}
