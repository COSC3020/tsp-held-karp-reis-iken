function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    let memo = new Array(1 << n).fill(null).map(() => new Array(n).fill(null));
    
    function helper(mask, pos) {
        if (mask === (1 << n) - 1) {
            return distance_matrix[pos][0];
        }
        if (memo[mask][pos] !== null) {
            return memo[mask][pos];
        }
        let minDistance = Infinity;
        for (let next = 0; next < n; next++) {
            if ((mask & (1 << next)) === 0) {
                let newMask = mask | (1 << next);
                let distance = distance_matrix[pos][next] + helper(newMask, next);
                minDistance = Math.min(minDistance, distance);
            }
        }
        memo[mask][pos] = minDistance;
        return minDistance;
    }
    return helper(1, 0);
}
