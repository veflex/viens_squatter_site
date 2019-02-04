import axios from 'axios'
export default {
    namespaced: true,
    state: {
        list_annonce: null,
        user_annonce_active: null,
        user_annonce_done: null,
        oneAnnonce: null,
        params: null,
        date: null
    },
    getters: {
        getList(state){
            return state.list_annonce
        },
        getUserAnnoncesActive(state){
            return state.user_annonce_active
        },
        getUserAnnoncesDone(state){
            return state.user_annonce_done
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
            state.list_annonce = newValue.filter(value => value.datetime > state.date)
        },
        getDate(state){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd = '0'+dd
            } 
            if(mm<10) {
                mm = '0'+mm
            } 
            today = yyyy + '-' + mm + '-' + dd + 'T00:00';
            state.date =  today
        },
        SET_USER_ANNONCE(state, annonces){
            state.user_annonce_active = annonces.filter(annonce => annonce.datetime > state.date)
            state.user_annonce_done = annonces.filter(annonce => annonce.datetime < state.date)
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
                ctx.commit('getDate');
                ctx.commit('SET_ALL_ANNONCES', res.data);
                })
                .catch(err => console.log(err))
            },
        getOneAnnonce : (ctx, params) => {
            return new Promise((resolve, reject) => {

                axios.get(params.that.$backEndUrl + 'annonce/' + params.id)
                    .then(function(res){
                        ctx.commit('SET_ONE_ANNONCE', res.data[0]);
                        resolve(res.data[0])
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getOgAnnonce : (ctx, params) => {
            return new Promise((resolve, reject) => {

                axios.get(params.that.$backEndUrl + 'annonce_og/' + params.id)
                    .then(function(res){
                        console.log(res.data);
                        resolve(res.data[0])
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getUsersAnnonces(ctx, id){
            return new Promise((resolve, reject) => {
                axios.get(this._vm.$backEndUrl + 'user_annonce/' + id) 
                    .then((res => {
                        resolve(res)
                        ctx.commit('getDate');
                        ctx.commit('SET_USER_ANNONCE', res.data);
                    }))
                    .catch(err => {
                        reject(err)
                    })

            })
        },
        postAnnonce(ctx, payload){
            return new Promise((resolve, reject)=> {

                axios.post(payload.that.$backEndUrl + 'annonce', payload.annonce)
                    .then(function(res){
                        resolve(res);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err)
                    })
            })
        },
        updateAnnonce(ctx, annonce){
            axios.patch(this._vm.$backEndUrl + 'annonce/' + annonce.id  , annonce)
                .then(function(res){
                    console.log(res);
                })
                .catch(err => console.log(err))
        }
    }
}
