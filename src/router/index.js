import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//import de la view Graphiques
import MoisFestivalsView from '../views/Graphiques/MoisFestivalsView.vue'
import ThemeFestView from '../views/Graphiques/ThemeFestView.vue'
import FreqMuseesView from '../views/Graphiques/FreqMuseesView.vue'
import NbrDepView from '../views/Graphiques/NbrDepView.vue'

//import de la view CartesOSM
import MapFestivalsView from '../views/CartesOSM/MapFestivalsView.vue'
import MapMuseesView from '../views/CartesOSM/MapMuseesView.vue'

//import de la view Filtres
import FiltreView from '../views/Filtres/FiltreView.vue'
import FiltreGraphView from '../views/Filtres/FiltreGraphView.vue'

//import de la view Explications graphs
import ExplicationsView from '../views/ExplicationsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'home', component: HomeView
    },
    { path: '/MoisFestivals', name: 'MoisFestivalsView', component: MoisFestivalsView },
    { path: '/ThemeFest', name: 'ThemeFestView', component: ThemeFestView },
    { path: '/FreqMusees', name: 'FreqMuseesView', component: FreqMuseesView },
    { path: '/NbrDep', name: 'NbrDepView', component: NbrDepView },

    { path: '/MapFestivals', name: 'MapFestivalsView', component: MapFestivalsView },
    { path: '/MapMusees', name: 'MapMuseesView', component: MapMuseesView },

    { path: '/Filtre', name: 'FiltreView', component: FiltreView },
    { path: '/FiltreGraph', name: 'FiltreGraphView', component: FiltreGraphView },

    { path: '/Explications', name: 'ExplicationsView', component: ExplicationsView },

  ]
})

export default router
