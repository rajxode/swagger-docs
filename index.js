const express = require('express');

const app = express();


app.get('/',(req,res) => {
    res.send('<h1>Hello welcome in new Swagger project</h1>');
})


app.listen(1000,() => {
    console.log("server is running on port : 1000");
});