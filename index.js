const express = require('express');
const http = require('http');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const hostname = 'localhost';
const port = 3001;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
});

app.get('/dishes',(req,res,next)=>{
    res.end('Will send all dishes to you!');
});

app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: ' + req.body.name+' with details: '+ req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on dishes');
});

app.delete('/dishes',(req,res,next)=>{
    res.end('deleting all dishes!');
});

app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('Will send details of dish: '+req.params.dishId+' to you!');
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /dishes/ '+req.params.dishId);

});

app.put('/dishes/:dishId',(req,res,next)=>{
   res.write('Updating dish: '+req.params.dishId);
    res.end('Will update dish: '+req.body.name+
    ' with details: '+req.body.description+'\n');
});

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('deleting dish: '+req.params.dishId);
});

app.use(express.static(__dirname+ '/public'));
app.use((req,res,next ) => {
res.statusCode=200;
res.setHeader('Content-Type','text/html');
res.end('<html><body><h1>EXPRESS WORKING HERE</h1></body></html>');
});

const server=http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});