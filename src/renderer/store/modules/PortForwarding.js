import Defs from '@/assets/js/constants'

const state = {
    isWelcomePage: true,
    isDirection: true,
    isStageUpper: false,
    isStageMiddle: false,
    isStageLower: false,
    session: {
        id: null,
        direction: Defs.STR_LOCAL,
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
    CLEAR_SESSION_VALUE (state) {
        state.isDirection = true
        state.isStageUpper =  false
        state.isStageMiddle = false
        state.isStageLower = false
        state.session = {
            id: null,
            direction: Defs.STR_LOCAL,
            localHost: '',
            localPort: null,
            remoteHost: '',
            remotePort: null,
            serverHost: '',
            serverPort: null,
            serverUsername: '',
            serverPassword: ''
        }
    },
    SET_SESSION_DIRECTION (state, payload) {
        state.session.direction = payload
    },
    SET_CONTINUE_DIRECTION (state) {
        if (state.isDirection) {
            state.isDirection = !state.isDirection
        }

        state.isStageUpper = true
    },
    BACK_STAGE_UPPER (state) {
        if (state.session.direction !== Defs.STR_REMOTE) {
            state.session.localHost = ''
            state.session.localPort = null
        } else {
            state.session.remoteHost = ''
            state.session.remotePort = null
        }

        if (state.isStageUpper) {
            state.isStageUpper = !state.isStageUpper
        }

        state.isDirection = true
    },
    SET_SESSION_STAGE_UPPER (state, payload) {
        switch (state.session.direction) {
            case Defs.STR_LOCAL:
                state.session.localHost = payload.address
                state.session.localPort = payload.port
                break
            case Defs.STR_REMOTE:
                state.session.remoteHost = payload.address
                state.session.remotePort = payload.port
                break
            case Defs.STR_SOCKSV5:
                state.session.localHost = payload.address
                state.session.localPort = payload.port
                state.session.remoteHost = state.session.localHost
                state.session.remotePort = state.session.localPort
            default:
                break
        }
    },
    SET_CONTINUE_STAGE_UPPER (state) {
        if (state.isStageUpper) {
            state.isStageUpper = false
        }

        state.isStageMiddle = true
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
        commit('SET_WELCOME_PAGE', payload)
    },
    clearSessionValue ({ commit }) {
        commit('CLEAR_SESSION_VALUE')
    },
    setSessionDirection ({ commit }, payload) {
        commit('SET_SESSION_DIRECTION', payload)
    },
    setContinueDirection ({ commit }) {
        commit('SET_CONTINUE_DIRECTION')
    },
    backStageUpper ({ commit }) {
        commit('BACK_STAGE_UPPER')
    },
    setSessionStageUpper ({ commit }, payload) {
        commit('SET_SESSION_STAGE_UPPER', payload)
    },
    setContinueStageUpper ({ commit }) {
        commit('SET_CONTINUE_STAGE_UPPER')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
