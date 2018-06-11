export const setBatchSelection = function ({commit, state}, {type, selection}) {
  commit('SET_BATCH_SELECTION', {type, selection})
}

export const setWebsocket = function ({commit, state}, ws) {
  commit('SET_WEBSOCKET', ws)
}
