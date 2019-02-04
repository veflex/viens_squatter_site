<template>
    <div>
        <input type="checkbox" @change="slide" v-model="check"/>
    
        <span></span>
        <span></span>
        <span></span>
        
        <nav v-if="!profilNav" id="nav" class="nav">
            <router-link :to="{name: 'home'}" ><img src="./../assets/img/Logo_final.svg" alt="logo viens squatter" class="logo"></router-link>
            <router-link :to="{name: 'squatter'}" tag="div" class="link">Squatter</router-link>
            <router-link :to="{name: 'recevoir'}" tag="div" class="link">Recevoir des squatteurs</router-link>
            <router-link :to="{name: 'top'}" tag="div" class="link">TOP <br>squatteurs</router-link>
            <router-link v-if="!logged" :to="{name: 'connexion'}" tag="div" class="link">Connexion</router-link>
            <router-link v-if="logged" :to="{name: 'account'}" tag="div" class="link">Profil</router-link>
        </nav>
        <nav v-if="profilNav" id="nav" class="nav">        
            <router-link :to="{name: 'home'}" ><img src="./../assets/img/Logo_final.svg" alt="logo viens squatter" class="logo"></router-link>
            <router-link :to="{name: 'infos'}" tag="div" class="link">Vos infos</router-link>
            <router-link :to="{name: 'my-created'}" tag="div" class="link">Squats créés</router-link>
            <router-link :to="{name: 'my-signed'}" tag="div" class="link">Squats rejoints</router-link>
            <router-link v-if="logged" :to="{name: 'home'}" tag="div" class="link">Retourner sur le site</router-link>
        </nav>

    </div>
</template>

<script>
import auth from './../utils/auth.js'
export default {
    data(){
      return {
        logged: false,
        profilNav: null,
        check: null
      }
    },
    methods: {
        isLogged(){
            this.logged = auth.isLoggedIn();
        },
        slide(){
            const nav = document.getElementById('nav');
            if(this.check){
                nav.classList.add('slideIn')
            } else {
                nav.classList.add('slideOut')
            }
        }
    },
    created(){
        this.$ebus.$on('log', this.isLogged);
        this.isLogged();
    },
    watch:{
    $route (to, from){
        this.check = false;
        const profilRoutes = ["account", "infos", "my-created", "my-signed"];
        if(profilRoutes.includes(to.name)){
            this.profilNav = true
        } else {
            this.profilNav = false
        }
    }
} 
}
</script>

<style lang="scss" scoped>
    .nav{
        background: #273c75;
        border-right: 3px solid #b2224b;
        height: 100vh;
        left: 0;
        max-width: 200px;
        min-width: 200px;
        position: fixed;
        top: 0;
        z-index: 10;
    }
    .logo{
        margin-top: 40px;
        margin-bottom: 10%;
    }
    .link{
        align-items: center;
        background: #b2224b;
        border-radius: 5px;
        box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.65);
        color: white;
        cursor: pointer;
        display: flex;
        font-size: 25px;
        font-weight: bold;
        height: 80px;
        justify-content: center;
        margin-bottom: 20%;
        margin-left: -5%;
        text-align: center;
        width: 100%;
    }
    input{
        display: none;
        height: 50px;
        width: 50px
    }

   
    
    @media screen and (max-width: 1024px) {
         @keyframes menu_slide {
            0% {left: -200px}
            100% {left: 0px}
        }
        input:checked ~ .nav{
            animation-duration: 1s;
            animation-name: menu_slide;
            animation-fill-mode: forwards
        } 
        // .burger{
        //     padding: 10px 0 10px 10px;
        //     width: 100%;
        //     background: #273c75;
            input{
                display: block;
                // width: 35px;
                // height: 25px;
                position: fixed;
                z-index: 1002;
                top: -4px;
                left: -4px;
                cursor: pointer;
                opacity: 0; /* hide this */
                z-index: 1003; /* and place it over the hamburger */
                -webkit-touch-callout: none;
                &:checked ~ span{
                    opacity: 1;
                    transform: rotate(45deg) translate(-2px, -10px);
                    background: #ededed;
                    &:nth-last-child(3){
                        transform: rotate(-45deg) translate(1px, 5px);
                    }

                    &:nth-last-child(2){
                        opacity: 0;
                        transform: rotate(0deg) scale(0.2, 0.2);
                    }

                }
            }
        // }
        span{
            display: block;
            width: 33px;
            z-index: 1002;
            height: 4px;
            top: 10px;
            left: 10px;
            position: fixed;
            background: #b2224b;
            border-radius: 3px;
            transform-origin: 4px 0px;
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.55s ease;
            &:nth-child(3){
                top: 30px;
            }
            &:first-child{
                transform-origin: 0% 0%;
            }
            &:nth-child(2){
                top: 20px;
                transform-origin: 0% 100%;
            }
        }
        .nav{
            left: -200px;
            height: 100vh;
            max-height: 100vh;
            box-shadow: none;
            z-index: 1001;
            padding-top: 20px;
            .logo{
                width: 60%
            }
            .link{
                height: auto;
                padding: 2%
            }
        }
    }
</style>

