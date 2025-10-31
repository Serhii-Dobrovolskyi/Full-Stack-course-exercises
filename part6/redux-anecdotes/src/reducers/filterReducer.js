const filterReducer = (state = '', action) => {
   switch (action.type) {
      case 'SEARCHING':
         return action.payload
      default: return state
   }
}
export const typeFilter = text => {
   return {
      type: 'SEARCHING',
      payload: text
   }
}
export default filterReducer