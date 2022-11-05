import Constants from './Constants'
import Security from '@/assets/js/security'

const Defs = Constants.state

const state = {
    arrTunneling: [],
    curDrawer: Defs.DRAWER_DIRECTION_PAGE || 0,
    curTableStyle: Defs.STR_TABLE_STYLE_AUTO,
    arrTableStyle: [Defs.STR_TABLE_STYLE_AUTO, Defs.STR_TABLE_STYLE_COL12, Defs.STR_TABLE_STYLE_COL6, Defs.STR_TABLE_STYLE_COL4, Defs.STR_TABLE_STYLE_COL2],
    selectID: 0,
    session: {
        id: null,
        host: '',
        port: null,
        username: '',
        password: '',
        direction: Defs.STR_LOCAL,
        source_host: '',
        source_port: null,
        destination_host: '',
        destination_port: null
    },
    curSession: {}
}

const getters = {
    isWelcomePage: state => () => {
      return state.arrTunneling.length <= 0
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
    },
    isDrawerDirection: state => () => {
      return state.curDrawer === Defs.DRAWER_DIRECTION_PAGE
    },
    isDrawerSource: state => () => {
      return state.curDrawer === Defs.DRAWER_SOURCE_PAGE
    },
    isDrawerServer: state => () => {
      return state.curDrawer === Defs.DRAWER_SERVER_PAGE
    },
    isDrawerDestination: state => () => {
      return state.curDrawer === Defs.DRAWER_DESTINATION_PAGE
    },
    getTunnelingBodyTitleIcon: () => (session) => {
      const direction = session.direction

      if (direction !== null && direction.length > 0) {
          switch (direction) {
              case Defs.STR_LOCAL:
                  return Defs.ICON_ALPHA_L_BOX
              case Defs.STR_REMOTE:
                  return Defs.ICON_ALPHA_R_BOX
              case Defs.STR_SOCKSV5:
                  return Defs.ICON_ALPHA_S_BOX
              default:
                  break
          }
      }
    },
    getDisplayCol: (state) => (vuetify) => {
        const curTableStyle = state.curTableStyle

        switch (curTableStyle) {
            case Defs.STR_TABLE_STYLE_AUTO:
                const display = vuetify.breakpoint.name

                if (display !== null && display.length > 0) {
                    switch (display) {
                        case Defs.STR_DISPLAY_XS:
                        case Defs.STR_DISPLAY_SM:
                            return 12
                        case Defs.STR_DISPLAY_MD:
                            return 6
                        case Defs.STR_DISPLAY_LG:
                        case Defs.STR_DISPLAY_XL:
                            return 4
                        default:
                            break
                    }
                }
                break
            case Defs.STR_TABLE_STYLE_COL12: return 12
            case Defs.STR_TABLE_STYLE_COL6: return 6
            case Defs.STR_TABLE_STYLE_COL4: return 4
            case Defs.STR_TABLE_STYLE_COL2: return 2
            default:
                break
        }
    },
    getTunnelingBodyText: () => (session) => {
        const direction = session.direction

        if (direction !== null && direction.length > 0) {
            switch (direction) {
                case Defs.STR_LOCAL:
                    return `From ${session.host}:${session.source_port} to ${session.destination_host}:${session.destination_port}`
                case Defs.STR_REMOTE:
                    return `From ${session.host}:${session.destination_port} to ${session.source_host}:${session.source_port}`
                case Defs.STR_SOCKSV5:
                    return `From ${session.host}:${session.source_port}`
                default:
                    break
            }
        }
    }
}

const mutations ={
    CLEAR_SESSION_VALUE (state) {
      state.curDrawer = Defs.DRAWER_DIRECTION_PAGE || 0
      state.session = {
          id: null,
          direction: Defs.STR_LOCAL,
          source_host: '',
          source_port: null,
          destination_host: '',
          destination_port: null,
          host: '',
          port: null,
          username: '',
          password: ''
      }
    },
    SET_SESSION_VALUE (state, payload) {
      const session = state.session

      switch (state.curDrawer) {
        case Defs.DRAWER_DIRECTION_PAGE:
          session.direction = payload
          break
        case Defs.DRAWER_SOURCE_PAGE:
          if (session.direction === Defs.STR_LOCAL || session.direction === Defs.STR_SOCKSV5) {
            session.source_host = payload.hostname
            session.source_port = payload.port
          }

          if (session.direction === Defs.STR_REMOTE) {
            session.destination_host = payload.hostname
            session.destination_port = payload.port
          }
          break
        case Defs.DRAWER_SERVER_PAGE:
          session.host = payload.hostname
          session.port = payload.port
          session.username = payload.username
          session.password = Security.encodeData(payload.password)
          break
        case Defs.DRAWER_DESTINATION_PAGE:
          if (session.direction === Defs.STR_LOCAL || session.direction === Defs.STR_SOCKSV5) {
            session.destination_host = payload.hostname
            session.destination_port = payload.port
          }

          if (session.direction === Defs.STR_REMOTE) {
            session.source_host = payload.hostname
            session.source_port = payload.port
          }
          break
        default:
          break
      }
    },
    MOVE_BACK_BUTTON (state) {
      if (state.curDrawer !== 0) {
        state.curDrawer--
      }
    },
    MOVE_NEXT_BUTTON (state) {
      state.curDrawer++
    },
    SET_DB_SESSION_ID (state, row) {
        const session = state.session
        const arrTunneling = state.arrTunneling

        if (row.id > 0) {
            session.id = row.id
            session.password = Security.decodeData(row.password)
            console.log(session)
            arrTunneling.push(session)
        }
    },
    SET_DB_ARR_TUNNELING (state, rows) {
        rows.forEach(session => session['password'] = Security.decodeData(session['password']))

        if (rows.length > 0) {
            state.arrTunneling = rows
        }
    },
    SET_CUR_TABLE_STYLE (state, value) {
        state.curTableStyle = value
    },
    SET_SELECT_ID (state, id) {
        state.selectID = id
        state.curSession = state.arrTunneling.filter(session => session.id === id)[0]
    },
    DELETED_ARR_TUNNELING (state) {
        state.arrTunneling = state.arrTunneling.filter(value => value.id !== state.selectID)
    }
}

const actions = {
    clearSessionValue ({ commit }) {
      commit('CLEAR_SESSION_VALUE')
    },
    setSessionValue ({ commit }, payload) {
      commit('SET_SESSION_VALUE', payload)
    },
    moveBackButton ({ commit }) {
      commit('MOVE_BACK_BUTTON')
    },
    moveNextButton ({ commit }) {
      commit('MOVE_NEXT_BUTTON')
    },
    setDBSessionID ({ commit }, data) {
      commit('SET_DB_SESSION_ID', data)
    },
    setDBArrTunneling ({ commit }, list) {
      commit('SET_DB_ARR_TUNNELING', list)
    },
    setCurTableStyle ({ commit }, value) {
      commit('SET_CUR_TABLE_STYLE', value)
    },
    setSelectID ({ commit }, id) {
      commit('SET_SELECT_ID', id)
    },
    deletedArrTunneling ({ commit }) {
      commit('DELETED_ARR_TUNNELING')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
