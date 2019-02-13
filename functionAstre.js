const creerAstreGeo = function (rayon, wSegments = 7, hSegments = 7){
    return new THREE.SphereGeometry(rayon, wSegments, hSegments);
};

const creerAstreMat = function(colorAstre,  mapAstreURL, specularAstre = 0xEABA6E, shinynessAstre = 40){


    const objetMat = {
        color: colorAstre,
        specular: specularAstre,
        shinyness: shinynessAstre,
    }

    if (mapAstreURL){
        var texture = new THREE.TextureLoader().load(mapAstreURL);
        objetMat.map = texture;
    }

    return new THREE.MeshPhongMaterial(objetMat);
}

const creerAstre = function(astre){
    const geometrie = creerAstreGeo(astre.rayon, astre.wSegments, astre.hSegments);
    const materiau = creerAstreMat(astre.colorAstre, astre.mapAstreURL, astre.specularAstre, astre.shinynessAstre);

    const astreCree =  new THREE.Mesh(geometrie, materiau);
    astreCree.position.set(astre.x, astre.y, astre.y)
    return astreCree
}
