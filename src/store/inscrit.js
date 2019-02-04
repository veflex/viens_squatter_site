import axios from 'axios'
export default {
    namespaced: true,
    state: {
      sub_annonce: null,
      sub_active: null,
      sub_done: null,
      date: null
    },
    getters: {
      getSubActive(state){
        return state.sub_active
      },
      getSubDone(state){
        return state.sub_done
      }
    },
    mutations: {
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
      SET_SUB_ANNONCE(state, annonces){
        console.log('ca set sub ann', annonces);
        state.sub_active = annonces.filter(annonce => annonce.datetime > state.date)
        state.sub_done = annonces.filter(annonce => annonce.datetime < state.date)
      },
    },
    actions: {
      //register to the annonce
      annonceRegister(ctx, ids){
        axios.post(this._vm.$backEndUrl + 'annonce_reg', ids)
            .then(function(res){
                console.log(res);
            })
            .catch(err => console.log(err))
      },
      //unregister to the annonce
      annonceUnregister(ctx, ids){
        axios.post(this._vm.$backEndUrl + 'annonce_unreg', ids)
            .then(function(res){
                console.log(res);
            })
            .catch(err => console.log(err))
      },
      //verif if the user is registered to the annonce
      verifRegister(ctx, ids){
        return new Promise((resolve, reject) => {
          axios.post(this._vm.$backEndUrl + 'verif_reg', ids)
              .then(function(res){
                resolve(res)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
        })
      },
      //get all annonces that the user registered to
      userRegistration(ctx, id){
        return new Promise((resolve, reject) => {
          axios.get(this._vm.$backEndUrl + 'user_reg/' + id)
              .then(function(res){
                console.log(res);
                ctx.commit('getDate');
                ctx.commit('SET_SUB_ANNONCE', res.data)
                resolve(res)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
        })
      },
      //get all user registered to the annonce
      annonceRegistration(ctx, id){
        return new Promise((resolve, reject) => {
          axios.get(this._vm.$backEndUrl + 'annonce_reg/' + id)
              .then(function(res){
                resolve(res)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
        })
      },
  }
}

