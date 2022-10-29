import * as remote from '@electron/remote'

const Defs = remote.getGlobal('Constants')

const state = {
    DB_CERTIFIED: Defs.DB_CERTIFIED,
    DB_VERSION: Defs.DB_VERSION,
    DB_MASTER_KEY: Defs.DB_MASTER_KEY
}

const getters = {
}

const mutations ={
    SET_MASTER_KEY (state, payload) {
        state.DB_MASTER_KEY = payload
    },
    AUTH_MASTER_CERTIFIED (state) {
        state.DB_CERTIFIED = true
    }
}

const actions = {
    setMasterKey ({ commit }, payload) {
        commit('SET_MASTER_KEY', payload)
    },
    authMasterCertified ({ commit }) {
        commit('AUTH_MASTER_CERTIFIED')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
