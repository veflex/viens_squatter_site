<template>
  <div class="created">
    <section class="section">
      <h1 class="title">Vos squats actifs</h1>
      <div v-if="active && active.length" class="list">
        <div class="annonce" v-for="annonce in active" :key="annonce.id">
          <div class="img">
            <img :src="require('./../../assets/annonce_img/' + (annonce.img || annonce.default_img))">
          </div>
          <div class="right">
            <h2> {{annonce.title}} </h2>
            <router-link :to="{name: 'squat', params: {id :annonce.id_annonce}}" tag="p" class="redirect">Aller au Squat</router-link>
          </div>
        </div>
      </div>
      <div v-else >
        <p class="not">Vous n'avez pas de squat actif</p>
      </div>
    </section>
    <section class="section">
      <h1 class="title">Vos squats passés</h1>
      <div v-if="done && done.length" class="list">
        <div class="annonce" v-for="annonce in done" :key="annonce.id">
          <div class="img">
            <img :src="require('./../../assets/annonce_img/' + (annonce.img || annonce.default_img))">
          </div>
          <div class="right">
            <h2> {{annonce.title}} </h2>
            <p @click="show = annonce.id_annonce" class="show">Voir les participants</p>
            <div v-if="show === annonce.id_annonce" @click="hide($event)" class="participants">
              <participants :id="annonce.id_annonce" :allowNotes="true"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="not">Vous n'avez pas encore organiser un squat !</p>
      </div>
    </section>
  </div>
</template>

<script>
import participants from './../../components/Participant'
export default {
  data(){
    return{
      user:null,
      show:null
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem('user'));     
    this.$store.dispatch('annonce/getUsersAnnonces', this.user.id);
  },
  computed: {
    active(){
      return this.$store.getters['annonce/getUserAnnoncesActive']
    },
    done(){
      return this.$store.getters['annonce/getUserAnnoncesDone']
    }
  },
  methods: {
    hide(evt){
      if(evt.target.classList[0] === 'participants'){
        this.show = null
      }
    }
  },
  components:{
    participants
  }
}
</script>

<style lang="scss" scoped>
  .created{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap
  }
  .section{
    height: 90%;
    width: 45%;
    border: 2px solid #273c75;
    min-width: 320px;
    overflow: hidden;
    .participants{
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      & *{
        position: absolute;
        top: 30%;
        left: 40%;
      }
    }
    .not{
      width: 100%;
      text-align: center;
      font-size: 20px;
      padding-top: 10px;
    }
    
    .list{
      height: 90%;
      padding-top: 10px;
      overflow-y: scroll;
    }
    .annonce{
      display: flex;
      margin-bottom: 3%;
      .img{
        width: 40%;
        margin-left: 10%;
        max-width: 160px;
      }
      .right{
        display: flex;
        padding-top: 5%;
        flex-direction: column;
        align-items: center;
        width: 60%;
        .show{
          color: #b2224b;
          cursor: pointer;
        }
        h2{
          margin-bottom: 7%;
          width: 100%;
          text-align: center;
          &::first-letter{
            text-transform: capitalize
          }
        }
        .redirect{
          cursor: pointer;
          color: #b2224b
        }
      }

    }
  }
  .title{
    height: 10%;
    margin-bottom: 0
  }

  @media screen and (max-width: 800px) {
    .created{
      height: auto;
    }
    section{
      &:first-of-type{
        margin-top: 3%
      }
      width: 60% !important;
      margin-bottom: 3%
    }
  }

</style>
