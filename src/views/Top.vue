<template>
    <section v-if="top" class="top">
        <h1 class="title">Nos meilleurs squatteurs !</h1>
        <div class="container" v-for="user in top" :key="user.id">
            <div class="user">
                <h2 class="title"> {{user.pseudo}} </h2>
                <p>Avec une note de {{user.note}}/5 pour {{user.votant}} votant !</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            top: null
        }
    },
    created(){
        this.$store.dispatch('user/getTop').then(res => {
            this.top = res.data
            console.log(res.data);
        })
    }

}
</script>

<style lang="scss" scoped>
    .top{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        h1{
            width: 100%;
            height: 10%;
            align-self: flex-start;
            margin-bottom: -5%
        }
        .container{
            width: 33%;
            min-width: 320px;
            height: 35vh;
            display: flex;
            justify-content: center
        }
        .user{
            width: 320px;
            height: 100%;
            border: 2px solid #273c75;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            h2{
                width: 100%;
                align-self: flex-start
            }
            p{
                text-align: center;
                font-size: 20px;
                margin-top: -10%;
                padding: 0 5px;
            }
        }
    }
    @media screen and (max-width: 640px) {
        .top{
            height: auto;
        }
        h1{
            padding-left: 40px;
            margin-bottom: 5% !important
        }
        .container{
            margin-bottom: 3%
        }
    }
</style>
