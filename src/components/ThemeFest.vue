<script setup>
    // Import des éléments utiles de vue
    import { reactive, ref, onMounted } from 'vue';
    import { getTheme } from '@/composables/serviceAjax.js'
    import { getLabels, countDatas } from '@/composables/utilsApp.js'

    // Import d'un graphique type doughnut
    import { Doughnut } from 'vue-chartjs'

    // Import des objets du graphique de la bibliothèque ChartJs
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

    // Eléments utilisés potentiellement pour notre graphique
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


    // Propriétés du graphique Utilisés dans le template (props)
    // On définit pour chacune son type de données et sa valeur par défaut
    // On peut utiliser une grande variété de types, voire des objets
    const propChart = defineProps({
        chartId:            { type: String,         default: 'doughnut-chart' }, // Id du graphique
        datasetIdKey:       { type: String,         default: 'label'          }, // id du dataSet
        width:              { type: Number,         default: 500              }, // Largeur du graphe
        height:             { type: Number,         default: 500              }, // Hauteur du graphe
        cssClasses:         { type: String,         default: ''               }, // Classes css utilisées
        styles:             { type: Object,         default: () => {}         }, // Styles utilisés
        plugins:            { type: Object,         default: () => {}         }  // plugins utilisés
    })

    // Données du graphe
    // Pour l'instant juste pour tester le fonctionnement
    const chartData = reactive({
        // Les éléments sont au départ à vide
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['red','orange','yellow', 'green', 'blue', 'purple'],
                borderColor:[],
                borderWidth:1
            }
        ]
    })

    // Options du graphe
    const chartOptions = reactive({
        responsive: true,
        maintainAspectRatio: false
    })

    // Utilisation d'une ref pour requête Ajax
    // null au départ (important)
    let listefestival = ref(null);
    // Liste des spécialités
    let lstTheme = [];
    // tablea nb de villageois par spécialité
    let lstNb = [];
    // Au montage du composant
    onMounted(async() => {
            await fetch('https://data.culture.gouv.fr/api/records/1.0/search/?dataset=festivals-global-festivals-_-pl&q=&rows=500&refine.region_principale_de_deroulement=Bourgogne-Franche-Comt%C3%A9')
            //Réponse demandée en json
            .then(response => response.json ())
            //récup de la réponse
            .then(response => {
                listefestival = response.records;
                //On vérifie dans la console l'obtention des résultats
                console.log ("response listefestival", listefestival);

           
            //Parcours de la listefestival des villageois
            // pour placer les spécialités dans un set
            // Permet d'éliminer les doublons
    
            let setSp = new Set();

            listefestival.forEach ( (the) => {
          setSp.add(the.fields.discipline_dominante)

            })

            console.log ("setSp contenu : ", setSp);
        
            // Récupération des valeurs du set dans un tableau
            chartData.labels=Array.from(setSp);
            //Tri du tableau par ordre alphabétique
            chartData.labels.sort();

            //calcul du nombre de villageois par specialité
            let cpt = [];

            //Parcours des spécialités
            chartData.labels.forEach(function(spe){
                //Initialisation du nombre pour la specialité en cours
                let nb = 0

                //parcours de la listefestival des villageois
                listefestival.forEach ( (the) => {
                    //si c'est la bonne spécialité
                    //on compte +1
                    if (spe == the.fields.discipline_dominante){
                        nb++
                    }
                })
                //on place le nb de villageois de cette spécialité
                //dans le tableau de comptage
                cpt.push(nb);
            })
            //on transfert le tableau de comptage dans les data
            chartData.datasets[0].data = cpt;

            //Calcul des couleurs et bordures
            let bgColor = [];
            let bdColor = [];

            //pour chaque valeur existante
            cpt.forEach (function(val){
                //on calcul la couleur du secteur
                let c1 = couleur (0,255)
                let c2 = couleur (0,255)
                let c3 = couleur (0,255)
                let tr = 0.5

                //couleur avec transparence
                let color = 'rgba(' + [c1,c2,c3,tr].join(',')+")"
                bgColor.push(color)

                //Bordure sans transparence

                let border = 'rgba(' + [c1,c2,c3].join(',')+")"
                bdColor.push(color)
            })

            //chargement des couleurs et des bordures
            chartData.datasets[0].backgroundColor = bgColor;
            chartData.datasets[0].borderColor= bdColor;

            })
        .catch(error => console.log ('erreur Ajax'))

        })

        //Fonction de calcul aléatoire des couleurs
        const couleur = (min, max) => {
            return Math.floor(Math.random() * (max - min));
        }
</script>

<template>
    <div class="container">
        <!-- 
            chart-options : Options du graphique
            chart-data : données du graphique
            chart-id : Identifiant du graphique
            dataset-id-key : Identifiant des données
            plugins : plugins utilisés
            css-classes : Classes css utilisées
            styles : styles css utilisés
            width : largeur du graphique
            height : hauteur du graphique
        -->
        <Doughnut  
            :chart-options="chartOptions" 
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
    </div>

</template>