const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const publicDirPath = path.join(__dirname, './public');
const viewsDirPath = path.join(__dirname, './views');

const app = express();
const items = [];

const { PORT = 3000 } = process.env;

app.use(express.static(publicDirPath));
app.set('views', viewsDirPath);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

	const toDay = new Date(),
		option = {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		};
	const day = toDay.toLocaleDateString('en-US', option);

	res.render('index', {
		title: 'ToDoList',
		kinOfDay: day,
		newListItem: items
	});
})

app.post('/', (req, res) => {
	var item = req.body.newItem;
	items.push(item);
	res.redirect('/');
})

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
})
