<template>
    <section id="recevoir" class="recevoir">
        <h1 class="title">Créez un squat à votre image !</h1>
        <section class="blocks general">
          <h2 class="title">Les infos générales</h2>
            <!-- titre -->
            <input type="text" class="input" v-model="annonce.title" placeholder="Titre du squat">
            <!-- theme -->
            <selectize v-model="annonce.theme">
                <option :value="null" selected>Thème</option>
                <option v-for="(theme) in themes" :key="theme.id" :value="theme.id">{{ theme.name }}</option>
            </selectize>
            <!-- nb de participants -->
            <input class="input" type="number" v-model="annonce.nb_participants" placeholder="Nombre de participants">
            <!-- date -->
            <input class="input" type="datetime-local" v-model="annonce.date" :min="dateMin">
        </section>
        <section class="blocks image">
          <h2 class="title">L'image du squat</h2>
          <div class="image_container">
            <img :src="annonce.img" alt="image de l'annonce">
          </div>
          <uploader class="uploader" :mimes="['image/jpeg']" :multiple="false"/>
        </section>
        <section class="blocks description">
          <h2 class="title">La description</h2>
          <!-- description -->
          <textarea name="message" class="textarea" v-model="annonce.description" placeholder="Racontez le déroulement de l'évènement" rows="5" cols="30" maxlength="300"></textarea>
        </section>
        <section class="blocks adress">
          <h2 class="title">L'adresse</h2>
            <!-- departement -->
            <selectize v-model="annonce.departement"> 
                <option :value="null" selected>Département</option>
                <option v-for="(departement) in departements" :key="departement.id" :value="departement.id">{{ departement.nom }}</option>
            </selectize>
            <!-- ville -->
            <selectize v-model="annonce.city">
                <option :value="null" selected>Ville</option>
                <option v-for="(city) in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </selectize>
            <!-- adresse -->
            <input type="text" class="input" v-model="annonce.adresse" placeholder="Adresse">
            <!-- code postal -->
            <input type="number" class="input" v-model="annonce.cedex" placeholder="Code postal">
        </section>
          <msg :msg="msg" :class="css" :reset="reset"/>

        <button class="post" @click="post($event)">Poster le squat</button>
    </section>
</template>


<script>
import Selectize from 'vue2-selectize'
import auth from './../utils/auth.js'
import uploader from './../components/Uploader'
import msg from './../components/CutomMsg'
export default {
  data(){
    return {
      number: null,
      annonce:{
        title: 'Soirée chez moi tranquil',
        theme: 13,
        city: 30438,
        departement: 76,
        date: '2019-03-23T17:30',
        nb_participants: 3,
        description: "Salut les squatteur je fais une petite ambiance posée chez moi plus tard dans l'aprem alors hésitez pas a passé !",
        adresse: '250 rue de crimée',
        cedex: 75019,
        img: require('./../assets/annonce_img/default.jpg')
      },
      css: '',
      msg: '',
      dateMin: null,
      files: [],
      axiosConfig: {
        onUploadProgress: progressEvent => {
          let loaded = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          console.log(loaded);
        }
      }
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
    this.$on('upload', function(file){
      this.files = file;
      this.annonce.img = URL.createObjectURL(file[0]);
      console.log(this.annonce.img);
    })
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
      if(!auth.isLoggedIn()){
        this.css ='error';
        this.msg = 'Vous devez vous connecter pour créer un squat'
      }
      const fd = new FormData();        
      Array.from(this.files).forEach(f => {
        fd.append("uploader", f, f.name);
      });
      this.annonce.author = JSON.parse(window.localStorage.getItem('user')).id
      for (let prop in this.annonce) {
          fd.set(prop, this.annonce[prop])
      }
      this.$store.dispatch('annonce/postAnnonce', {that: this, annonce: fd})
        .then(res => {
          this.$router.push({name: 'squat', params: {id: res.data.insertId}})
        })
    },
    reset(){
      this.msg =''
      this.css = ""
    }
  },
  components: {
    Selectize,
    uploader,
    msg
  }
}
</script>

<style lang="scss" scoped>
  @import "~selectize/dist/css/selectize.bootstrap3.css";
  .blocks{
      width: 41%;
      height: 38%;
      min-width: 330px;
      border: 2px solid #273c75;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2{
        width: 100%;
      }
      &.description{
        h2{
          margin-bottom: 0
        }
      }

      &.image{
        overflow: hidden;
        position: relative;
        h2{
          margin-bottom: 0;
          position: relative;
        }
        .image_container{
          height: 76%;
          width: 100%;
          img{
          height: 100%;
          width: 100%;
          object-fit: contain;
          }
        }
        .uploader{
          position: absolute;
          top: 50%;
          left: 35%;
        }
      }
    }
  
  .recevoir{
    h1{
      width: 100%
    }
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 15px;
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
    // max-width: 320px;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  .post{
        padding: 15px 20px;
        border-radius: 5px;
        background: #b2224b;
        width: 30%;
        min-width: 150px;
        align-self: flex-end;
        border: 2px solid transparent;
        color: white;
        font-size: 23px;
        font-weight: 500;
        box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.6);
        cursor: pointer;
        &:hover{
            background: #FFF;
            border: 2px solid #b2224b;
            color: #b2224b
        }
    }


    @media screen and (max-width: 660px){
      .recevoir{
        height: auto;
      }
      h1{
        padding-left: 40px;
        height: auto;
        margin-bottom: 3%
      }
      .blocks{
        margin-bottom: 3%
      }
      .post{
        width: 50%;
      }
    }
</style>
