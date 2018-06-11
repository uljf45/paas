const mutations = {
  SET_BATCH_SELECTION (state, {type, selection}) {
    if (type === 'alert') {
      state.batchAlertSelection = selection
    }
    if (type === 'all') {
      state.batchAllSelection = selection
    }
  },
  SET_WEBSOCKET (state, {ws}) {
    state.websocket.host = ws.host
    state.websocket.ip = ws.ip
    state.websocket.port = ws.port
  }
}

export default mutations
