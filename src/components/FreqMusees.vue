<script setup>
    import { reactive, onMounted, ref } from 'vue';
    import { getFreq } from '@/composables/ServiceAjax.js'
    import { getLabels, countDatas } from '@/composables/utilsApp.js'

    import { Line } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, LineController, CategoryScale, LinearScale, Filler } from "chart.js"
    ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, LineController, CategoryScale, LinearScale, Filler )

    const propChart = defineProps ({
        chartId:             {type: String,          default:'line-chart'},
        datasetIdKey:        {type: String,          default:'label'         },
        width:               {type: Number,          default:200             },
        height:              {type: Number,          default:100             },
        cssClasses:          {type: String,          default:''              },
        styles:              {type: Object,          default:() => {}        },
        plugins:             {type: Object,          default:() => {}        },

    })

     //données injectées dans le graphique
     let chartData = reactive(
        {
        //etiquette de l'axe
        labels:['2016','2017', '2018', '2019', '2020'],
        //valeurs des données du graphique

        datasets:[
            {
                label:'Fréquentation',
                data: [40,20,12,14,24],
                borderColor: 'rgba(255, 0, 0, 0.5)',
                tension: 0.5,      
                fill:true
            },
        ]
    });


    let chartOptions = reactive({
        //Aspect responsive du graphique
        responsive: true,

        plugins:{
            title:{
                display:true,
                text : 'Fréquentation musées BFC',
                font:{
                    size:16
                }
            }
        }
    });

    let liste = ref()
    onMounted(async() => {

        let request = 
        await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // récupération de la réponse
        .then(response => {
            liste.value = new Array(response);
            // On vérifie dans la consle l'obtention des résultats
            console.log("response", liste.value);
            // Récupération du nombres de valeurs retournées
            chartOptions.plugins.title.text += liste.value[0].nhits+" réponses"
            // Chargement des labels (axe des ordonnées)
            // Création d'un set pour valeurs uniques
            let setLabels = new Set()
            // Parcours des valeurs , récupération des années
            liste.value[0].records.forEach( (el)=>{
                setLabels.add(el.fields.nom)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()

            // Calcul des valeurs par labels
            // Comptage pour les séances
            let cpts = []

            // Parcours des labels
            chartData.labels.forEach( (label)=>{
                // Parcours des données
                // Compteurs pour un labels
                let nbs = 0

                // Parcours des valeurs
                liste.value[0].records.forEach( (el)=>{
                    // Si c'est le bon label
                    if(label == el.fields.nom){
                        // Comptage des valeurs
                        if (el.fields.seances) {
                        nbs    += el.fields.seances
                        }
                    }
                })
                // Mise à jour des tableaux
                cpts.push(nbs)

            })
            // chargement des données
            chartData.datasets[0].data = cpts

            console.log("chartData", chartData.datasets)
        })
        .catch(error => console.log('erreur Ajax', error))
    })



</script>


<template>
    <main>
        <Line
            :chart-options="chartOptions"
             :chart-data="chartData"
             :chart-id="chartId"
             :dataset_id_key="datasetIdKey"
             :plugins="plugins"
             :css-classes="cssClasses"
             :styles="styles"
             :width="width"
             :height="height"
        />
        





    </main>
</template>