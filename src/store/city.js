import axios from 'axios'
export default {
    namespaced: true,
    state: {
        cities: [],
    },
    getters: {
        getCities(state){
            return state.cities
        }
    },
    mutations: {
        SET_CITIES(state, newValue){
            state.cities = newValue
        }
    },
    actions: {
        getCities : (ctx, that) => {
            axios.get(that.$backEndUrl + 'city')
                .then(function(res){
                    console.log(res);
                    ctx.commit('SET_CITIES', res.data);
                })
                .catch(err => console.log(err))
            }
    },
}
