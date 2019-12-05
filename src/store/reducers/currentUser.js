export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { userId: action.userId }
    case 'SIGN_UP':
      return { userId: action.userId }
    case 'SIGN_OUT':
      return { userId: '' }
    default:
      return state
  }
}
