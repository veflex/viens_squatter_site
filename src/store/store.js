import Vue from 'vue'
import Vuex from 'vuex'
import annonce from './annonce'
import city from './city'
import theme from './theme'
import user from './user'
import departement from './departement'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    annonce,
    city,
    theme,
    user,
    departement
  }
})
