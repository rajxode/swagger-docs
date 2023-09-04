const express = require('express');

const app = express();

const PORT = 1000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const fileUpload = require('express-fileupload');

// rendering the swagger file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// middleware to parse the incoming req with json payload
app.use(express.json());
app.use(fileUpload());

let array = [
    {
        id:"11",
        name:"HTML and CSS",
        price:499,
    },
    {
        id:"22",
        name:"JavaScript",
        price:599,
    },
    {
        id:"33",
        name:"Reactjs",
        price:699
    },
]

app.get('/',(req,res) => {
    res.send('<h1>Hello, Plz visit to /api-docs for swagger docs</h1>')
})

app.get('/api/v1/greet',(req,res) => {
    res.send('greeting from Swagger');
});

app.get('/api/v1/object',(req,res) => {
    res.send({
        id:"1",
        name:"object",
        description:"returning an object"
    });
});

app.get('/api/v1/courses',(req,res) => {
    res.send(array);
});

app.get('/api/v1/mycourses/:courseId',(req,res) => {
    const myCourse = array.find((course) => course.id === req.params.courseId);
    res.send(myCourse);
});

app.post('/api/v1/addcourse',(req,res) => {
    array.push(req.body);
    res.send(req.body);
});

app.get('/api/v1/query', (req,res) => {
    let location = req.query.location;
    let device = req.query.device;
    res.send({ location , device });
})

app.post('/api/v1/uploadImage',(req,res) => {
    // getting the uploaded file
    const file = req.files.file;
    // setting the path for the uploaded file
    let path = __dirname + "/images/" + Date.now() + ".jpg";
    // store the file in the path
    file.mv(path, (err) => {
        if(err){
            console.log(err);
        }
        res.send(true);
    })
})


app.listen(PORT,() => {
    console.log(`server is running on port : ${PORT}`);
}); 