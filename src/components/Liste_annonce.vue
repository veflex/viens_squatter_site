<template>
    <section id="list" class="list">
        <div class="annonce" v-for="(annonce) in list" :key="annonce.id" @click="detail($event, annonce.id_annonce)">
            <article class="détails">
                <h2>{{ annonce.title }}</h2>
                <p>{{ annonce.ville }}, {{annonce.cedex}}</p>
            </article>
            <!-- <hr class="hr"> -->
        </div>
    </section>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('annonce/getAnnonces', {that: this, ville: null, theme: null})
    },
    computed :{
        list(){
            return this.$store.getters["annonce/getList"]
        }
    },
    methods: {
        detail(evt, id){
            this.addBorder(evt);
            this.$ebus.$emit('show_details');
            this.$store.dispatch('annonce/getOneAnnonce', {that: this, id})
        },
        addBorder(evt){  
            this.deleteBorder();                 
            if(evt.target.classList.length === 0){
                evt.target.parentElement.parentElement.classList.toggle('is-active')
            } else if (evt.target.classList[0] === 'annonce') {
                evt.target.classList.toggle('is-active');
            } else if (evt.target.classList.value != 'annonce'){
                evt.target.parentElement.classList.toggle('is-active');
            } else {
                evt.target.classList.toggle('is-active')
            }
        },
        deleteBorder(){
            const hasClass = document.querySelector('.is-active');
            if(hasClass){
                hasClass.classList.remove('is-active')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .annonce{
        position: relative;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 10px;
        padding-left: 20px;
        cursor: pointer;
        user-select: none;
    }

    article{
        h2{
            font-size: 20px;
            &::first-letter{
                text-transform: capitalize;
            }
        }
        p{
            font-size: 17px;
        }
    }
    .is-active{
        background: #b2224b;
        color: white;
    }
</style>
