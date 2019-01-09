<template>
    <div id="connexion" class="connexion">
        <register/>
        <login/>
    </div>
</template>

<script>
import register from '@/components/Register'
import login from '@/components/Login'
export default {
    components: {
        register,
        login
    }
}
</script>

<style lang="scss" scoped>
  .register{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 35%;
  }
  .login{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 35%;
  }
  .connexion {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
  }
</style>

