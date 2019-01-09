<template>
    <div id="map" class="map" >
        
    </div>
</template>

<script>
import L from 'leaflet'
export default {
    data() {
        return {
            map: null,
            tileLayer: null,
            layers: [],
            userLat : null,
            userLong : null,
        }
},
mounted(){
    // this.initMap();
    // this.locateUser();
    // this.map.on('locationfound', this.onLocationFound);   
    this.geoloc(); 
},
methods: {
//      locateUser() {
//         this.map.locate({setView: true});
//     },
//     initMap() {
//         const userLat = position
//         this.map = L.map('map').setView([48.866667, 2.333333], 12);
//         this.tileLayer = L.tileLayer(  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
//         {
//             maxZoom: 17,
//             minZoom: 1,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//         }
//         );
//         this.tileLayer.addTo(this.map);
//     }, 
//     onLocationFound(e) {
//         console.log(e.latlng);
//         var radius = e.accuracy / 2;

//         L.marker(e.latlng).addTo(this.map)
//             .bindPopup("Ca c'est toi !").openPopup();

//         L.circle(e.latlng, radius).addTo(this.map);
// }
    geoloc() {
            const that = this
            var geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
                var startPos = position;
                console.log(position);
                that.userLat = startPos.coords.latitude;
                that.userLong = startPos.coords.longitude;
                console.log("lat: "+that.userLat+" - lon: "+that.userLong);
                // Fonction d'initialisation de la carte
                that.initMap();
            };
            var geoFail = function(){ // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
                console.log("refus");
            };
            navigator.geolocation.getCurrentPosition(geoSuccess,geoFail);
        },
        initMap() {
                    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                    this.map = L.map('map').setView([this.userLat, this.userLong], 15);
                    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
                    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
                        // Il est toujours bien de laisser le lien vers la source des données
                        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                        minZoom: 1,
                        maxZoom: 17
                    }).addTo(this.map);
                    // Nous ajoutons un marqueur
                    var marker = L.marker([this.userLat, this.userLong]).addTo(this.map);
                }
},
created(){
    

}
}
</script>

<style lang="scss" scoped>
    .map{
        width: 100%;
        height: 250px;
    }
</style>

