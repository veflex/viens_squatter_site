<template>
    <section id="recevoir" class="recevoir">
      <div class="container shadow" id="container">
        <h1 class="title">Créez un squat à votre image !</h1>
          <section>
            <div class="image">
              <img :src="annonce.img" alt="photo du squat">
              <!-- uploaaaader -->
            </div>
            <div class="right">
              <!-- titre -->
              <input type="text" class="input" v-model="annonce.title" placeholder="Titre du squat">
              <!-- theme -->
              <selectize v-model="annonce.theme"> <!-- settings is optional -->
                  <option :value="null" selected>Thème</option>
                  <option v-for="(theme) in themes" :key="theme.id" :value="theme.id">{{ theme.name }}</option>
              </selectize>
              <!-- nb de participants -->
              <input class="input" type="number" v-model="annonce.nb_participants" placeholder="Nombre de participants">
              <!-- date -->
              <input class="input" type="datetime-local" v-model="annonce.date" :min="dateMin">
            </div>
          </section>
          <section class="desc">
             <div class="left">
              <!-- departement -->
              <selectize v-model="annonce.departement"> 
                  <option :value="null" selected>Département</option>
                  <option v-for="(departement) in departements" :key="departement.id" :value="departement.id">{{ departement.nom }}</option>
              </selectize>
              <!-- ville -->
              <selectize v-model="annonce.city"> <!-- settings is optional -->
                  <option :value="null" selected>Ville</option>
                  <option v-for="(city) in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
              </selectize>
              <!-- adresse -->
              <input type="text" class="input" v-model="annonce.adresse" placeholder="Adresse">
              <!-- code postal -->
              <input type="number" class="input" v-model="annonce.cedex" placeholder="Code postal">
            </div>
            <!-- description -->
            <textarea name="message" class="textarea" v-model="annonce.description" placeholder="Description" rows="5" cols="30" maxlength="300"></textarea>
            <button @click="post($event)">Poster le squat</button>
          </section>
          <!-- image a faire avec l'uploader -->
      </div>
    </section>
</template>

<script>
import Selectize from 'vue2-selectize'
import auth from './../utils/auth.js'

export default {
  data(){
    return {
      number: null,
      annonce:{
        title: 'Soirée chez moi tranquil',
        theme: 2,
        city: 30438,
        departement: 76,
        date: '2019-03-23T17:30',
        nb_participants: 3,
        description: "Salut les squatteur je fais une petite ambiance posée chez moi plus tard dans l'aprem alors hésitez pas a passé !",
        adresse: '250 rue de crimée',
        cedex: 75019,
        img: require('./../assets/img/recevoir.jpg')
      },
      dateMin: null
    }
  },
  computed:{
    themes(){
      return this.$store.getters["theme/getThemes"]
    },
    cities(){
      return this.$store.getters["city/getCities"]
    },
    departements(){
      return this.$store.getters["departement/getDepartements"]
    },
  },
  created(){
    this.$store.dispatch('city/getCities', this)
    this.$store.dispatch('theme/getThemes', this)
    this.$store.dispatch('departement/getDepartements', this)
    this.dateMin = this.getDate();
    this.annonce.date = this.dateMin
  },
  methods:{
    getDate(){
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
      return today
    },
    post(evt){
      evt.preventDefault();
      this.annonce.author = this.$store.getters["user/getUser"].id
      this.$store.dispatch('annonce/postAnnonce', {that: this, annonce: this.annonce})
    }
  },
  components: {
    Selectize
  }
}
</script>

<style lang="scss" scoped>
  @import "~selectize/dist/css/selectize.bootstrap3.css";
  section{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center
  }
  .recevoir{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container{
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    img{
      width: 320px;
      height: auto;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  h1{
    font-size: 40px;
    width: 100%;
    height: 10%;
    margin-bottom: 0
  }
  .textarea{
    max-width: 320px;
    font-size: 20px;
  }
</style>
