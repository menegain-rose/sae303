<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>


<template>
  <header class="bg-MainGreen text-white px-10 py-1 flex items-center">
    <div class="">
      <RouterLink class="dropdown-item text-lg bg-transparent text-white" to="/">
        <h1 class="text-lg">
          SAE-303
        </h1>
      </RouterLink>
    </div>

    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark justify-between">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">              
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/Explications">Explications</RouterLink>
                </li>

                <li class="nav-item dropdown mr-0">
                  <a class="nav-link dropdown-toggle" href="#" id="dropdown01" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Cartes OSM
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <RouterLink class="dropdown-item" to="/MapFestivals">Map Festivals</RouterLink>
                    <RouterLink class="dropdown-item" to="/MapMusees">Map Musées</RouterLink>
                  </div>
                </li>

                <li class="nav-item dropdown mr-0">
                  <a class="nav-link dropdown-toggle" href="#" id="dropdown01" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filtres
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdown01">
                      <RouterLink class="dropdown-item" to="/FiltreGraph">FiltreGraph</RouterLink>
                      <RouterLink class="dropdown-item" to="/Filtre">Filtre</RouterLink>
                  </div>
                </li>
                    
                <li class="nav-item dropdown mr-0">                            
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown01" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Graphiques
                    </a>
                      <div class="dropdown-menu" aria-labelledby="dropdown01">
                        <RouterLink class="dropdown-item" to="MoisFestivals">Mois Festivals</RouterLink>
                        <RouterLink class="dropdown-item" to="ThemeFest">Thêmes Festivals</RouterLink>
                        <RouterLink class="dropdown-item" to="FreqMusees">Fréquentation Musées</RouterLink>
                        <RouterLink class="dropdown-item" to="NbrDep">Nombre musées par département</RouterLink>
                    </div>
                </li>
            </ul >
        </div>
      </nav>
    </div>

  </header>

  <main class="p-10">
      <RouterView />
  </main>
</template>
