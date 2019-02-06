<template>
  <div class="signed">
  <section class="list">
      <h1 class="title">Squats rejoins</h1>
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
      <p v-else class="nope">Vous n'avez pas rejoins de squat</p>
    </section>
    <section class="done">
      <h1 class="title">Squats passés</h1>
      <div class="list">
        <div class="annonce" v-for="annonce in done" :key="annonce.id">
          <div class="img">
            <img :src="require('./../../assets/annonce_img/' + (annonce.img || annonce.default_img))">
          </div>
          <div class="right">
            <h2> {{annonce.title}}</h2>
            <p @click="show = annonce.id" class="show">Voir les participants</p>
            <div v-if="show === annonce.id" @click="hide($event)" class="participants">
              <participants :id="annonce.id" :allowNotes="true"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import participants from './../../components/Participant'
export default {
  data(){
    return {
      user: {},
      show: null
    }
  },
  computed:{
    active(){
      return this.$store.getters['inscrit/getSubActive']
    },
    done(){
      return this.$store.getters['inscrit/getSubDone']
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.$store.dispatch('inscrit/userRegistration', this.user.id)
    console.log(this.user);

  },
  methods:{
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
  .signed{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap
  }
  section{
    height: 90%;
    width: 45%;
    border: 2px solid #273c75;
    min-width: 320px;
    overflow: hidden;
    .nope{
        font-size: 20px;
        padding: 10px;
      }
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
    .signed{
      height: auto;
      min-height: 100vh
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

