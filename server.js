var vertx = require('vertx');
var console = require('vertx/console');

vertx.createHttpServer().requestHandler(function(req) {
    if (req.path() == '/'){
        var K, R, S, U, expiration;
        req.params().forEach(function(key, value) {
            //S=&K=&u=&R=&expiration=
            if (key == "K")             K = value;
            if (key == "R")             R = value;
            if (key == "S")             S = value;
            if (key == "u")             U = value;
            if (key == "expiration")    expiration = value;
        });

        var binom = function (n, k) {
            var coeff = 1;
            for (var i = n-k+1; i <= n; i++) coeff *= i;
            for (var i = 1;     i <= k; i++) coeff /= i;
            return coeff;
        }

        var d = 1 / U;
        var q = (R - d) / (U - d);

        var func = function (_expiration, _K, _q, _S, _U){
            var r = binom(_expiration, _K) * Math.pow(_q,_expiration-_K) * Math.pow(1-_q,_K) * (_S * Math.pow(_U, _K) * Math.pow(d, _expiration - _K));
            if (_K <= _expiration){
                return r + func(_expiration, _K+1, _q, _S, _U);
            } else{
                return r;
            }
        };

        var sumResult = func(expiration, 0, q, S, U);


        var result = 1/Math.pow(R, expiration) * (sumResult);

        req.response.end(Math.round(result * 100) / 100);
    };
}).listen(8080);