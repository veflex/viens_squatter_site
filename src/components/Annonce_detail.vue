<template v-if="show" >
    <section class="details">
        <div v-if="!annonce">
            <p>Cliquez sur un squat pour voir les détails !</p>
        </div>
        <div v-else>
            <h2>{{detail.title}}</h2>
            <p>Par: <span><router-link :to="{name: 'user', params: {id: detail.id_author}}" class="author">{{ detail.name }}</router-link></span></p>
            <p class="adress">Adresse: {{ detail.adresse }} {{detail.cedex}}</p>
            <p class="description">{{detail.description}}</p>
            <router-link :to="{name: 'squat', params: {id :detail.id_annonce}}" tag="p" class="redirect">Voir le Squat</router-link>
        </div>

    </section>
</template>

<script>
  export default {
    data(){
      return {
          annonce: false
      }
    },
    computed: {
      detail(){
        return this.$store.getters['annonce/getAnnonce']
      }
    },
    methods: {
        show(){
            this.annonce = true
        }
    },
    created(){  
        this.$ebus.$on('show_details', this.show)
    },
    updated(){
      
    }
  }
</script>

<style lang="scss" scoped>
  h2{
    margin-bottom: 5px;
  }
  p{
    margin-bottom: 5px;
    font-size: 17px;
  }
  h2::first-letter{
    text-transform: capitalize
  }
  .description{
      text-overflow: ellipsis;
    &::first-letter{
        text-transform: capitalize
    }
  }
  .author{
    text-decoration: underline;
    font-weight: bold;
    color: #273c75
  }
  .detail{
    position: relative;
  }
  .redirect{
    font-size: 25px;
    color: #b2224b;
    text-align: right;
    font-weight: bold;
  }
</style>
