<template>
  <section class="participant">
    <h2 class="title">
      Liste des participants
    </h2>
    <div v-if="participants && participants.length" class="list">
      <div class="user" v-for="(participant,i) in participants" :key="participant.id">
        <p>{{i+1}}. <router-link :to="{name: 'user', params: {id: participant.id}}" tag="span">{{participant.nickname}}</router-link></p>
        <p v-if="allowNotes" class="note" @click="show = true">Le noter</p>
        <msg v-if="allowNotes" :msg="msg" :class="css" :reset="reset"/>
        <div v-if="allowNotes && show">
          <select name="note" id="note" v-model="note">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="validate" @click="sendNote(user.id)">Valider</button>
        </div>
      </div>
    </div>
    <p v-else class="nope">Il n'y a pas eu de participants :( </p>
  </section>
</template>

<script>
import msg from './../components/CutomMsg'
export default {
  data(){
    return{
      participants: null,
      show: null,
      note: 5,
      user: null,
      msg: null,
      css: null
    }
  },
  props: ["id", "allowNotes"],
  created(){
    console.log(this.id);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.$store.dispatch('inscrit/annonceRegistration', this.id).then(res=>{
      console.log(res);
      if(this.allowNotes){
        this.participants = res.data.filter(user => {
          return user.id != this.user.id
        })
      } else {
        this.participants = res.data;
        this.$parent.$emit('nb_participants', this.participants.length)
      }
      console.log(this.participants);
    }).catch(err => {
      console.error(err);
    })
  },
  methods: {
    sendNote(id){
      const data = {event: this.id, has_noted: this.user.id, is_noted: id, note: this.note};
      //on vérif si l'user a déja voté pour ce participant
      console.log(data);
      this.$store.dispatch('user/verifIfNote', data)
        .then(res => {
          console.log('ressss?', res);
          if(res.data.length){
            //si oui msg d'erreur
            this.msg = 'Vous avez déja noté cet utilisateur';
            this.css = 'error',
            this.show = null
          } else {
            //si non on envois la note en base
            this.$store.dispatch('user/sendNote', data)
              .then(res => {
                this.msg = 'Note prise en compte!';
                this.css = 'success',
                this.show = null
              })
          }
        })
    },
    reset(){
      this.msg='';
      this.css= ''
    }
  },
  components: {
    msg
  }
}
</script>

<style lang="scss" scoped>
  .participant{
    width: 320px;
    height: auto;
    border: 2px solid #273c75;
    background: white;
    .nope{
      padding: 10px;
      font-size: 20px;
    }
    .user{
      padding: 5px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      div{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      p{
        font-size: 20px;
        padding-left: 5px;
        width: 50%;
        margin-bottom: 10px;
        span{
          cursor: pointer;
          color: #b2224b;
          text-decoration: none;
          text-decoration: underline;
        }
      }
      select{
        margin-left: 10%
      }
      .validate{
        background: #b2224b;
        color: white;
        border: 1px solid #273c75;
        margin-right: 5%;
        padding: 5px;
        border-radius: 3px
      }

      .note{
        text-align: right;
        color: #b2224b;
        cursor: pointer;
        padding-right: 5px;
      }
    }
  }
</style>
