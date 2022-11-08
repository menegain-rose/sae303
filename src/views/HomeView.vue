<script setup>
import bouton from "@/components/bouton.vue"
</script>

<template>
    <div class="mb-20 text-MainGreen">
        <div>
            <h2 class="flex justify-center">
                 Bienvenue !
            </h2>
            <h3 class="flex justify-center">
                Cette application est dédié à une SAE d'étudiant MMI en 2ème année
            </h3>

        </div>


    
    

    </div>



    <div class="grid grid-cols-2 gap-14 mb-14">
        <img src="public/images/Festivals.jpg" alt="">
        <div>
            <h3 class="pb-3">
                Nos festivals
            </h3>
            <p>
                Sur ce site vous allez pouvoir découvrir les festivals et musées <br>
                de votre région préféré → la Bourgogne-Franche-Comté. <br>
            </p>
            <div class="text-center">
                <bouton>Découvrir</bouton>
            </div>
        </div>
    
        
    </div>

    <div class="grid grid-cols-2 gap-14">
        <div>
            <h3 class="pb-3">
                Nos musées
            </h3>
            <p>
                Nous vous offrons également la possibilité de découvrir quelques statistiques très intéréssantes tel que <br>
                - Un graphiques sur les thématiques les plus ou moins retrouver dans notre région <br>
                - Le flux de festivals par mois <br>
                - 
            </p>
            <div class="text-center">
                <bouton>Découvrir</bouton>
            </div>
        </div>
        <img src="public/images/Musees.jpg" alt="">
        
    </div>

    

</template>
