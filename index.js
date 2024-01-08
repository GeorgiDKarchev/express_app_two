const express =  require('express');
const myMiddleware = require ('./middlewares/myMiddlewares');
const fs = require('fs');
const morgan = require('morgan')
 
//setting the port and saving express to app variable
const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use((req,res,next) =>{
    console.log(``)
    next()
});


//App Engine
app.engine('perscholas', (filePath, options, callback) => {
    // read the template file
    fs.readFile(filePath, (err, content) => {
        // if there is an error reading the file return!
        if (err) return callback(err);

        const rendered = content
            .toString()
            .replaceAll('#title#', `${options.title}`)
            .replaceAll('#content#', `${options.content}`)

        return callback(null, rendered);
    })
});

app.set("views", "./views"), //sets the views for the app
app.set("view engine","perscholas"), //sets the template engine for the app
// using css
app.use(express.static("./styles")),

//image 
app.use(express.static('./assets'));


// rendering first view 
app.get('/', (req, res) => {
    console.log(req.url)
    res.render("index");
  });

// rendering second view 
app.get('/secondview', (req, res) => {
    res.render("content");
  }); 

//get request for route /package
app.get("/package",(req,res)=>{
    console.log(req.url)
    res.send("this is another message")
});

//post request for route /package
app.post('/package', (req, res)=>{
    console.log(req.url)
    res.send("Send a message")
});



//middleware
app.use(myMiddleware);
app.use((req,res,next) =>{
    console.log('Im a middleware!');
    next();
});


//image
 app.get('/donload', (req, res)=>{
    res.download('./assets/Photo123.jpeg');
 });


//rerouting all routes to main page
app.all('*', (req,res)=>{
    res.redirect('/');
});

app.use(morgan('dev'));

//settig the server and start it 
app.listen(PORT, ()=>{
    console.log('Server is running')
})




