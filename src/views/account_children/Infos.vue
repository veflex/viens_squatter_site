<template>
  <div v-if="user" class="infos">
    <h1 class="title">Salut <span>{{user.nickname}}</span></h1>
    <div class="left">
      <div class="image block">
        <h2 v-if="user.sexe === 'H'" class="title">Photo du beau gosse</h2>
        <h2 v-else class="title">Photo de la belle gosse</h2>
        <p v-if="!user.img">Ce cadre a l'air un peu vide non ? <br> N'hésites pas à y mettre une photo en cliquant sur parcourir !</p>
        <div v-else class="img_container">
          <img  ref="image" :src="user.img" alt="photo de profil">
        </div>
        <uploader class="uploader" :mimes="['image/jpeg']" :multiple="false"/>
      </div>
      <div v-if="note" class="note block">
        <h2 class="title">Votre note !</h2>
        <div>
          <p v-if="note.note">{{note.note}}/5 ({{note.nb_votant}} vote)</p>
          <p v-else>Vous n'avez pas encore de note !</p>
        </div>
      </div>
    </div>
    <div class="right">
        <h2 class="title">Informations Perso</h2>
        <p>Vous pouvez modifier vos informations en les modifiant et en validant le bouton modifier</p>
        <msg :msg="msg" :class="css" :reset="reset"/>
        <label for="name"></label>
        <input placeholder="Prénom" class="input" type="text" id="name" name="name" required minlength="3" maxlength="20" v-model="user.name">

        <label for=""></label>
        <input placeholder="Pseudo" class="input" type="text" id="nickname" name="nickname" required minlength="3" maxlength="20" v-model="user.nickname">

        <label for="email"></label>
        <input placeholder="Email" class="input" type="email" id="email" name="email" required v-model="user.email">

        <label for="sexe" class="sexe">Sexe:
        <label>
            <input class="radio" type="radio" name="sexe" value="H" v-model="user.sexe"> Homme
        </label>
        <label>
            <input class="radio" type="radio" name="sexe" value="F" v-model="user.sexe"> Femme
        </label>
        </label>
        <button @click="updateUser" class="modif">Modifier</button>
        <h3 class="logout" @click="logOut(this)">Se déconnecter</h3>
    </div>
  </div>
</template>

<script>
  import auth from './../../utils/auth.js';
  import msg from './../../components/CutomMsg.vue';
  import uploader from './../../components/Uploader.vue'
export default {


  data(){
      return {
        user: null,
        note: null,
        msg: null,
        css: null,
        files: [],
        axiosConfig: {
          onUploadProgress: progressEvent => {
            let loaded = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            console.log(loaded);
          }
        }
      }
    },
    methods:{
      logOut() {
        auth.logUserOut(this);
        this.$ebus.$emit('log');
        localStorage.removeItem('user');
        localStorage.removeItem('note');
      },
      updateUser(){
        const fd = new FormData(); 
        if(this.files.length){
          Array.from(this.files).forEach(f => {
            fd.append("uploader", f, f.name);
          });
        } else {
          this.user.img = this.old_img
        }
        for (let prop in this.user) {
          fd.set(prop, this.user[prop])
        }
        this.$store.dispatch('user/updateUser', fd)
          .then(res => {
            this.user.img = require(`./../../assets/user_img/${fd.get('img')}`)
          })
        this.changeMsg()
      },
      // changement du msg custom
      changeMsg(){
        this.msg = 'Votre profil a été modifier avec succès';
        this.css = 'success'
      },
      // fonction du reset du message custom
      reset(){
        this.msg='';
        this.css= ''
      }
    },
    beforeCreate(){
      
      },
    created(){
      //on get l'user et sa note a chaque created
      const userId = JSON.parse(window.localStorage.getItem('user')).id;
      // this.user = JSON.parse(window.localStorage.getItem('user'))
      // this.note = JSON.parse(window.localStorage.getItem('note'))
      this.$store.dispatch('user/getOneUser', userId).then((res) => {
        this.user = res
        //affichage de l'image d'un user et sauvegarde de l'ancienne
        this.old_img = this.user.img
        if(this.user.img){
          this.user.img = require(`./../../assets/user_img/${this.old_img}`);
        }
      })
      this.$store.dispatch('user/getNote', userId).then((res) => this.note = res)
      this.$on('upload', function(file){
        this.files = file;
        this.user.img = URL.createObjectURL(file[0]);
      })
    },
    mounted(){
    },
    components: {
      msg,
      uploader
    }
}
</script>

<style lang="scss" scoped>
  .infos{
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  h1{
    font-size: 40px;
    width: 100%;
    height: 10%;
    margin-bottom: 0;
    span{
      display: inline-block;
      &::first-letter{
      text-transform:uppercase
      }
    }
  }
  .left{
    width: 40%;
    height: 70%;
    min-width: 340px;
    .image{
      position: relative;
      .img_container{
        height: 76%;
        width: 100%;
        img{
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      h2{
        position: relative;
        margin-bottom: 0;
        z-index: 2;
      }
      .uploader{
            position: absolute;
            top: 50%;
            left: 30%;
          }
    }
  }
  .right{
    width: 50%;
    min-width: 340px;
    min-height: 500px;
    height: 72.5%;
    border: 2px solid #273c75;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    h2{
      width: 100%;
      height: 11%;
    }
    p{
      padding-left: 10px;
      margin-bottom: 3%
    }
    .logout{
      position: absolute;
      width: 30%;
      min-width: 150px;
      cursor: pointer;
      padding-bottom: 10px;
      bottom: 0;
      right: 0;
      &:hover{
        color: #b2224b
      }
    }

  }
  .block{
    width: 90%;
    height: 50%;
    min-height: 200px;
    border: 2px solid #273c75;
    margin-bottom: 5%;
    p{
      padding-left: 10px
    }
    &.note{
      div{
        min-height: 130px;
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

  .modif{
        padding: 15px 20px;
        border-radius: 5px;
        background: #b2224b;
        min-width: 150px;
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

    @media screen and (max-width: 1140px) {
      h2{
        height: auto
      }
      .block:first-child{
        height: auto;
      }

      
    }
    @media screen and (max-width: 880px) {
      
      h1{
        margin-bottom: 5%;
      }
      .left{
        .block{
          width: 100%
        }
      }
      
    }

    @media screen  and (max-width: 680px){
      .infos{
        height: auto;
      }
      
    }
  
</style>

