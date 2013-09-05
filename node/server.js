var express = require('express');


var app = express();

// ex : S=100&K=102&u=1.07&R=1.01&expiration=1
app.get('/price', function(req, res) {

    console.log(req.query);

    var s = req.query.S,          // initial price
        k = req.query.K,          // whished price
        r = req.query.R,          // probability that the price up or down in each node
        u = req.query.U,          // coef used to determinate the next value of S for the two sub-nodes
        n = req.query.expiration; // number of unit time (month for example) which define the tree depth

    if (!s || !k || !r || !n || !u){
        res.send("S, K, R or expiration is undefined or is zero<br/>"+
            "S="+s+" K="+k+" R="+r+" u="+u+" n="+n);
    } else {

        var d = 1 / u;              // coef when the price down
        var q = (r - d) / (u - d);

        var result = 1/Math.pow(R, expiration) * recusiveSum(n, 0, q, s, u);
        var roundedResult = Math.round(result * 100) / 100;

        req.response.end(roundedResult);
    }
});

var recusiveSum = function (n, k, q, s, u){
    var r = binom(n, k) * Math.pow(q,n-k) * Math.pow(1-q,k) * (s * Math.pow(u, n-k) * Math.pow(d, k));
    if (k == n){
        return Math.max(0, s - r)
    } else{
        return r + recusiveSum(n, k+1, q, s, u);
    }
};

// binomial coef calculation
var binom = function (n, k) {
        var coeff = 1;
        for (var i = n-k+1; i <= n; i++) coeff *= i;
        for (var i = 1;     i <= k; i++) coeff /= i;
        return coeff;
};

app.listen(8080);
console.log('Listening on port 8080...');