const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/',(req,res) => {
    res.send('<h1>Hello welcome in new Swagger project</h1>');
})

app.get('/api/v1/greet',(req,res) => {
    res.send('greeting from Swagger');
})


app.listen(1000,() => {
    console.log("server is running on port : 1000");
});