function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    let memo = {};

    function getKey(cities, start) {
        return Array.from(cities).join(',') + '-' + start;
    }

    function helper(cities, start) {
        if (cities.size === 2) {
            for (let city of cities) {
                if (city !== start) {
                    return distance_matrix[start][city];
                }
            }
        } else {
            let minimumDistance = Infinity;
            for (let city of cities) {
                if (city !== start) {
                    let newCities = new Set(cities);
                    newCities.delete(start);
                    let dist = helper(newCities, city) + distance_matrix[start][city];
                    minimumDistance = Math.min(minimumDistance, dist);
                }
            }
            return minimumDistance;
        }
    }
    let minimumDistance = Infinity;
    for (let start = 1; start < n; start++) {
        const cities = new Set();
        for (let i = 0; i < n; i++) {
            if (i !== start) {
                cities.add(i);
            }
        }
        const dist = helper(cities, start) + distance_matrix[start][0];
        minimumDistance = Math.min(minimumDistance, dist);
    }
    return minimumDistance;
}
