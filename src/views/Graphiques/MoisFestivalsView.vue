<script setup>
import MoisFestivals from '@/components/MoisFestivals.vue';
</script>
    
<template>
    <div>
        <h2 class="">Nombre de festivals en Bourgogne-Franche-Comté par mois</h2>
        <p class="pt-4 pb-5">
            Sur cette page vous allez pouvoir rechercher tout les festivals étant dans la Bourgogne-Franche-Comté ! <br>
            Il suffit de sélectioner un département et vous allez par la suite les voirs apparaître sur la carte. <br>

        </p>
        <div class="pb-8">
            <p>
                Ce graphique à été choisit pour la simplicité à le lire. <br>
                Il nous montre correctement et simplement le nombre de festivals par mois en BFC.
            </p>
            <p>
                
            </p>
        </div>
        <div class="container w-3/4 ">
            <MoisFestivals></MoisFestivals>
        </div>
    </div>
</template>