import axios from 'axios'
import auth from "./../utils/auth";

export default {
    namespaced: true,
    state: {
       user: null
    },
    getters: {
      getUser(state){
        return state.user
      }
    },
    mutations: {
      setUser(state, user) {
          state.user = user;
          window.localStorage.setItem('user', JSON.stringify(user));
        },
    },
    actions: {
        register(context, data) {
            return new Promise((resolve, reject) => {
              axios.post("http://localhost:3000/api/v1/user", data)
              .then(res => {
                  resolve(res);
                  
              }).catch(err => {
                  console.log(err);
                  reject(err);
                });
            });
        },
        login(context, user) {
            return new Promise((resolve, reject) => {
              axios
                .post("http://localhost:3000/api/v1/user/login", {
                  user
                })
                .then(res => {
                  auth.setLocalToken(res.data.token);
                  context.commit("setUser", res.data.user);
                  resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          }
    },
}
