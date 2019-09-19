const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const publicDirPath = path.join(__dirname, './public');
const viewsDirPath = path.join(__dirname, './views');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirPath));
app.set('views', viewsDirPath);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.render('index', {
	title: 'ToDoList'
	}
})


app.listen(port, () => {
	console.log('Server is running on port', port);
}
