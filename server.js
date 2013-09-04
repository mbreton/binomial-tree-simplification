var vertx = require('vertx');
var console = require('vertx/console');

vertx.createHttpServer().requestHandler(function(req) {
    if (req.path() == '/'){
        var K, R, S, U;
        req.params().forEach(function(key, value) {
            if (key == "k") K = value;
            if (key == "R") R = value;
            if (key == "S") S = value;
            if (key == "U") U = value;
        });

        req.response.end(str);
    };
}).listen(8080);