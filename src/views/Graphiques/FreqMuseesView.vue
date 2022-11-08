<script setup>
import FreqMusees from '@/components/FreqMusees.vue';
</script>
    
<template>
    <div>
        <h2 class="">Fréquentation par année des musées de Bourgogne-Franche-Comté</h2>
        <p class="pt-4 pb-5">
            Sur cette page vous allez pouvoir rechercher tout les festivals étant dans la Bourgogne-Franche-Comté ! <br>
            Il suffit de sélectioner un département et vous allez par la suite les voirs apparaître sur la carte. <br>

        </p>
        <div class="container w-3/4 ">
            <FreqMusees></FreqMusees>
        </div>
    </div>
</template>