//fonction de calcul sur une base de couleur avec densité
export const densite = (base, datas) => {
    //calcul des valeurs extrèmes des données
    //valeurs mini et maxi
    let valMax = 0
    let valMin = 9999
    //parcours des données
    datas.forEach((val) => {
        if (val < valMin) {
            valMin = val
        }
        if (val > valMax) {
            valMax = val
        }
    })
    //On utilise un densite de 10% à 90% la différence
   // est de 80% soit 0.8 
    //on découpe ce pourcentage en fonction
    //des valeurs extrèmes (mini et maxi)/
    let nbVal = 0.8 / (valMax - valMin)
    //tableau des valeurs à retourner
    let tabVal = []
    let tabBorder = []
    //densité de départ : 10%
    let deg = 0.1
    //parcours des données 
    datas.forEach((val) => {
        //calculde la transparence pour cette valeur 
        //echelle de découpage x valeur actuelle + 10% (départ)
        let transp
        if(valMin < valMax) {transp = nbVal*val*0.8+deg }
        else{transp = val*0.7 }
        //mise à jour de la transparence
        let color = base.replace("#deg#", transp)
        let border = base.replace("#deg#", 1)
        //ajout dans le tableau des couleurs 
        tabVal.push(color)
        tabBorder.push(border)
    })
    return [tabVal, tabBorder]
}

//fonction de calcul aléatoire des couleurs types rgba
//non exportable , car utilisee par une fonction interne

const couleur = (max) => {
    return Math.round(Math.random() * max, 0);
}

export const aleatoire = (labels) => {
    let bgColor = []
    let bdColor = []

    labels.forEach((val) => {
        //on calcul la couleur du secteur 
        let c1 = couleur(255);
        let c2 = couleur(255);
        let c3 = couleur(255);
        let tr = 0.5;
        //couleur avec transparence
        let color = 'rgba(' + [c1, c2, c3, tr].join(',') + ')'
        bgColor.push(color)
        //bordure sans transparence
        let border = "rgba(" + [c1, c2, c3].join(",") + ")";
        bdColor.push(border)
    });
    return [bgColor, bdColor]

}