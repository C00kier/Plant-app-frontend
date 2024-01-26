import { useEffect, useState } from 'react';
import './SinglePostResult.css'
import { useNavigate } from 'react-router-dom';

export default function SinglePostResult({ post, id }) {
    const [backgroundImage, setBackgroundImage] = useState();
    const navigate = useNavigate();
    const navigateToPost = () => {
         navigate("/blog/post/" + id);
    }
    useEffect(() => {
        import(`../../assets/blog/${id}.jpg`).then(image => setBackgroundImage(image.default));
    }, [id, setBackgroundImage])

    return (
        <>
            <div className='single-post' onClick={navigateToPost}>
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
                
            </div>
        </>
    )
}