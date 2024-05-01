function tsp_hk(distances) {
    const n = distances.length;
    const cache = {};

    function getKey(subset, city) {
        return subset + '-' + city;
    }

    function dp(subset, city) {
        if (subset === 0 && city !== 0) return distances[city][0];
        const key = getKey(subset, city);
        if (cache[key] !== undefined) return cache[key];
        let minTourLength = Infinity;
        for (let nextCity = 0; nextCity < n; nextCity++) {
            if (nextCity !== city && (subset & (1 << nextCity))) {
                const newSubset = subset & ~(1 << city);
                const tourLength = dp(newSubset, nextCity) + distances[nextCity][city];
                minTourLength = Math.min(minTourLength, tourLength);
            }
        }
        cache[key] = minTourLength;
        return minTourLength;
    }
    let subset = (1 << n) - 1;
    subset &= ~(1 << 0);
    const startCity = 0;
    return dp(subset, startCity);
}
