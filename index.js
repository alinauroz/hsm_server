const exec = require('child_process').execFile;
const http = require('http');
const queryString = require('querystring');
const URL = require('url');

http.createServer((req, res) => {
	let url = URL.parse(req.url);
	
	req.query = queryString.parse(url.query);
	res.writeHead(200, {"Content-type" : "application/json"});
	
	if (url.pathname == "/encrypt") {
		exec("des.exe", ["encrypt", req.query.text], {cwd : "exes"}, (err, res_) => {
			res_ = JSON.parse(res_);
			
			if (err)
				res.end('{"err" : true, "msg" : res_.data}');
			
			res.end(JSON.stringify(res_));
		})
	}
	else if (url.pathname == "/decrypt") {
		exec("des.exe", ["decrypt", req.query.cipher], {cwd : "exes"}, (err, res_) => {
			res_ = JSON.parse(res_);
			
			if (err)
				res.send({"err" : true, "msg" : res_.data});
			
			res.end(JSON.stringify(res_));
		})
	}
	else {
		res.end('{"err" : true, "msg" : "no route found"}');
	}

}).listen(3005);

/*
app.get("/encrypt", (req, res) => {
	exec("des.exe", ["encrypt", req.query.text], {cwd : "exes"}, (err, res_) => {
		res_ = JSON.parse(res_);
		
		if (err)
			res.send({"err" : true, "msg" : res_.data});
		
		res.send(res_);
	})
});

app.get("/decrypt", (req, res) => {
	exec("des.exe", ["decrypt", req.query.cipher], {cwd : "exes"}, (err, res_) => {
		res_ = JSON.parse(res_);
		
		if (err)
			res.send({"err" : true, "msg" : res_.data});
		
		res.send(res_);
	})
});
*/