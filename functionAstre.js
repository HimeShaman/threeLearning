
// ASTRE creation //
const creerAstreGeo = function (rayon, wSegments = 7, hSegments = 7){
    return new THREE.SphereGeometry(rayon, wSegments, hSegments);
};

const creerAstreMat = function(colorAstre,  mapAstreURL, specularAstre = 0xEABA6E, shininessAstre = 40){


    const objetMat = {
        color: colorAstre,
        specular: specularAstre,
        shininess: shininessAstre,
    }

    if (mapAstreURL){
        var texture = new THREE.TextureLoader().load(mapAstreURL);
        objetMat.map = texture;
    }

    return new THREE.MeshPhongMaterial(objetMat);
}

const creerAstre = function(astre){
    const geometrie = creerAstreGeo(astre.rayon, astre.wSegments, astre.hSegments);
    const materiau = creerAstreMat(astre.colorAstre, astre.mapAstreURL, astre.specularAstre, astre.shininessAstre);

    const astreCree =  new THREE.Mesh(geometrie, materiau);
    astreCree.position.set(astre.x, astre.y, astre.z)
    return astreCree
}

// ORBITE creation //
const creerOrbiteGeo = function(rayon, tube = 0.1, rSegments = 16, tSegments = 100){
    return new THREE.TorusGeometry(rayon, tube, rSegments, tSegments,)
};

const creerOrbiteMat = function(color = 0xffffff, transparent = true, opacity = 0.2){
    return new THREE.MeshBasicMaterial(color, transparent, opacity)
}

const calculDistance = function(objet1, objet2){
    return Math.abs(objet1.position.z - objet2.position.z)
};

const creerTraceOrbite = function(centre, astre, optionsOrbite){
    const geometrie = creerOrbiteGeo(calculDistance(centre,astre), optionsOrbite.rSegments, optionsOrbite.tSegments);
    const material = creerOrbiteMat(optionsOrbite.color, optionsOrbite.transparent, optionsOrbite.opacity);

    const orbiteCree = new THREE.Mesh(geometrie, material);
    orbiteCree.position.set(centre.position.x, centre.position.y, centre.position.z);
    orbiteCree.rotation.x = Math.PI/2;
    return orbiteCree
};

