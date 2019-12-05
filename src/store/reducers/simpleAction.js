export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return { text: action.text }
    default:
      return state
  }
}
