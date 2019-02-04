<template>
  <section class="comments">
    <div class="feed" id="feed">
      <div v-for="comment in comments" :key="comment.id">
        <div class="me" v-if="comment.id_author_com === user.id">
          <p> Moi: {{comment.comment}} </p>
        </div>
        <div class="other" v-else>
          <p> {{comment.nickname}}: {{comment.comment}} </p>
        </div>
      </div>
    </div>
    <div class="comment">
      <textarea v-model="comment" name="comment" id="comment" cols="30" rows="1"></textarea>
      <button class="send" @click="sendComment">Envoyer !</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comment: null,
      height: null,
      refreshComment: null
    }
  },
  props: ['user'],
  computed: {
    comments() {
      return this.$store.getters['comments/getComments']
    }
  },
  created(){
    const that = this
    this.refreshComment = setInterval(function(){
      that.getComments()
    }, 1000)
  },
  watch:{
    $route (to, from){
      console.log(this.refreshComment);
    },
  },
  mounted(){
    const feed = document.getElementById('feed');
    this.height = feed.scrollHeight
    feed.scrollTop = feed.scrollHeight
    
  },
  methods: {
    sendComment(){
      const feed = document.getElementById('feed');
        this.$store.dispatch('comments/sendComment', {id_author_com: this.user.id, id_annonce_com: this.$route.params.id, comment: this.comment}).then(()=> {
            this.$store.dispatch('comments/getAnnonceComments', this.$route.params.id).then(()=>{
              feed.scrollTop = feed.scrollHeight
            })
        });
      this.comment = null;
      
    },
    getComments(){
      this.$store.dispatch('comments/getAnnonceComments', this.$route.params.id)
      .then(res => {
        const feed = document.getElementById('feed');
        if(!feed){
          clearInterval(this.refreshComment)
        }
        else if(feed.scrollHeight !== this.height){
          this.height = feed.scrollHeight;
          feed.scrollTop = feed.scrollHeight
        }
          
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .comments{
    width: 100%;
    height: 100%;
    position: relative;
    .feed{
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: scroll;
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      .me, .other{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        p{
          width: 40%;
          padding: 10px;
          border: 2px solid #b2224b;
          border-radius: 5px;
          height: auto;
          margin-bottom: 5px;
        }
      }
      .other{
        justify-content: flex-start;
        p{
          border: 2px solid #273c75;

        }
      }
    }
    .comment{
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;

      textarea{
        width: 90%;
        height: 40px;
        font-size: 23px
      }
      .send{
        width: 10%;
        padding: 5px 20px;
        background: #b2224b;
        min-width: 150px;
        align-self: flex-end;
        border: 2px solid transparent;
        color: white;
        font-size: 23px;
        font-weight: 500;
        cursor: pointer;
        &:hover{
            background: #FFF;
            border: 2px solid #b2224b;
            color: #b2224b
      }
    }
  }
  }
</style>

