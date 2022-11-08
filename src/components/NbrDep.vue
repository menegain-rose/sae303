<!-- <script setup>
    import { reactive, ref, onMounted, toRef } from 'vue';
    import { getNbr } from '@/composables/serviceAjax.js'
    import { getLabels, countDatas } from '@/composables/utilsApp.js'
    import { aleatoire, densite } from '@/composables/commonChart.js'
    import { PolarArea } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

    let propChart = defineProps ({
        chartID: { type: String, default: 'polar-chart'},
        datasetIdKey: { type: String, default: 'label'},
        width: { type: Number, default: 500},
        height: { type: Number, default: 500},
        cssClasses: { type: String, default: ""},
        styles: { type: Object, default: () => {}},
        plugins: { type: Object, default: () => {}},
    })

   let chartData = reactive({
        labels:[],
        datasets:[{}]
   });
  
   const chartOptions = reactive({
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
    title: {
      text:null,
      display:true
    }
   }
   });

   let listeMusees = ref()

   let modeSelected = ref()
   modeSelected.value = false

   let baseColor = ref()

   const selectMode = () =>{
    let bgColor = null
    let bdColor = null
   
    if(modeSelected.value){
      [bgColor, bdColor] = aleatoire(chartData.labels)
    }else{
      [bgColor, bdColor] = densite(baseColor.value,chartData.datasets[0].data)
    }
   // Mise a jour des couleurs du graphe
   chartData.datasets[0].backgroundColor   = bgColor
   chartData.datasets[0].borderColor       = bdColor
   chartData.datasets[0].borderWidth       = 1
  }
   // Fonctions d'appel des données
   // et mise en forme du graphique
   const selectMusees = async() => {
    // Appel de la liste des villageois
    await getBac()
    .then( response => {
      listeMusees.value = response.records

      chartOptions.plugins.title.text = "Répartition des étudiants"
      chartData.labels = getLabels(listeMusees.value, 'fields.etablissement_academie#1')
      //comptage
      chartData.datasets[0].data = countDatas(listeMusees.value, chartData.labels, 'fields.etablissement_academie#1')
      // Coloration de base pour coloration dégradée (bleu)
      baseColor.value = 'rgba(0,0,55,#deg#)'
      // Détermine le mode demandée
      selectMode()
    })
   }
  onMounted( async () =>{
    await selectMusees()
   })
  
</script>
  
<template>
  <main class="container">
    <nav class="navbar navbar-expand navbar-dark bg:dark">
    <a class="navbar-brand" href="#">Selection :</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="selectMusees">Musees</a>
      </li>
    </ul>
    <form class="navbar-nav ml-auto">
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input"
        id="customSwitch1" v-model="modeSelected" @change="selectMode">
        <label class="custom-control-label" for="customSwitch1">
          dégradé/aléatoire
        </label>
      </div>
    </form>
    </nav>  
    <PolarArea class="fondBlanc"
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartID"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
          />
  </main>
</template>
  
  <style scoped>
  .titre{
    text-align: center;
  }
  .fondBlanc{
    background-color: white;
  }
  .custom-control-label{
    color: #8a9da0;
  }
</style> -->