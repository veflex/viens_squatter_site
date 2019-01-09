<template>
  <div class="home">
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
        <img :src="image" alt="photo du squat">
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
  },
  computed: {
    image(){
      return this.$store.getters['annonce/getAnnonce'].img || "http://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2018-04/VIDEO-Viens-squatter-le-nouveau-clip-de-Felicien-ex-de-Loft-Story.jpg"
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
  .home{
    height: auto;
    // min-height: 100vh;
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
    border: 2px solid #273c75;
    height: 35vh;
    margin-bottom: 1%;
    overflow: hidden;
    min-width: 320px;
    margin-right: 2%;
    flex: 1;
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
      }
      img{
        height: auto;
        width: auto;
        min-width: 100%;
        min-height: 100%;
        display: block;
        margin: auto;
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
  }

  @media screen and (max-width: 1320px) {
    .block{
      // margin-right: 0;
    }
  }
  @media screen and (max-width: 1100px) {
    .input_filter{
      flex-wrap: wrap;
      flex-direction: column;
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

