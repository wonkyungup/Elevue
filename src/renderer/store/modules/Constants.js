import * as remote from '@electron/remote'

const Defs = remote.getGlobal('Constants')

const state = {
    ICON_PLUS: Defs.ICON_PLUS,
    ICON_ACCOUNT: Defs.ICON_ACCOUNT,
    ICON_ARROW_COLLAPSE_RIGHT: Defs.ICON_ARROW_COLLAPSE_RIGHT,
    ICON_ARROW_LEFT: Defs.ICON_ARROW_LEFT,
    ICON_SERVER: Defs.ICON_SERVER,
    ICON_CLOUD: Defs.ICON_CLOUD,
    ICON_SERVER_SECURITY: Defs.ICON_SERVER_SECURITY,
    ICON_ARROW_RIGHT_CIRCLE: Defs.ICON_ARROW_RIGHT_CIRCLE,
    ICON_ALPHA_L_BOX: Defs.ICON_ALPHA_L_BOX,
    ICON_ALPHA_R_BOX: Defs.ICON_ALPHA_R_BOX,
    ICON_ALPHA_S_BOX: Defs.ICON_ALPHA_S_BOX,
    STR_LOCAL: Defs.STR_LOCAL,
    STR_REMOTE: Defs.STR_REMOTE,
    STR_SOCKSV5: Defs.STR_SOCKSV5,
    DRAWER_DIRECTION_PAGE: Defs.DRAWER_DIRECTION_PAGE,
    DRAWER_SOURCE_PAGE: Defs.DRAWER_SOURCE_PAGE,
    DRAWER_SERVER_PAGE: Defs.DRAWER_SERVER_PAGE,
    DRAWER_DESTINATION_PAGE: Defs.DRAWER_DESTINATION_PAGE,
    DB_NAME: Defs.DB_NAME,
    DB_PATH: Defs.DB_PATH,
    DB_FULL_PATH: Defs.DB_FULL_PATH,
    SETUP_NAME: Defs.SETUP_NAME
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
