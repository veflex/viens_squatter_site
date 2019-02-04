<template>
    <div id="filter">
        <selectize v-model="city" class="select"> <!-- settings is optional -->
            <option :value="null" selected>Choisissez votre ville</option>
            <option v-for="(city) in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </selectize> 
        <selectize class="second select" v-model="theme"> <!-- settings is optional -->
            <option :value="null" selected>Choisissez un thème</option>
            <option v-for="(theme) in themes" :key="theme.id" :value="theme.id">{{ theme.name }}</option>
        </selectize>  
        <button @click="test" class="squatter">Squatter !</button>  
    </div>
</template>    

<script>
import Selectize from 'vue2-selectize'
export default {
    data() {
    return {
      settings: {}, // https://github.com/selectize/selectize.js/blob/master/docs/usage.md
      selected: 1,
      city: null,
      theme: null
    }
  },
  created(){
    this.$store.dispatch('city/getCities', this);
    this.$store.dispatch('theme/getThemes', this);
    
  },
  mounted(){
  },
  computed: {
      cities(){
          return this.$store.getters["city/getCities"]
      },
      themes(){
          return this.$store.getters["theme/getThemes"]
      }
  },
  methods:{
    test(){
      this.$store.dispatch('annonce/getAnnonces', {that: this, ville: this.city, theme: this.theme})
    }
  },
  components: {
      Selectize
  }
}
</script>

<style lang="scss" scoped>
    @import "~selectize/dist/css/selectize.bootstrap3.css";

    .squatter{
        padding: 15px 20px;
        border-radius: 5px;
        background: #b2224b;
        border: 2px solid transparent;
        color: white;
        font-size: 23px;
        font-weight: 500;
        box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.6);
        margin-top: -1%;
        cursor: pointer;
        &:hover{
            background: #FFF;
            border: 2px solid #b2224b;
            color: #b2224b
        }
    }
    
</style>

