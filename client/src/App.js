import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";


export default () => {
    return (<div className="container">
        <section>
            <h1>
                Create Post
            </h1>
            <PostCreate/>
        </section>
        
        <section>
            <h1>Posts</h1>
            <PostList/>
        </section>
        
    </div>);
}