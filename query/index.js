const express = require("express");
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");

const posts = {};


function handleEvent(type, data){
    if (type == "postCreated"){
        const{id, title } = data;
        posts[id] = {id, title, comments:[]};
    }
    else if (type == "commentCreated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }
    else if(type == "commentUpdated"){
        const {id, content, postId, status} = data;

        const post = posts[postId];
        console.log(post);
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;        
    }
}


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get("/posts", (req,res)=>{
    res.send(posts);
});


app.post("/events",(req,res)=>{
    const {type, data} = req.body;
    handleEvent(type, data);

    console.log(posts);
    res.send("got event");
});


app.listen(4002, async function(){
    console.log("started on 4002");
    const res = await axios.get("http://localhost:4005/events");
    for (let e of res.data){
        console.log("Processing event");
        handleEvent(e.type, e.data);
    }
});