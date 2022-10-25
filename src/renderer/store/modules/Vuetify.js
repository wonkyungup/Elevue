const state = {
}

const getters = {
    isDarkMode: () => (vuetify) => {
        return vuetify.theme['isDark']
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
