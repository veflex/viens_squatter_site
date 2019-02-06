<template>
  <div v-if="user" class="user">
    <h1 class="title">T'es sur le profil de <span>{{user.nickname}}</span></h1>
    <section class="detail">
      <div class="block img">
        <h2 v-if="user.sexe === 'H'" class="title">Photo du beau gosse</h2>
        <h2 v-else-if="user.sexe === 'F'" class="title">Photo de la belle gosse</h2>
        <figure>
          <img :src="require('./../assets/user_img/' + user.img)" :alt="'photo de profil de ' + user.nickname">
        </figure>
      </div>
      <div v-if="note" class="block note">
        <h2 class="title">Note</h2>
        <div>
          <p v-if="note.note">{{note.note}}/5 ({{note.nb_votant}} vote)</p>
          <p v-else>Vous n'avez pas encore de note !</p>
        </div>
      </div>
    </section>
    <section v-if="squats" class="squats">
      <h2 class="title">Ses Squats</h2>
      <div class="liste">
        <div class="squat" v-for="squat in squats" :key="squat.id">
          <figure>
            <img :src="require('./../assets/annonce_img/' + (squat.img || squat.default_img))" :alt="'squat de ' + squat.nickname + ' ' + squat.title">
          </figure>
          <div>
            <h2> {{squat.title}} </h2>
            <router-link :to="{name: 'squat', params: {id: squat.id_annonce}}" tag="p" class="redirect">Voir le Squat</router-link>
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
            user: null,
            note: null,
            squats: null
        }
    },
    created(){
        this.$store.dispatch('user/getOneUser', this.$route.params.id)
            .then(res => {
                this.user = res;
                this.$store.dispatch('user/getNote', this.user.id)
                  .then(res=>{
                    console.log(res.note);
                    this.note = res
                  })
                this.$store.dispatch('annonce/getUsersAnnonces', this.user.id)
                  .then(res=>{
                    this.squats = res.data
                    console.log(res);
                  })
            })
    }
}
</script>

<style lang="scss" scoped>
    .user{
      width: 100%;
      height: auto;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      h1{
        width: 100%;
        span{
            text-transform: capitalize;
        }
      }
      .detail{
        width: 100%;
        height: 35vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 3%;
        .block{
          width: 30%;
          min-width: 320px;
          height: auto;
          border: 2px solid #273c75;
          &.img{
            .title{
              margin-bottom: 0
            }
            figure{
              width: 100%;
              height: 76%;
            }
            img{
              height: 100%;
              width: 100%;
              object-fit: contain;
            }
          }
          &.note{
            min-height: 200px;
            h2{
              margin-bottom: 0
            }
            div{
              height: 76%;
              display: flex;
              justify-content: center;
              align-items: center;
              p{
                margin-top: -5%;
                font-size: 20px;
              }

            }

          }
        }
      }
      .squats{
        width: 80%;
        height: 40vh;
        border: 2px solid #273c75;
        h2{
          margin-bottom: 0
        }
        .liste{
          height: 76%;
          width: 100%;
          overflow-y: scroll;
          display: flex;
          flex-wrap: wrap;
          .redirect{
            color: #b2224b;
            cursor: pointer
          }
          .squat{
            width: 50%;
            display: flex;
            padding-top: 5px;
            padding-left: 5px;
            h2{
              margin-bottom: 3%
            }
            figure{
              width: 20%
            }
            div{
              width: 80%;
              padding-top: 10px;
              padding-left: 10px;
              text-align: center;
            }
          }
        }
      }
    }

    @media screen and (max-width: 650px) {
      .user{
        height: auto;
        .block{
          margin-bottom: 3%
        }
        .detail{
          height: auto;
        }
        .squats{
          width: 320px;
          margin-bottom: 3%;
          .liste{
            height: 80%;
          }
          .squat{
            width: 100% !important
          }
        }
      }
    }
</style>

