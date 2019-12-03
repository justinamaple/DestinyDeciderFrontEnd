export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_OUT = 'SIGN_UP'

const signIn = userId => {
  return { type: SIGN_IN, userId }
}

const signUp = userId => {
  return { type: SIGN_UP, userId }
}

const signOut = () => {
  return { type: SIGN_OUT }
}

export default {
  signIn,
  signUp,
  signOut
}
