const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
    res.send('<h1>Hello welcome in new Swagger project</h1>');
});

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

app.listen(1000,() => {
    console.log("server is running on port : 1000");
});