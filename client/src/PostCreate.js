import React, {useState} from "react";
import axios from "axios";


export default () => {
    const [title, setTitle] = useState("");
    const onSubmit = async (e)=>{
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:4000/posts',
            data: {
                "title": title              
            }
        });        
        setTitle("");
    };
    return (<div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)}/>                
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>);
}