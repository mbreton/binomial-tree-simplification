var express = require('express');


var app = express();

// http://localhost:8080/price?S=100&K=102&U=1.07&R=1.01&expiration=1
app.get('/price', function(req, res) {

    var s = +req.query.S,          // initial price
        k = +req.query.K,          // constractuel price
        r = +req.query.R,          // probability that the price up or down in each node
        u = +req.query.U,          // coef used to determinate the next value of S for the two sub-nodes
        n = +req.query.expiration; // number of unit time (month for example) which define the tree depth

    var values= "S="+s+" K="+k+" R="+r+" U="+u+" N="+n;
    console.log(values);

    if (!s || !k || !r || !n || !u){
        res.send("S, K, R, U, or expiration is undefined or is zero<br/>"+values);
    } else {

        var d = 1 / u;              // coef when the price down
        var q = (r - d) / (u - d);

        console.log('d='+d+' q='+q);

        var result = 1/Math.pow(r, n) * recusiveSum(n, 0, q, s, u, d);
        var roundedResult = Math.round(result * 100) / 100 + "";
        console.log(roundedResult)

        res.end(roundedResult);
    }
});

var recusiveSum = function (n, k, q, s, u, d){
    var result =0,
        r = binom(n, k) * Math.pow(q,n-k) * Math.pow(1-q,k) * (s * Math.pow(u, n-k) * Math.pow(d, k));
    if (k == n){
        result = Math.max(0, s - r)
    } else{
        result = r + recusiveSum(n, k+1, q, s, u, d);
    }
    console.log("When k="+k+" result is equal to "+r);
    return result;
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