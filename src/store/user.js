import axios from 'axios'
import auth from "./../utils/auth";

export default {
    namespaced: true,
    state: {
       user: null,
       note: null
    },
    getters: {
      getUser(state){
        return state.user
      },
      getUserNote(state){
        return state.note
      }
    },
    mutations: {
      setUser(state, user) {
          state.user = user;
          window.localStorage.setItem('user', JSON.stringify(user));
        },
      setNote(state, note) {
          state.note = note;
          window.localStorage.setItem('note', JSON.stringify(note));

        }
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
                  context.dispatch("getNote", res.data.user.id);
                  resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          },
          getOneUser(context, id){
            return new Promise((resolve, reject) => {
              axios.get("http://localhost:3000/api/v1/user/" + id)
                .then(res => {
                  // context.commit("setUser", res.data);
                  resolve(res.data)
                })
                .catch(err => {
                  console.log(err);
                  reject(err)
                });
            })
          },
          updateUser(context, user){
            return new Promise((resolve, reject) => {
              
              axios.patch("http://localhost:3000/api/v1/user/" + user.get("id"), user)
                .then(res => {
                  context.dispatch("getOneUser", user.get("id"));
                  resolve(res)
                })
                .catch(err => {
                  reject(err);
                });
            })
          },
          getNote(context, id){
            return new Promise((resolve, reject) => {
              axios.get("http://localhost:3000/api/v1/user/note/" + id)
                .then(res => {
                  context.commit("setNote", res.data);
                  resolve(res.data)
                })
                .catch(err => {
                  console.log(err);
                  reject(err)
                });
            })
          },
          sendNote(ctx, data){
            console.log(data);
            return new Promise((resolve, reject) => {
              axios.post("http://localhost:3000/api/v1/note", data)
                .then(res => {
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                });
            })
          },
          //verif if already voted
          verifIfNote(ctx, data){
            return new Promise((resolve, reject) => {
              axios.post("http://localhost:3000/api/v1/verif_note", data)
                .then(res => {
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                });
            })
          },
          getTop(ctx){
            return new Promise((resolve, reject) => {
              axios.get("http://localhost:3000/api/v1/top")
                .then(res => {
                  resolve(res)
                })
                .catch(err => {
                  reject(err)
                });
            })
          }
    },
}
