export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'

const signIn = accountId => {
  return { type: SIGN_IN, accountId }
}

const signUp = accountId => {
  return { type: SIGN_UP, accountId }
}

export default {
  signIn,
  signUp
}
