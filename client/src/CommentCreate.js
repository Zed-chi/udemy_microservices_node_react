import React, {useState} from "react";
import axios from "axios";


export default ({postId})=>{
    const [content, setContent] = useState("");
    async function onSubmit(e) {
        e.preventDefault();
        await axios({
            method: 'post',
            url: `http://127.0.0.1:4001/posts/${postId}/comments`,
            data: {
                content
            }
        });        
        setContent("");
    };
    return (<div className="flex">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input className="form-control" value={content} onChange={e => setContent(e.target.value)}/>                
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>);
};
