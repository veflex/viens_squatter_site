<template>
    <div id="register" class="register">
        <h2>Devenir Squatteur</h2>
        <msg :msg="msg" :class="css"/>
        <label for="name"></label>
        <input placeholder="Prénom" class="input" type="text" id="name" name="name" required minlength="3" v-model="user.name">

        <label for="nickname"></label>
        <input placeholder="Pseudo" class="input" type="text" id="nickname" name="nickname" required minlength="3" v-model="user.nickname">

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

        <label for="password"></label>
        <input placeholder="Mot de passe" class="input" type="password" id="password" name="password" required v-model="user.password">
        
        <label for="verifPass"></label>
        <input placeholder="Répétez le mot de passe" class="input" type="password" id="verifPass" name="verifPass" required v-model="user.verifPass">

        <button @click="register">click</button>
    </div>
</template>

<script>
import msg from './CutomMsg'
export default {
    data(){
        return {
            user:{
                name: 'alex',
                nickname: 'flex',
                sexe:'H',
                email: 'flex@flex.flex',
                password: 'flextkt',
                verifPass: 'flextkt'
            },
            msg: '',
            css: ''
        }
    },
    methods:{
      register() {
        // const check = this.checkRegister();
        // if (!check.errors) {
            console.log(this.user);
        if (true) {
          // console.log(check.data);
          this.$store
            // .dispatch("user/register", check.data)
            .dispatch("user/register", this.user)
            .then(res => {
              this.msg = 'Votre compte a bien été crée';
              this.css = 'success';
            })
            .catch(err => {
              this.msg = 'Pseudo ou email déja utilisé';
              this.css = 'error';
            });
        }
      }
    },
    components:{
        msg
    }
}
</script>

<style>
    .register{
        user-select : none;
    }
    ul{
        list-style: none;
        margin: 10px 0
    }
    
</style>
