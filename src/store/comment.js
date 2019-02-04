import axios from 'axios'
export default {
    namespaced: true,
    state: {
        comments: [],
    },
    getters: {
        getComments(state){
            return state.comments
        }
    },
    mutations: {
        SET_COMMENTS(state, newValue){
            state.comments = newValue
        }
    },
    actions: {
      
      getAnnonceComments(ctx, id){
        return new Promise((resolve, reject) => {
          axios.get(this._vm.$backEndUrl + 'comment_annonce/' + id)
              .then(function(res){
                ctx.commit('SET_COMMENTS', res.data)
                resolve(res)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
      })
    },
      sendComment(ctx, data){
        console.log(data);
        return new Promise((resolve, reject) => {
          axios.post(this._vm.$backEndUrl + 'comment', data)
              .then(function(res){
                resolve(res)
              })
              .catch(err => {
                console.log(err)
                reject(err)
              })
      })
    },
        
    },
}
