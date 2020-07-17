const animals = require('./animals').animals;
const colors = require('./colors').colors;
const adjectives = require('./adjectives').adjectives;

const express = require('express');
const process = require('process');
const cors = require('cors');
const fs = require('fs'); 
const { compileFunction } = require('vm');
const { isArray } = require('util');

const app = express();
const port = process.env.PORT || 8080;


const users = [];
// Obtaining saved users
fs.readFile("./users.json", (err, data) => {
	if(err) {
		return console.log(err);
	}
	
	if(data.length > 0) {
		var content = JSON.parse(data);
		content.forEach(element => {
			users.push(element);
		});
	}
});

const messages = [];
// Obtaining saved messages
fs.readFile("./messages.json", (err, data) => {
	if(err) {
		return console.log(err);
	}
	
	if(data.length > 0) {
		var content = JSON.parse(data);
		content.forEach(element => {
			messages.push(element);
		});
	}
});

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
	res.send(messages);
});

app.post('/messages', (req, res) => {
	messages.push(req.body);

	// Writing messages to file
	fs.writeFile("./messages.json", JSON.stringify(messages), 'utf8', (err) => {
		if(err) {
			return console.log(err);
		}
	});

	res.send({});
});

app.post('/username', (req, res) => {
	/** @argument { any[] } arr */
	function randomItemFromArray (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	
	// Getting new combination of username and color
	var user;
	do {
		user = {
			name: `${randomItemFromArray(adjectives)} ${randomItemFromArray(animals)}`,
			color: randomItemFromArray(colors),
		}	
	} while(users.includes(user));
	users.push(user);

	// Writing users to file
	fs.writeFile("./users.json", JSON.stringify(users), 'utf8', (err) => {
		if(err) {
			return console.log(err);
		}
	});

	res.send(user);
});

app.listen(port, () => console.log(`Ready! Server listening on port ${port}`));