export const linearData = (fields, items) => {
    fields.forEach( (field) =>{
        let t = field.key.split (".")
        let lg = t.length
    
        items.forEach( (item) => {
          // Niveau 1
          if(lg==1) {
            if(Array.isArray(item[field.key])){ // si tableau
            let value = ''
            item[field.key].forEach( (val) => { value += " "+val  })
            item[field.key] = value
            }else{
              // Sinon rien valeur prise par défaut
            }
          }
          if(lg==2) {
            if(Array.isArray(item[t[0]])){ // si tableau
            let value = ''
            item[t[0]].forEach( (val) => { value += " "+val[ t[1] ]  })
            item[field.key] = value
            }else{ item[field.key] = item [ t[0] ] [ t[1] ] }
          }
          // Niveau 3
          if(lg==3) {
            if(Array.isArray(item[t[0]] [t[1]] ) ){ // si tableau
            let value = ''
            item[t[0]] [t[1] ].forEach( (val) => { value += " "+val[ t[2] ]  })
            item[field.key] = value
            }else{ item[field.key] = item [ t[0] ] [ t[1] ] [t[2]] }
          }
          // etc
        })
      })
      return items
}
// tri sélectionné
export const sortCol = (items, field) =>{
  const compareString = (a, b) => {
    return a[field.key].toLowerCase() > b[field.key].toLowerCase() ? 1 * field.sort : -1 * field.sort
  }
  // Fonctions de comparaison numérique
  const compareNumber = (a, b) => {
    // type number demandé, on fait une conversion en réel, si chiffre à virgule
    return parseFloat(a[field.key]) > parseFloat(b[field.key]) ? 1 * field.sort : -1 * field.sort
  }

  // Suivant le type de tri
  if(field.type == 'number') { items= items.sort(compareNumber) }
  else{ items = items.sort(compareString) }

  // position du tri à l'inverse de ce qu'il est
  // pour le prochain click
  field.sort = field.sort * -1
}

// Filtrage général
export const filterColumn = (field, itemsSvg) => {
  return itemsSvg.filter( (element) => {
    return element[field.key].toLowerCase().includes(field.filter.toLowerCase())
  })
}
