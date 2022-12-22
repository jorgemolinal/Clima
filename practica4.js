const { readFile }   =require("fs/promises");

exports.load = async (citiesFilename) => {
	
    return JSON.parse(await readFile(citiesFilename,"utf8" )); 

    //OTRA FORMA DE HACERLO
    //const str = await readFile(citiesFilename,"utf8" );
	//return JSON.parse(str); 
}

exports.maxTemp= (cities) => Math.max(...cities.map(city=> city.main.temp));
	//Los ... hacen que el array cities se escriba entero, todos los elementos 1 a 1 (es como
    //si hicieras cities[0] cities[1] cities[2] etc
    
    //City: cada elemento del json tiene unas caracteristicas: temp, temp_min, coordenadas, etc. Pues ha cada elemento 
    //con sus caracteristicas les doy el nombre de city
	

exports.minTemp= (cities) => Math.min(...cities.map(city=> city.main.temp));

exports.maxTempMin= (cities) => Math.max(...cities.map(city=> city.main.temp_min));

exports.minTempMax= (cities) => Math.min(...cities.map(city=> city.main.temp_max));


exports.averageTemp= (cities) => {
    let sumTemperature =0;
    let nOfCities=0; //Cuantas ciudades tenemos (para poder hacer la media)  =  cities.length
	for (let city of cities){
		sumTemperature = city.main.temp + sumTemperature; //vas sumando el total de las temperaturas
        nOfCities = nOfCities +1;
	}
	return sumTemperature/nOfCities;
}

exports.warmerAverageTemp= (cities) => {

	const mediumTemperature = exports.averageTemp(cities);
    //Calculada funcion anterior

	return cities.filter( city=> city.main.temp > mediumTemperature).map(city => city.name);

    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    //FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	
}

exports.maxNorth= (cities) => {

    return cities.find(city=> Math.max(...cities.map(city => city.coord.lat)) === city.coord.lat).name;
    //Cuando el maximo de todas, coincida con 1 de ellas, entonces devuelves esa que coincide
    //la latitud del JSON es lo que marca la altura

    //SI LO HACES EN 2 PARTES QUEDA ASÍ, PERO OCUPAS 1 ESPACIO MÁS DE MEMORIA AL AÑADIR OTRA NUEVA VARIABLE
	//const masArriba= Math.max(...cities.map(city => city.coord.lat));
	//return cities.find(c=> masArriba === c.coord.lat).name;
}

exports.maxSouth= (cities) => {
	return cities.find(city=> Math.min(...cities.map(city => city.coord.lat)) === city.coord.lat).name;

    //const masAbajo= Math.min(...cities.map(city => city.coord.lat));
	//return cities.find(city=> masAbajo === city.coord.lat).name;
}

exports.gravityCenter= (cities) => {
	let longitud=0;
    let latitud=0;
	for (let city of cities){
		longitud = longitud + city.coord.lon;
        latitud = latitud + city.coord.lat;
	} //lat y lon es como se llama en el JSON
	lon = longitud/cities.length;
	lat  = latitud/cities.length;

	return {lon: lon, lat:lat}; //1 solo objeto con 2 propiedades llamadas lat y lon

}


exports.closestGC= (cities) => {
	let longitud=0;
    let latitud=0;
	for (let city of cities){
		longitud = longitud + city.coord.lon;
        latitud = latitud + city.coord.lat;
	} //lat y lon es como se llama en el JSON
	lon = longitud/cities.length;
	lat  = latitud/cities.length;

	let d = Infinity;
	let cityGP;
	for (let city of cities){
		dist=Math.sqrt(Math.pow((city.coord.lat-lat),2)+Math.pow((city.coord.lon-lon),2));
		if(d>dist){ //Empiexza en infinito y va bajando con cada una mas pequeña que pille
			d=dist;
			cityGP= city;
		}
	}
	return cityGP.name;

}