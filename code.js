function tsp_hk(distances) {
  let n = distances.length;
  let cache = new Map();
  if (n <= 1) {
    return 0;
  }
    
  function helper(cities, start) {
    if (cities.size === 1) {
      let remainingCity = Array.from(cities)[0];
      return distances[start][remainingCity];
    }
    let minTourLength = Infinity;
    let key = `${Array.from(cities).join('-')}-${start}`;
    if (cache.has(key)) {
      return cache.get(key);
    } 
    if (cities.size === 1) {
      let remainingCity = Array.from(cities)[0];
      return distances[start][remainingCity];
    }
    for (let city of cities) {
      if (city !== start) {
        let newCities = new Set(cities);
        newCities.delete(city);
        let tourLength = helper(newCities, city) + distances[start][city];
        minTourLength = Math.min(minTourLength, tourLength);
      }
    }

    cache.set(key, minTourLength);
    return minTourLength;
  }
  let minTourLength = Infinity;
  for (let start = 0; start < n; start++) {
    let cities = new Set([...Array(n).keys()].filter((c) => c !== start));
    let tourLength = helper(cities, start);
    
    minTourLength = Math.min(minTourLength, tourLength);
  }

  cache.clear();
  return minTourLength;
}
