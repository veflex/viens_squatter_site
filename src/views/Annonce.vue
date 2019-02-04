<template>
    <div class="annonce">
        <h1 class="title" v-if="!user && annonce">T'es sur le Squat de <span>{{annonce.nickname}}</span></h1>
        <h1 class="title" v-else-if="user.id === annonce.id_author">C'est ton squat !</h1>
        <h1 class="title" v-else-if="user && annonce"><span>{{user.nickname}}</span> t'es sur le Squat de <span>{{annonce.nickname}}</span></h1>
        <section class="blocks general">
          <h2 class="title">Les infos générale</h2>
          <p> <span class="nickname">{{annonce.nickname}}</span> vous propose un Squat pour <span class="nb_participants">{{annonce.nb_participants}}</span> personnes sous le thème <span class="theme">{{annonce.theme}}</span> intitulé <span class="titre">{{annonce.title}}</span> l'évènement sera le <span class="date">{{day}} {{month}} {{year}} à {{hour}}h{{min}}</span> </p>  
        </section>
        <section class="blocks image">
          <h2 class="title">L'image</h2>
          <div class="image_container">
            <img v-if="annonce.img ||annonce.default_img" :src="require('./../assets/annonce_img/' + (annonce.img || annonce.default_img))" alt="image de l'annonce">
          </div>
        </section>
        <section class="blocks description">
          <h2 class="title">La description</h2>
          <!-- description -->
          <p> <span> {{annonce.description}} </span> </p>
        </section>
        <section class="blocks adress">
          <h2 class="title">L'adresse</h2>
          <p>Le Squat est au <span>{{annonce.adresse}}</span>, <span>{{annonce.cedex}} {{annonce.ville}}</span>  </p>
        </section>
        <section v-if="isRegistered ||  (user && (annonce.id_author === user.id))" class="blocks comments">
          <h2 class="title">Les commentaires</h2>
          <div>
            <comments :user="user"/>
          </div>
        </section>

          <router-link v-if="user && (annonce.id_author === user.id)" class="post" :to="{name: 'update', params: {id: annonce.id_annonce}}" tag="button">Modifier mon squat</router-link>
        <button v-else-if="!user || !isRegistered" class="post" @click="register($event)">Je m'inscris !</button>
        <div v-else-if="isRegistered" class="unregister">
          <p>Vous êtes inscrit à ce Squat si vous voulez vous désinscrire cliquez en dessous !</p>
          <button @click="unregister($event)">Se désinscrire</button>
        </div>
        
    </div>
</template>

<script>
import comments from './../components/Comments'
export default {
    data(){
        return {
            annonce: {},
            user: {},
            date: null,
            year: null,
            month: null,
            day: null,
            hour: null,
            min: null,
            mois: {'01': 'janvier', '02': 'février', '03': 'mars', '04': 'avril', '05': 'mai', '06': 'juin', '07': 'juillet', '08': 'aout', '09': 'septembre', '10': 'octobre', '11': 'novembre', '12': 'décembre' },
            isRegistered: null,
            allRegistered: []
        }
    },
    created(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.$store.dispatch('annonce/getOneAnnonce', {that: this, id: this.$route.params.id})
            .then((res)=> {
              this.annonce = res;
              this.date = this.annonce.datetime.split('-').join(',').split('T').join(',').split(':').join(',').split(',');
              this.year = this.date[0];
              this.month = this.mois[this.date[1]];
              this.day = this.date[2];
              this.hour = this.date[3];
              this.min = this.date[4];
              if(this.user){
                this.$store.dispatch('inscrit/verifRegister', {annonce: this.annonce.id_annonce, user: this.user.id})
                  .then(res => {
                    if(res.data.length){
                      this.isRegistered = true
                    } else {
                      this.isRegistered = false
                    }
                  })
              }
              this.$store.dispatch('inscrit/annonceRegistration', this.annonce.id_annonce)
                .then(res => {
                  this.allRegistered = res
                })
            })

    },
    methods: {
      register(){
        this.$store.dispatch('inscrit/annonceRegister', {annonce: this.annonce.id_annonce, user: this.user.id})
        this.isRegistered = true
      },
      unregister(){
        this.$store.dispatch('inscrit/annonceUnregister', {annonce: this.annonce.id_annonce, user: this.user.id})
        this.isRegistered = false
      }
    },
    components: {
      comments
    }
}
</script>

<style lang="scss" scoped>
  .annonce{
      h1{
      font-size: 40px;
      width: 100%;
      height: 10%;
      margin-bottom: 20px;
      span::first-letter{
        text-transform: capitalize
      }
    }
      width: 100%;
      height: auto;
      min-height: 100vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 15px;
    }
    .blocks{
      width: 41%;
      height: 300px;
      min-width: 330px;
      margin-bottom: 2%;
      border: 2px solid #273c75;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2{
        width: 100%;
      }
      p{
          padding: 10px;
          font-size: 20px
        }
      span{
          color: #b2224b
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
      &.comments{
        width: 91%;
        h2{
          margin-bottom: 0
        }
        div{
          width: 100%;
          height: 76%;
        }
      }
    }
  
  
  
  .textarea{
    // max-width: 320px;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  .post, .unregister button{
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
    .unregister{
      min-width: 200px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      p{
        width: 100%;
        text-align: center;
        margin-bottom: 5px;
      }
    }


    @media screen and (max-width: 660px){
      .blocks{
        margin-bottom: 3%
      }
    }
</style>

