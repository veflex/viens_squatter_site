import axios from 'axios'
export default {
    namespaced: true,
    state: {
        departements: [],
    },
    getters: {
        getDepartements(state){
            return state.departements
        }
    },
    mutations: {
        SET_DEPARTEMENTS(state, newValue){
            state.departements = newValue
        }
    },
    actions: {
        getDepartements : (ctx, that) => {
            axios.get(that.$backEndUrl + 'departement')
                .then(function(res){
                    console.log(res);
                    ctx.commit('SET_DEPARTEMENTS', res.data);
                })
                .catch(err => console.log(err))
            }
    },
}
