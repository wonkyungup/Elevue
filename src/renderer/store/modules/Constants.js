import * as remote from '@electron/remote'

const Defs = remote.getGlobal('Constants')

const state = {
    ICON_PLUS: Defs.ICON_PLUS,
    ICON_ACCOUNT: Defs.ICON_ACCOUNT,
    ICON_ARROW_COLLAPSE_RIGHT: Defs.ICON_ARROW_COLLAPSE_RIGHT,
    ICON_ARROW_LEFT: Defs.ICON_ARROW_LEFT,
    ICON_SERVER: Defs.ICON_SERVER,
    ICON_CLOUD: Defs.ICON_CLOUD,
    STR_LOCAL: Defs.STR_LOCAL,
    STR_REMOTE: Defs.STR_REMOTE,
    STR_SOCKSV5: Defs.STR_SOCKSV5
}

const getters = {
}

const mutations ={
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
