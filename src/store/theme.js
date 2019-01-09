import axios from 'axios'
export default {
    namespaced: true,
    state: {
        themes: [],
    },
    getters: {
        getThemes(state){
            return state.themes
        }
    },
    mutations: {
        SET_THEMES(state, newValue){
            state.themes = newValue
        }
    },
    actions: {
        getThemes : (ctx, that) => {
            axios.get(that.$backEndUrl + 'theme')
                .then(function(res){
                    console.log(res);
                    ctx.commit('SET_THEMES', res.data);
                })
                .catch(err => console.log(err))
            }
    },
}
