// Fonction exportable pour être réutilisée
// Permet d'obtenir une liste de labels demandés sur un flux json
// lstData : le flux concerné
// label : la rubrique demandée
// Structure du label : 
//       * nom complet de la rubrique notation objet
//       * séprateur : #
//       * nombre d'occurences : 
//              * 1 :unique
//              * multi : occurences multiples
export const getLabels = (lstData, label) => {
    // nb d'occurences des valeur du label
    let tl = label.split("#")
    let occurence = tl[1]
    // label concerné
    let lbl = tl[0]
    // niveau des informations du label
    let val = lbl.split(".")
    // Par exemple pour laSpecialite.nom
    // On a : 
    //      * val[0] : laSpecialite
    //      * val[1] : nom
    //      * val.length : 2
    // Tableau de renvoi des résultats 
    let retour = []
    // Set pour élimination des doublons
    let set = new Set()
    // Parcours des data
    // Si occurence multi, on tuilise un tableau
    // Pour stocker toutes les valeurs multiples
    let tabObj = []
    // Modification ce n'est plus une value de ref
//    lstData.value.forEach( (element)=>{
    lstData.forEach( (element)=>{
        // Suivant le niveau de profondeur du label           
        switch (val.length) {
            // niveau arbo : 1
            // Par exemple : adresse#1
            // Il n'y a pas de point on récupère directement 
            // la valeur dans val (let val = lbl.split("."))
            case 1 :              
            // type d'occurence
            // unique (1) : on ajoute directement la valeur au set
            // Par exemple pour l'adresse
            // elt["adresse"] : pour la valeur de l'adresse
            // dans notre cas "adresse" est dans val[0]
            // On utilise donc : elt [ val[0] ]
            if(occurence == 1){ set.add(element[ val[0] ] ) }
            // multiple (multi) : on parcours toutes les valeurs mise dans le tableau
            if(occurence == 'multi'){
                element.forEach( (elt)=>{
                    tabObj.push(elt[ val[0] ])
                })
            }
            break
            // niveau arbo : 2
            // Par exemple : laSpecialite.nom#1
            // On obtient en faisant let val = lbl.split(".")
            // val[0] : "laSpecialite"
            // val[1] : "nom"
            case 2 :            
            // type d'occurence
            // unique (1) : on ajoute directement la valeur au set
            // Par exemple pour l'adresse
            // elt["laSpecialite"]["nom"] : pour la valeur de la specialite
            // dans notre cas "laSpecialite" est dans val[0] et nom dans val[1]
            // On utilise donc : elt [ val[0] ] [ val[1] ]
            if(occurence == 1){ set.add(element[ val[0] ] [ val[1] ]) }
            if(occurence == 'multi'){
                element[ val[0] ].forEach( (elt)=>{
                    tabObj.push(elt[ val[1] ])
                })
            }
            break
            case 3 :            
            if(occurence == 1){ set.add(element[ val[0] ] [ val[1] ] [ val[2] ]) }
            if(occurence == 'multi'){
                element[ val[0] ][ val[1] ].forEach( (elt)=>{
                    tabObj.push(elt[ val[2] ])
                })
            }
            break
            case 4 :            
            obj = element[ val[0] ] [ val[1] ] [ val[2] ] [ val[2] ]

            if(occurence == 1){ set.add(element[ val[0] ] [ val[1] ] [ val[2] ] [ val[3] ]) }
            if(occurence == 'multi'){
                element[ val[0] ][ val[1] ][ val[2] ].forEach( (elt)=>{
                    tabObj.push(elt[ val[3] ])
                })
            }
            break
            // etc ......
        } // fin switch
    }) // fin boucle lstData

    // Si multi on passe par le set pour éliminer les doublons
    if(occurence == 'multi'){
        set = new Set(tabObj)   
    }
    // Transfert du set dans le tableau de retour des résultats
    retour = Array.from(set)
    // Tri pour avoir un ordre croissant les labels
    retour.sort()
    // Transmission des labels
    return retour
}

// fonction exportable
// 1° paramètre : les données
// 2° paramètre : les labels
// 3° paramètre : le libelle du label sur laquel l'opération est effectuée # occurence dans les données
export const countDatas = (lst, lstLabel, libLabel) => {
    // occurence et valeur du label
    let tl      = libLabel.split("#")
    let lbl     = tl[0]
    let occurence = tl[1]
    // valeur du label
    let val = lbl.split(".")
    console.log("val", val)
    // Tableau de comptage à retourner
    let retour = []
    // Boucle sur les labels
    // Modification ce n'est plus une value de ref
    let nb = 0
//    lstLabel.value.forEach( (label)=>{
    console.log("lstlabel", lstLabel)
        lstLabel.forEach( (label)=>{
            console.log("..")
            console.log("lst", lst)
            console.log("lst.value", lst.value)
            // variable pour comptage pour un label
        // Boucle sur les données
        // Modification ce n'est plus une value de ref
//        lst.value.forEach( (element)=>{
          lst.forEach( (element)=>{
            console.log(".")
            switch (val.length) {
                case 1 :
                    // type d'occurence
                    if(occurence == 1){
                        if(element[ val[0] ] == label){ nb++ }
                    }
                    if(occurence == 'multi'){
                        element[ val[0] ].forEach( (elt)=>{ nb++ })
                    }                 
                    break
                case 2 :            
                    // type d'occurence
                    if(occurence == 1){
                        if(element[ val[0] ] [ val[1] ] == label){ nb++
                        console.log("nb", nb) }
                    }
                    if(occurence == 'multi'){
                        element[ val[0] ].forEach( (elt)=>{                            
                            if(elt[ val[1] ] == label){ nb++ }
                        })
                    }
                    break
                    case 3 :            
                    // type d'occurence
                    if(occurence == 1){
                        if(element[ val[0] ] [ val[1] ] [ val[2] ] == label){ nb++}
                    }
                    if(occurence == 'multi'){
                        element[ val[0] ] [ val[1] ].forEach( (elt)=>{                            
                            if(elt[ val[2] ] == label){ nb++ }
                        })
                    }
                    break
                    // etc ...
            } // Fin switch        
        }) // fin boucle données
        retour.push(nb)
        console.log("retour", retour)
    }) // fin boucle labels
    return retour
}

