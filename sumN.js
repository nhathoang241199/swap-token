// O(n)
function sum_to_n_a(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
      result += i;
    }
    return result;
}

// O(n)
function sum_to_n_b(n) {
    if (n === 0) return 0; 
    return n + sum_to_n_b(n - 1);
}

// O(1)
function sum_to_n_c(n) {
    return (n * (n + 1)) / 2;
}

