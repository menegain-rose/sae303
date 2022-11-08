<script setup>
  // import éléments de vue
  import { onMounted, ref, reactive, onUpdated } from 'vue'
  // import leaflet
  import * as Leaflet from 'leaflet'
  // css leaflet
  import 'leaflet/dist/leaflet.css'

  // Canevas leaflet pour la carte
  let tileLayer = Leaflet.tileLayer
  // Initialisation de la carte sous forme de ref
  let map = ref()

  //Liste des départements
  let listeReg = ref()
  // Département sélectionné
  let RegSelect = ref()

  //Liste des établissements pour une région
  let listeMusee = ref()

  // Lorsque le depposant est monté dans la vue
  // On affiche la carte
  onMounted( async () => {
    // Caractéristiques visuelle de la carte
    tileLayer = Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    );

    // Création de la carte sur la div ayant : id='map'
    map = Leaflet.map('map',
    {
        zoomControl: true,    // Contrôle du Zoom
        layers: [tileLayer],  // Canevas pour dessiner la carte
        maxZoom: 18,          // Zoom maxi autorié
        minZoom: 6            // Zomm mini autorisé
    })
    // projection de la carte avec centrage aux coordonnées indiquées, avec facteur d'agrandepsemet 
    .setView([48.8588897, 2.320041], 10) 

    //Recherche des départements - geo api gouv
    await fetch('https://geo.api.gouv.fr/regions/27/departements')
    //Réponse demandée en JSON
    .then(response => response.json())
    // Récupération de la réponse
    .then(response => {
      listeReg.value = response;
      // On vérifie dans la console l'obtention des résultats
      console.log("response", listeReg);
      // Valeur 0 par défaut : Sélectionner un département
      RegSelect.value="0"
    })
    .catch(error => console.log('erreur Ajax'))
  })

  //Fonction de sélection du département
  const selection = async (dep) =>{
      console.log("depion selectionné", dep)
  
  // Requête MUSEE
  let request = 'https://data.culture.gouv.fr/api/records/1.0/search/'
      +'?dataset=liste-et-localisation-des-musees-de-france'
      +'&q='
      +dep
      +'&facet=departement'
      +'&refine.region_administrative=Bourgogne-Franche-Comt%C3%A9';

  console.log("request", request)
  // Recherche des départements - api gouv
  await fetch(request)
  // Réponse demandée en JSON
  .then(response => response.json())
  // récupération de la réponse
  .then(response => {
      // Récuperation de la liste des gares
      listeMusee.value = response.records;
      // On vérifie dans la console l'obtention des résultats
      console.log("Liste des musees", listeMusee);
      // Instanciation des markers
      // Calque featureGroup - groupe de calques (markers)
      let markers = Leaflet.featureGroup();
      // Création d'un icone, le même pour tous
      let myIcon = Leaflet.icon({ iconUrl: 'src/assets/images/marker-icon.png',
  iconSize:     [24, 24], // size of the icon
      iconAnchor: [0,0], shadowAnchor: [-10, -10], popupAnchor: [0, 0]  });
      //Paecours des gares
      listeMusee.value.forEach( (etab) =>{
          // Récupération des coordonnées de la gare
          let position = etab.geometry.coordinates;
          // Nom de la depion
          let libelle = etab.fields.nom_officiel_du_musee;
          let adresse = etab.fields.adresse;
          // Ajout d'un marqueur
          // Attention lattitude/longitude inversées dans les données
          let marker = Leaflet.marker([ position[1], position[0]], {icon: myIcon});
          // Ajout d'une infobulle
          marker.bindPopup(libelle, adresse);

          // Ajout au tableau de markers
          markers.addLayer(marker);
      })
      // Ajout des markers à la carte
      map.addLayer(markers);
      // Positionnement sur l'ensemble des markers
      // la fonction fitBounds permet de repositionner la carte
      // sur le centre d'un ensemble latitude/longitude
      // la fonction getBounds permet de donner les deux points extrême
      // (rectangle) de l'ensemble des marqueurs
      map.fitBounds(markers.getBounds());
  })
  .catch(error => console.log('erreur Ajax'))
  }
</script>

<template>
<div>
  <div class="container">
      <select class="custom-select" v-model="RegSelect" @change="selection(RegSelect)">
      <option depabled value="0">Sélectionner un département </option>
      <option v-for="dep in listeReg" :key="dep.code" :value="dep.nom">
      {{dep.code}} - {{dep.nom}}
      </option>
  </select>
  <hr/>
      <div id="map">

    </div>
  </div>
</div>
</template>

<style scoped>
#map {
  width:100%;
  height:70vh;
}
</style>