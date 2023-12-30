import "./BlogPage.css";
import { useEffect, useState } from "react";
import SinglePostResult from './SinglePostResult';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/post/getAllPosts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((allBlogPosts) => setPosts(allBlogPosts))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="blog-main">
            <h1 className="blog-title">Blog - zadbajmy o rośliny!</h1>
            <div className="blog-container">
                {posts.map(post => <SinglePostResult key={post.id} post={post} id={post.id} />)}
            </div>
        </div>
    )
}
