import Defs from '@/assets/js/constants'

const state = {
    isWelcomePage: true,
    session: {
        id: null,
        direction: '',
        localHost: '',
        localPort: null,
        remoteHost: '',
        remotePort: null,
        serverHost: '',
        serverPort: null,
        serverUsername: '',
        serverPassword: ''
    }
}

const getters = {
    isWelcomePage: state => () => {
        return state.isWelcomePage
    },
    getDirectionTitle: state => () => {
        return state.session.direction.replace(/\b[a-z]/, value => value.toUpperCase())
    },
    isLocal: state => () => {
        return state.session.direction === Defs.STR_LOCAL
    },
    isRemote: state => () => {
        return state.session.direction === Defs.STR_REMOTE
    },
    isSocksv5: state => () => {
        return state.session.direction === Defs.STR_SOCKSV5
    }
}

const mutations ={
    SET_WELCOME_PAGE (state, payload) {
        state.isWelcomePage = payload
    },
    SET_DIRECTION (state, payload) {
        state.session.direction = payload
    },
    SET_STAGE_UPPER (state, payload) {
        if (state.session.direction !== Defs.STR_REMOTE) {
            state.session.localHost = payload._host
            state.session.localPort = payload._port
        } else {
            state.session.remoteHost = payload._host
            state.session.remotePort = payload._port
        }
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
        commit('SET_WELCOME_PAGE', payload)
    },
    setDirection ({ commit }, payload) {
        commit('SET_DIRECTION', payload)
    },
    setStageUpper ({ commit }) {
        commit('SET_STAGE_UPPER')
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
