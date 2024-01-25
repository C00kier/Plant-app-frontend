import { useState, useEffect } from 'react';
import './Post.css'

const Post = () => {
    const url = window.location.href;
    const id = url.split("/")[url.split("/").length - 1]
    const [post, setPost] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [formattedArticle, setFormattedArticle]=useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/post/' + id);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setPost(result); 
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        import(`../../assets/blog/${id}.jpg`).then(image => setBackgroundImage(image.default));
    }, [id, setBackgroundImage])

    
    useEffect(()=>{
        if (post.article) {
            const articleLines = post.article.split('/n')
            .map((line, index) => (
                <span key={index}>
                    {line}
                    <br /><br />
                </span>
            ));
            setFormattedArticle(articleLines);
        }
    },[post.article])

    return (
        <div className='post-container'>
                <div className='post-image' style={{ backgroundImage: `url(${backgroundImage})` }}>
                </div>
                <div className='post-title'>
                    <span>{post.title}</span>
                </div>
                <div className='post-date'>
                    <span>{post.date}</span>
                </div>
                <div className='post-lead'>
                    <span>{post.lead}</span>
                </div> 
                <div className='post-article'>
                    <span>{formattedArticle}</span>
                </div> 
        </div>
    );
};

export default Post;
