import Defs from '@/assets/js/constants'

const state = {
    isWelcomePage: true,
    isDirection: true,
    isFirstStep: false,
    isSecondStep: false,
    isThirdStep: false,
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
        state.isFirstStep =  false
        state.isSecondStep = false
        state.isThirdStep = false
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

        state.isFirstStep = true
    },
    BACK_FIRST_STEP (state) {
        if (state.session.direction !== Defs.STR_REMOTE) {
            state.session.localHost = ''
            state.session.localPort = null
        } else {
            state.session.remoteHost = ''
            state.session.remotePort = null
        }

        if (state.isFirstStep) {
            state.isFirstStep = !state.isFirstStep
        }

        state.isDirection = true
    },
    SET_SESSION_FIRST_STEP (state, payload) {
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
    SET_CONTINUE_FIRST_STEP (state) {
        if (state.isFirstStep) {
            state.isFirstStep = false
        }

        state.isSecondStep = true
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
    backFirstStep ({ commit }) {
        commit('BACK_FIRST_STEP')
    },
    setSessionFirstStep ({ commit }, payload) {
        commit('SET_SESSION_FIRST_STEP', payload)
    },
    setContinueFirstStep ({ commit }) {
        commit('SET_CONTINUE_FIRST_STEP')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
