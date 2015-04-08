var express = require('express');
var app = express();
var parser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

/*app.get('/', function(req, res){
	res.send("Hello World from server.js");
});*/
app.use(parser.json());
app.use(express.static(__dirname + "/public"));//tells server where the static(H/C)files
app.get('/contactlist',function(req,res){
        console.log("Did we connect?");
	db.contactlist.find(function(err,data){
                console.log(data);
                res.json(data);
        });
});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,data){
		res.json(data);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,data){
	res.json(data);
});
});
app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,data){
	res.json(data);});
});
app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set:{name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		}
	    );
});


app.listen(3000);
console.log("Server running on 3000");
