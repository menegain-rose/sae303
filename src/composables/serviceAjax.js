// Service d'appels Ajax via fetch
// les fonctions sont exportables
// afin de permettre leur utilisation par un programme externe
// (reutilisable par import)


export const getMois = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/'
        + '?dataset=panorama-des-festivals'
        + '&q='
        + '&facet=mois_habituel_de_debut'
        + '&refine.region=Bourgogne-Franche-Comt%C3%A9'

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getTheme = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/'
        + '?dataset=panorama-des-festivals'
        + '&q='
        + '&facet=mois_habituel_de_debut'
        + '&refine.region=Bourgogne-Franche-Comt%C3%A9'

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getFreq = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/'
        + '?dataset=frequentation-des-musees-de-france'
        + '&q='
        + '&facet=annee'
        + '&refine.regions=BOURGOGNE-FRANCHE-COMTE'

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getNbr = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/'
        + '?dataset=liste-et-localisation-des-musees-de-france'
        + '&q='
        + '&facet=departement'
        + '&refine.region_administrative=Bourgogne-Franche-Comt%C3%A9'

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}

export const getFest = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/'
        + '?dataset=liste-et-localisation-des-musees-de-france'
        + '&q='
        + '&facet=departement'
        + '&refine.region_administrative=Bourgogne-Franche-Comt%C3%A9'

    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error })
}


