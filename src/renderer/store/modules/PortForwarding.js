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
    BACK_SECOND_STEP (state) {
        if (state.session.direction !== Defs.STR_REMOTE) {
            state.session.serverHost = ''
            state.session.serverPort = null
            state.session.serverUsername = ''
            state.session.serverPassword = ''
        }

        if (state.isSecondStep) {
            state.isSecondStep = !state.isSecondStep
        }

        state.isFirstStep = true
    },
    SET_SESSION_DIRECTION (state, payload) {
        state.session.direction = payload
    },
    SET_SESSION_FIRST_STEP (state, payload) {
        switch (state.session.direction) {
            case Defs.STR_LOCAL:
                state.session.localHost = payload.hostname
                state.session.localPort = payload.port
                break
            case Defs.STR_REMOTE:
                state.session.remoteHost = payload.hostname
                state.session.remotePort = payload.port
                break
            case Defs.STR_SOCKSV5:
                state.session.localHost = payload.hostname
                state.session.localPort = payload.port
                state.session.remoteHost = state.session.localHost
                state.session.remotePort = state.session.localPort
            default:
                break
        }
    },
    SET_SESSION_SECOND_STEP (state, payload) {
        state.session.serverHost = payload.hostname
        state.session.serverPort = payload.port
        state.session.serverUsername = payload.username
        state.session.serverPassword = payload.password
    },
    SET_CONTINUE_DIRECTION (state) {
        if (state.isDirection) {
            state.isDirection = !state.isDirection
        }

        state.isFirstStep = true
    },
    SET_CONTINUE_FIRST_STEP (state) {
        if (state.isFirstStep) {
            state.isFirstStep = !state.isFirstStep
        }

        state.isSecondStep = true
    },
    SET_CONTINUE_SECOND_STEP (state) {
        if (state.isSecondStep) {
            state.isSecondStep = !state.isSecondStep
        }

        state.isThirdStep = true
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
        commit('SET_WELCOME_PAGE', payload)
    },
    clearSessionValue ({ commit }) {
        commit('CLEAR_SESSION_VALUE')
    },
    backFirstStep ({ commit }) {
        commit('BACK_FIRST_STEP')
    },
    backSecondStep ({ commit }) {
        commit('BACK_SECOND_STEP')
    },
    setSessionDirection ({ commit }, payload) {
        commit('SET_SESSION_DIRECTION', payload)
    },
    setSessionFirstStep ({ commit }, payload) {
        commit('SET_SESSION_FIRST_STEP', payload)
    },
    setSessionSecondStep ({ commit }, payload) {
        commit('SET_SESSION_SECOND_STEP', payload)
    },
    setContinueDirection ({ commit }) {
        commit('SET_CONTINUE_DIRECTION')
    },
    setContinueFirstStep ({ commit }) {
        commit('SET_CONTINUE_FIRST_STEP')
    },
    setContinueSecondStep ({ commit }) {
        commit('SET_CONTINUE_SECOND_STEP')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
