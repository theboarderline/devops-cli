/* eslint-disable */

export default function createReducer(initialState: any, handlers: { [x: string]: (arg0: any, arg1: any) => any; hasOwnProperty: (arg0: any) => any }) {
  return function reducer(state = initialState, action: { type: string | number }) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}