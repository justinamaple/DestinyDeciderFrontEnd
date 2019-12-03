export default (state = {}, action) => {
  console.log('reducer', state, action)

  switch (action.type) {
    case 'SIGN_IN':
      return { userId: action.userId }
    case 'SIGN_UP':
      return { userId: action.userId }
    default:
      return state
  }
}
