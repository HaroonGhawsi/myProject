
/*
//Code for Client Connectivity with Controller
var http = require('http');
var controller = http.createServer(function(request, response){
    //console.log("Got Response from client");
    //console.log(request.headers);
    response.writeHead(200, {
        'id'            :   'username',
        'Password'      :   'Password'
    });
    //console.log("Got Response from Client!");
    console.log(response);
    response.write("Server Response: You have successfully connected in to Server");
    response.end();

}).listen(5000);
*/

/*
//Controller connectivity to OracleDB
    var dbConnect = require('oracledb');

    dbConnect.getConnection({
        'uid'       :   'username',
        'uPwd'      :   'password'
    }, function(err, connection){
        if(err){
            console.error(err.message);
            return;
        }
        connection.execute()
            console.log('Connected with Oracledb!');
        function(err, result){
            if(err){
                console.error(err.message);
                return;
            }
            console.log(result.rows);
        };
    });
*/

    var http = require('http');
    var url = require('url');
    var fs = require('fs');
    var io = require('socket.io');

    var controller = http.createServer(function(req,res){
        var path = url.parse(req.url).pathname;
        console.log(path);

        switch(path){
            case '/':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write("Json data");
                res.end();
                break;
            case '/index.html':
                fs.readFile(__dirname + path, function(err, data){
                    if(err){
                    res.writeHead(404);
                    res.write("Oops" + path + "does not exist - 404");
                    res.end();

                    }else{
                        res.writeHead(200, {
                            'Content-Type' : "text/html"
                        });
                        res.write(data, 'utf8');
                        res.end();
                    }
                });
                break;
            default:
            res.writeHead(404);
                res.write('Oops this does not exist - 404');
                res.end();
                break;
        }
    });
controller.listen(5000);
io.listen(controller);


















