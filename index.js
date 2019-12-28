const exec = require('child_process').execFile;
const express = require('express');

const app = express();

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

app.listen(3005);