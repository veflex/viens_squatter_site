<template>
  <div id="account" class="account">
    <section v-if="($route.name === 'account')" class="how" id="how">
			<article class="infos">
				<h2>Vos Infos</h2>
				<p>Retrouvez vos informartions personnelles et votre note de Squatteur</p>
			</article>
			<article class="cree">
				<h2>Squats Crées</h2>
				<p>Accedez rapidements aux Squats que vous avez poster</p>
			</article>
			<article class="rejoins">
				<h2>Squats Rejoins</h2>
				<p>La liste des Squats auquels vous êtes inscrits</p>
			</article>
		</section>

    <router-view v-else/>


  </div>
</template>

<script>
import auth from './../utils/auth.js'
export default {
  
}
</script>

<style lang="scss" scoped>
  .how{
		width: 100%;
		padding: 0 5%;
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		position: relative;
	}
	article{
		width: 29%;
		min-width: 320px;
		max-width: 320px;
		height: 60vh;
		border: 2px solid #b2224b;
		background: #273c75;
		position: relative;
		padding: 30px;
		opacity: 0.9;
		margin-right: 2%;
		&:last-child{
			margin-right: 0;
		}
		h2{
			color: #b2224b;
			text-align: center;
			font-size: 40px;
			margin-top: 10px;
			text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
			margin-bottom: 20%
		}
		p{
			color: white;
			font-size: 20px;
			position: absolute;
			padding: 20px;
			top: 42%;
			left: 0;
		}
	}

		@media screen and (max-width: 1310px) {
			.viens{
			.what{
				width: 100%;
				font-size: 25px
			}
		}
		.how{
			height: auto;
			padding-top: 3%;
			article{
				height: auto;
				margin-bottom: 5%;
				h2{
					font-size: 50px
				}
				p{
					font-size: 30px;
					position: relative;
				}
			}
		}
		}

		@media screen and (max-width: 725px) {
			.account{
				height: auto;
			}
		}
</style>

