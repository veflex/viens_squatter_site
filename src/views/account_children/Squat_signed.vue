<template>
  <div class="signed">
  <section class="list">
      <h1 class="title">Squats actifs</h1>
      <div class="list">
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
    </section>
    <section class="done">
      <h1 class="title">Squats passés</h1>
      <div class="list">
        <div class="annonce" v-for="annonce in done" :key="annonce.id">
          <div class="img">
            <img :src="require('./../../assets/annonce_img/' + (annonce.img || annonce.default_img))">
          </div>
          <div class="right">
            <h2> {{annonce.title}} </h2>
            <p>Voir les participants?</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {}
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
    .list{
      height: 90%;
      padding-top: 10px;
      overflow-y: scroll;
    }
    .annonce{
      display: flex;
      flex-wrap: wrap;
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
</style>

