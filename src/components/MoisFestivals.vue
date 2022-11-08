<script setup>
    //import des éléments de vue
    import { reactive, onMounted, ref } from 'vue';
    import { getMois } from '@/composables/ServiceAjax.js'
    import { getLabels, countDatas } from '@/composables/utilsApp.js'

    //import d'un type de graphique de type barChart
    import { Bar } from 'vue-chartjs'

    //import des objets graphiques de la bibliotheque chartJs
    import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

    //élement utilisés par le graphique
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale )

    //propriété du graphique utilisée dans le template
    //on definit son type de donnée et sa valeur par défaut
    //On peut utiliser une grande variété de types, voire des objets
    const propChart = defineProps({
        chartId: { type:String, default: 'bar-chart'}, //Id du graphique
        datasetIdKey: { type:String, default: 'label'}, //Id du dataset
        width: { type:Number, default: 100}, //largeur
        height: { type:Number, default: 100}, //hauteur
        cssClasses: { type:String, default: ''}, //Classes css utilisées
        styles: { type:Object, default:()=>{}}, //Id du graphique
        plugins: { type:Object, default: ()=>{}}, //Information personnalisé plugin
    })

    //données injectées dans le graphique
    let chartData = reactive({
        //etiquette de l'axe
        labels:['Janvier','Février', 'Mars', 'Avril', 'Mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre'],
        //valeurs des données du graphique
        datasets:[{
            //Etiquette du jeu de donnée à projeter
            label:'données par mois (en millier)',
            //valeurs des données
            data: [40,20,12,14,24],
            //couleurs des bars en regard des valeurs
             backgroundColor:[
             'rgba(255, 99, 132, 0.2)',
             'rgba(255, 159, 100, 0.2)',
             'rgba(255, 205, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(54, 164, 235, 0.2)',
             ],
             //couleur de chaque bordure de chaque barre
             borderColor:[
             'rgb(255, 99, 132)',
             'rgb(255, 159, 64)',
             'rgb(255, 205, 86)',
             'rgb(75, 192, 192)',
             'rgb(54, 164, 235)',

             ],
             borderWidth: 1,
        }]
    })

    //options du graphique
    //les principales utilisées, ils en existe d'autres
    //voir documentation
    let chartOptions = reactive({
        //Aspect responsive du graphique
        responsive: true,
        //maintien du ratio
        maintainAspectRation: false,

        //Types de projection utilisée
        //x: verticale (par defaut)
        //y: horizontale
        indexAxis: "x",
         
        //Echelle du graphique
        scales:{
            //axe des ordonnées 
            y:{
                //valeur max des y
                suggestedMax: 100,
                ticks:{
                    font:{
                        size:16
                    }
                } 
            },
            //axe des abscisses
            x:{
                ticks:{
                    font:{
                        size:16
                    }
                }
            }
        },

        //Plugins 
        plugins:{
            //légende des données
            legend:{
                labels:{
                    color:'black',
                    font:{
                        size:16  
                    }
                }
            },
            title:{
                //affiche titre
                display: true,
                //libellé du graphique 
                text:"Mois habituel des festivals",
                //couleur du text
                color:"black",
                font:{
                    size:16
                }
                }
            }, 
    })

     //Au montage du composant
     let liste = ref(null)
onMounted(async () => {

    let request = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=panorama-des-festivals&q=&rows=200&facet=mois_habituel_de_debut&refine.region=Bourgogne-Franche-Comt%C3%A9';

    await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // récupération de la réponse
        .then(response => {
            liste = response.records
            // On vérifie dans la consle l'obtention des résultats
            console.log("response", liste);

            // Chargement des labels (axe des ordonnées)
            // Création d'un set pour valeurs uniques
            let setLabels = new Set()
            // Parcours des valeurs , récupération des années
            liste.forEach((el) => {
                setLabels.add(el.fields.mois_habituel_de_debut)
            })
            // Transmission des valeurs du set aux labels 
            chartData.labels = Array.from(setLabels)
            // Tri des labels par ordre croissant
            chartData.labels.sort()


            // Calcul des valeurs par labels
            // Comptage pour les entrées payantes
            let cptp = []
            // Comptage pour les entrées gratuites

            // Parcours des labels
            chartData.labels.forEach((label) => {
                // Parcours des données
                // Compteurs pour un labels
                let nbp = 0

                // Parcours des valeurs
                liste.forEach((el) => {
                    // Si c'est le bon label
                    if (label == el.fields.mois_habituel_de_debut) {
                        nbp++

                    }
                })
                // Mise à jour des tableaux
                cptp.push(nbp)

            })
            // chargement des données
            chartData.datasets[0].data = cptp

            console.log("chartData", chartData.datasets)
        })
        .catch(error => console.log('erreur Ajax', error))
})
</script>

<template>
    <Bar
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
</template>

<style scoped>
    
</style>