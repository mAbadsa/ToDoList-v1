const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const date = require('./modules/date');

const publicDirPath = path.join(__dirname, './public');
const viewsDirPath = path.join(__dirname, './views');

const app = express();
const items = [];
const workList = [];

const { PORT = 3000 } = process.env;

app.use(express.static(publicDirPath));
app.set('views', viewsDirPath);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

	const day = date.getDate();

	res.render('index', {
		title: 'ToDoList',
		listTitle: day,
		newListItem: items
	});
})

app.post('/', (req, res) => {
	const item = req.body.newItem;
	if(item !== "") {
		if(req.body.list === 'Work') {
			workList.push(item);
			res.redirect('/work');
		} else {
			items.push(item);
			res.redirect('/');
		}
	}
	console.log(req.body);
	// res.redirect('/');
})

app.get('/work', (req, res) => {
	res.render('index', {
		listTitle: "Work List",
		newListItem: workList
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		listTitle: "About",
		newListItem: workList
	})
})

// app.post('/work', (req, res) => {
// 	let item = req.body.newItem;
// 	workList.push(item);
// 	res.redirect('/work');
// })

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
})
