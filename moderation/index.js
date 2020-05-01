const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios");


const app = express();
app.use(bodyParser.json());

const word_filter = "orange";

app.post("/events", async (req,res)=>{
    console.log("event got");
    const {type, data} = req.body;
    if (type == "commentCreated"){
        let status = "";
        if (data.content.includes(word_filter)){
            status = "rejected";
        }
        else {
            status = "approved";
        }
        await axios.post("http://localhost:4005/events",{
            type: "commentModerated",
            data:{
                id:data.id,
                postId:data.postId, 
                status:status,
                content:data.content
            }
        });
    }
    
    res.status(201);
});


app.listen(4003, function(req,res){
    console.log("started on 4003");
});