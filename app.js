const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const publicDirPath = path.join(__dirname, './public');
const viewsDirPath = path.join(__dirname, './views');

const app = express();
let items = [];

const { PORT = 3000 } = process.env;

app.use(express.static(publicDirPath));
app.set('views', viewsDirPath);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

	let toDay = new Date(),
		option = {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		};
	let day = toDay.toLocaleDateString('en-US', option);

	res.render('index', {
		title: 'ToDoList',
		kinOfDay: day,
		newListItem: items
	});
})

app.post('/', (req, res) => {
	let item = req.body.newItem;
	if(item !== "") {
		items.push(item);
	}
	res.redirect('/');
})

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
})
