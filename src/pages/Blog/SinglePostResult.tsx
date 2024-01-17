import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SinglePostResult.css";

//interfaces
import IPost from "../../models/interfaces/IPost";

export default function SinglePostResult({
  post,
  id,
}: {
  post: IPost;
  id: number;
}) {
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const navigate = useNavigate();
  const navigateToPost = () => {
    navigate("/blog/post/" + id);
  };
  useEffect(() => {
    setBackgroundImage(require("../../assets/blog/" + id + ".jpg"));
  }, [post.id, setBackgroundImage]);

  return (
    <>
      <div className="single-post" onClick={navigateToPost}>
        <div
          className="post-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="post-title">
          <span>{post.title}</span>
        </div>
        <div className="post-date">
          <span>{post.date}</span>
        </div>
        <div className="post-lead">
          <span>{post.lead}</span>
        </div>
      </div>
    </>
  );
}
