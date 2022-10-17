import * as remote from '@electron/remote'

const Defs = remote.getGlobal('Constants')

const state = {
    DB_VERSION: Defs.DB_VERSION,
    DB_MASTER_KEY: Defs.DB_MASTER_KEY
}

const getters = {
}

const mutations ={
    SET_MASTER_KEY (state, payload) {
        state.DB_MASTER_KEY = payload
    }
}

const actions = {
    setMasterKey ({ commit }, payload) {
        commit('SET_MASTER_KEY', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
