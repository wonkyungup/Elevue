const state = {
}

const getters = {
    isDarkMode: () => (vuetify) => {
        return vuetify.theme['isDark']
    },
    getCurDisplay: () => (vuetify) => {
        return vuetify.breakpoint.name
    }
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
