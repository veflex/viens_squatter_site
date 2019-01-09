import axios from 'axios'
export default {
    namespaced: true,
    state: {
        list_annonce: [],
        oneAnnonce: {},
        params: ''
    },
    getters: {
        getList(state){
            return state.list_annonce
        },
        getAnnonce(state){
            return state.oneAnnonce
        },
        getParams(state){
            return state.params
        }
    },
    mutations: {
        SET_ONE_ANNONCE(state, newValue){
            state.oneAnnonce = newValue
        },
        SET_ALL_ANNONCES(state, newValue){
            state.list_annonce = newValue
        },
        cleanObj(state, obj){
            for (var propName in obj) { 
                if (obj[propName] === null) {
                    delete obj[propName];
                }
            }
        },
        addParams(state, obj){
            var params = '?';
            for (var propName in obj) {
                params += `${propName}=${obj[propName]}&`
            }
            state.params =  params
        }
    },
    actions: {
        getAnnonces : (ctx, payload) => { 
            var params = '';
            const that = payload.that;
            ctx.commit('cleanObj', payload)
            delete payload['that'];
            // console.log(Object.values(payload));
            if(Object.values(payload).length != 0){
                ctx.commit('addParams', payload);
                params = ctx.getters.getParams
            }
            // var params = Object.assign(payload['ville'], payload['theme']); 
            // if(payload.ville === null && payload.theme ===null) {
            //     request = axios.get(payload.that.$backEndUrl + 'annonce')
            // } else {
            //     request = axios.get(payload.that.$backEndUrl + 'annonce?ville=' + payload.ville + "&theme=" + payload.theme )
            // } 
            axios.get(that.$backEndUrl + 'annonce' + params).then(function(res){
                    console.log(res);
                    ctx.commit('SET_ALL_ANNONCES', res.data);
                })
                .catch(err => console.log(err))
            },
        getOneAnnonce : (ctx, params) => {
            console.log(params);
                axios.get(params.that.$backEndUrl + 'annonce/' + params.id)
                    .then(function(res){
                        ctx.commit('SET_ONE_ANNONCE', res.data[0]);
                    })
                    .catch(err => console.log(err))
        },
        postAnnonce(ctx, payload){
            axios.post(payload.that.$backEndUrl + 'annonce', payload.annonce)
                .then(function(res){
                    console.log(res);
                })
                .catch(err => console.log(err))
        }
    },
}
