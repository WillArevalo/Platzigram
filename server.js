var express = require('express');
var multer = require('multer');
var ex = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ex(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));


app.get('/', function(req, res){		
	res.render('index', { title:'Platzigram' });
})

app.get('/signup', function(req, res){
	res.render('index', { title:'Platzigram - Signup' });
})

app.get('/signin', function(req, res){
	res.render('index', { title:'Platzigram - Signin' });
})

app.get('/api/pictures', function(req, res, next){
	var pictures = [
    {
      user: {
        username: 'warevalo',
        avatar: 'https://avatars3.githubusercontent.com/u/22353298?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 10,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'warevalo',
        avatar: 'https://avatars3.githubusercontent.com/u/22353298?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 2,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];
  setTimeout(function(){
	  res.send(pictures);
  }, 2000) //TimeOut para esperar antes de que nos arroje una respuesta de DB
});

app.post('/api/pictures', function(req, res){
  upload(req, res, function(err){
    if(err){
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.listen(3000, function(err){
	if(err) return console.log('hubo un error'), process.exit(1);

	console.log('Platzigram escuchando por el puerto 3000');	
})
