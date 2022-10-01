const state = {
    isWelcomePage: true,
    session: {
        id: null,
        direction: '',
        localSrcHostName: '',
        localSrcPort: 0,
        serverHostName: '',
        serverPort: 0,
        serverUserName: '',
        serverPassword: '',
        remoteDstHostName: '',
        remoteDstPort: 0
    }
}

const getters = {
    isWelcomePage: state => () => {
        return state.isWelcomePage
    }
}

const mutations ={
    SET_WELCOME_PAGE (state, payload) {
        state.isWelcomePage = payload
    },
    SET_DIRECTION (state, payload) {
        state.session.direction = payload
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
        commit('SET_WELCOME_PAGE', payload)
    },
    setDirection ({ commit }, payload) {
        commit('SET_DIRECTION', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
