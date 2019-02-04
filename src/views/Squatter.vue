<template>
  <div class="squatter">
    <!-- <section class="annonces">
      <h1>TROUVE TON SQUAT !</h1>
      <div class="filter">
        <listfilter/>
      </div>
      <div class="list_container">
        <list class="list"/>
      </div>
    </section>
    <h2 class="close">Les Squats près de chez vous !</h2>
    <Map class="mapContainer"/>
    <detail v-if="show === 1" class="detail"/> -->
    <section class="filter">
      <h1 class="title">TROUVE TON SQUAT !</h1>
      <listfilter class="input_filter" />
    </section>
    <div class="wrapper">
      <section class="block squat">
        <h2 class="title">Les Squats</h2>
        <div class="liste">
          <list/>
        </div>
      </section>
      <section class="block image">
        <h2 class="title">Photo du squat</h2>
        <div class="image_container">
          <img :src="require('./../assets/annonce_img/'+ image)" alt="photo du squat">
        </div>
      </section>
      <section class="block details">
        <h2 class="title">Détails</h2>
        <detail class="detail"/>
      </section>
      <section class="block map" id="map">
        <!-- <h2 class="title index">Autours de vous</h2> -->
        <Map class="mapContainer"/>
      </section>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import list from '@/components/Liste_annonce'
import listfilter from '@/components/Filter'
import detail from '@/components/Annonce_detail'
import Map from '@/components/Map'
export default {
  name: 'home',
  data(){
    return {
    }
  },
  created(){
    this.$store.commit('annonce/SET_ONE_ANNONCE', {});
  },
  computed: {
    image(){
      return this.$store.getters['annonce/getAnnonce'].img || this.$store.getters['annonce/getAnnonce'].default_img || 'default.jpg'
    }
  },
  methods: {
  },
  components: {
    list,
    detail,
    Map,
    listfilter
  }
}
</script>

<style lang="scss" scoped>
  .squatter{
    height: 100vh;
    padding-top: 1.4%;
  }
  
  h1{
    font-size: 35px !important;
  }

  .filter{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 2px solid #273c75;
    margin: 0 auto 1%;
    padding-bottom: 1%;
  }

  .input_filter{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .wrapper{
    width: 90%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }

  .block{
    width: 49.5%;
    min-width: 340px;
    border: 2px solid #273c75;
    height: 40vh;
    margin-bottom: 1%;
    overflow: hidden;
    margin-right: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    h2{
      width: 100%
    };
    &:nth-child(3), &:nth-child(4){
      margin-right: 0
    }
    &.squat{
      h2{
        margin-bottom: 0;
      }
      .liste{
        overflow-y: scroll;
        width: 100%;
        height: 76%;
      }
    }
    &.image{
      h2{
        margin-bottom: 0;
        position: relative;
      }
      .image_container{
        width: 100%;
        height: 76%;
        img{
          height: 100%;
          width: 100%;
          object-fit: contain
        }
      }
    }
    &.details{
      position: relative;
      h2{
        margin: 0
      };
      .detail{
        overflow-y: scroll;
        text-overflow: ellipsis;
        padding: 10px;
        width: 100%;
        height: 76%;
     } 
    }
    &.map{
      height: 30vh;
      min-width: 900px;
    }
    
  }

  @media screen and (max-width: 1380px) {
    .squatter{
      height: auto;
    }
    .block{
      width: 50%
    }
    .block:nth-child(2){
      margin-right: 0;
    }
    .block:nth-child(3){
      margin-right: 2%;
    }
    .block:nth-child(4){
      height: 40vh;
      min-width: 340px;
    }
  }
  @media screen and (max-width: 1100px) {
    .input_filter{
      flex-wrap: wrap;
      flex-direction: column;
    }
    .block{
      flex: none;
      width: 100%
    }
  }
  @media screen and (max-width: 971px) {
    .wrapper{
      flex-direction: column;
    }
    .block{
      width: 100%;
    }
    .block:nth-child(odd){
      margin-right: 0
    }
  }

  @media screen and (max-width: 768px) {
    .block {
      &.squat, &.image{
        margin-right: 0
      }
    }
  }
  
  
</style>

