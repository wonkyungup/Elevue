import Defs from '@/assets/js/constants'

const state = {
    isWelcomePage: true,
    isDirectionPage: true,
    isSourcePage: false,
    isServerPage: false,
    isDestinationPage: false,
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
      state.isDirectionPage = true
      state.isSourcePage =  false
      state.isServerPage = false
      state.isDestinationPage = false
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
    BACK_SOURCE_PAGE (state) {
      state.isDirectionPage = true
      state.isSourcePage = false
      state.isServerPage = false
      state.isDestinationPage = false
    },
    BACK_SERVER_PAGE (state) {
      state.isDirectionPage = false
      state.isSourcePage = true
      state.isServerPage = false
      state.isDestinationPage = false
    },
    BACK_DESTINATION_PAGE (state) {
      state.isDirectionPage = false
      state.isSourcePage = false
      state.isServerPage = true
      state.isDestinationPage = false
    },
    SET_SESSION_DIRECTION (state, payload) {
      state.session.direction = payload
    },
    SET_SESSION_SOURCE_PAGE (state, payload) {
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
    SET_SESSION_SERVER_PAGE (state, payload) {
      state.session.serverHost = payload.hostname
      state.session.serverPort = payload.port
      state.session.serverUsername = payload.username
      state.session.serverPassword = payload.password
    },
    SET_SESSION_DESTINATION_PAGE (state, payload) {
      if (getters.isLocal()) {
        state.session.remoteHost = payload.hostname
        state.session.remotePort = payload.port
      }

      if (getters.isRemote()) {
        state.session.localHost = payload.hostname
        state.session.localPort = payload.port
      }
    },
    SET_CONTINUE_DIRECTION (state) {
      state.isDirectionPage = false
      state.isSourcePage = true
      state.isServerPage = false
      state.isDestinationPage = false
    },
    SET_CONTINUE_SOURCE_PAGE (state) {
      state.isDirectionPage = false
      state.isSourcePage = false
      state.isServerPage = true
      state.isDestinationPage = false
    },
    SET_CONTINUE_SERVER_PAGE (state) {
      state.isDirectionPage = false
      state.isSourcePage = false
      state.isServerPage = false
      state.isDestinationPage = true
    },
    SET_CONTINUE_DESTINATION_PAGE (state) {
      state.isDirectionPage = false
      state.isSourcePage = false
      state.isServerPage = false
      state.isDestinationPage = false
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
      commit('SET_WELCOME_PAGE', payload)
    },
    clearSessionValue ({ commit }) {
      commit('CLEAR_SESSION_VALUE')
    },
    backSourcePage ({ commit }) {
      commit('BACK_SOURCE_PAGE')
    },
    backServerPage ({ commit }) {
      commit('BACK_SERVER_PAGE')
    },
    backDestinationPage ({ commit }) {
      commit('BACK_DESTINATION_PAGE')
    },
    setSessionDirection ({ commit }, payload) {
      commit('SET_SESSION_DIRECTION', payload)
    },
    setSessionSourcePage ({ commit }, payload) {
      commit('SET_SESSION_SOURCE_PAGE', payload)
    },
    setSessionServerPage ({ commit }, payload) {
      commit('SET_SESSION_SERVER_PAGE', payload)
    },
    setSessionDestinationPage ({ commit }, payload) {
        commit('SET_SESSION_DESTINATION_PAGE', payload)
    },
    setContinueDirection ({ commit }) {
      commit('SET_CONTINUE_DIRECTION')
    },
    setContinueSourcePage ({ commit }) {
      commit('SET_CONTINUE_SOURCE_PAGE')
    },
    setContinueServerPage ({ commit }) {
      commit('SET_CONTINUE_SERVER_PAGE')
    },
    setContinueDestinationPage ({ commit }) {
      commit('SET_CONTINUE_DESTINATION_PAGE')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
