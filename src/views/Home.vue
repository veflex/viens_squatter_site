<template>
	<div class="home">
		<section class="background"></section>
		<section class="viens">
			<h2>Tu t'ennuies ?</h2>
			<p class="what">Viens Squatter est l'une des plus grandes plateformes d'organisation d'évènements particuliers. Découvrez les annonces d'évènements (appelés Squats) de particuliers désirant faire de nouvelles rencontres autours d'un thème commun.</p>
			<div>
				<a href="#how" class="arrow"><i class="fas fa-arrow-down"></i></a>
			</div>
		</section>
		<section class="how" id="how">
			<article class="squatter">
				<h2>Squatter</h2>
				<p>Consultez tous les squats disponible avec la description et le thème de l'évènement.</p>
			</article>
			<article class="recevoir">
				<h2>Recevoir des squatteurs</h2>
				<p>Ici vous pouvez créer votre propre squat afin de recevoir des squatteurs !</p>
			</article>
			<article class="top">
				<h2>TOP Squatteurs</h2>
				<p>Le TOP Squatteurs recense les 6 meilleurs squatteurs allez les voir !</p>
			</article>
		</section>
	</div>
</template>

<script>
export default {
	mounted(){
		document.querySelector('a[href="#how"]').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
		});
	},
	methods:{
	}
}
</script>

<style lang="scss" scoped>
	@keyframes jump {
		0% {top: 0}
		50% {top: 20%}
		100% {top: 0%}
	}
	.home{
		overflow: hidden;
	}
	.background{
		width: 100%;
		height: 100vh;
		background-image: url('./../assets/img/street.jpg');
		background-size: cover;
		position: fixed;
		top: 0;
	}
	.viens{
		position: relative;
		color: white;
		display: flex;
		min-width: 320px;
		justify-content:center;
		align-items: center;
		flex-direction: column;
		background-color: rgba(0,0,0,0.35);
		width: 100%;
		height: 100vh;		
		z-index: 10;
		h2{
		text-align: center;
		font-size: 30px;
		margin-top: -5%;
		margin-bottom: 2%;
		}
		.what{
			width: 45%;
			text-align: center;
			margin-bottom: 3%;
		}
		div{
			position: relative;
			width: 50px;
			height: 50px;
		}
	}
	
	.arrow{
		animation: jump infinite 1s;
		font-size: 50px;
		cursor: pointer;
		text-decoration: none;
		color: white;
		position: absolute;
	}
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

	@media screen and (max-width: 768px) {
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

</style>

