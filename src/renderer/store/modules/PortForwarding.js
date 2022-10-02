import Defs from '@/assets/js/constants'

const state = {
    isWelcomePage: true,
    session: {
        id: null,
        direction: '',
        localSrcHostName: '',
        localSrcPort: 0,
        localDstHostname: '',
        localDstPort: 0,
        serverHostName: '',
        serverPort: 0,
        serverUserName: '',
        serverPassword: '',
        remoteSrcHostName: '',
        remoteSrcPort: 0,
        remoteDstHostName: '',
        remoteDstPort: 0
    }
}

const getters = {
    isWelcomePage: state => () => {
        return state.isWelcomePage
    },
    getDirectionTitle: state => () => {
        return state.session.direction.replace(/\b[a-z]/, value => value.toUpperCase())
    },
    isDirectionRemote: state => () => {
        return state.session.direction === Defs.DIRECTION_REMOTE.TARGET
    }
}

const mutations ={
    SET_WELCOME_PAGE (state, payload) {
        state.isWelcomePage = payload
    },
    SET_DIRECTION (state, payload) {
        state.session.direction = payload
    },
    SET_STEP_1 (state, payload) {
        if (state.session.direction !== Defs.DIRECTION_REMOTE.TARGET) {
            state.session.localSrcHostName = payload._host
            state.session.localSrcPort = payload._port
        } else {
            state.session.remoteSrcHostName = payload._host
            state.session.remoteSrcPort = payload._port
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
    setStep1 ({ commit }, payload) {
        commit('SET_STEP_1', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
