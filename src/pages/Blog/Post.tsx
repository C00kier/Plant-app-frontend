import { useState, useEffect } from "react";
import "./Post.css";

import IPost from "../../models/interfaces/IPost";

const Post = () => {
  const url: string = window.location.href;
  const id: string = url.split("/")[url.split("/").length - 1];
  const [post, setPost] = useState<IPost | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [formattedArticle, setFormattedArticle] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/post/" + id);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setBackgroundImage(require("../../assets/blog/" + id + ".jpg"));
  }, [post && post.id, setBackgroundImage]);

  useEffect(() => {
    if (post && post.article) {
      const articleLines = post.article.split("/n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
          <br />
        </span>
      ));
      setFormattedArticle(articleLines);
    }
  }, [post && post.article]);

  return (
    <div className="post-container">
      <div
        className="post-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="post-title">
        <span>{post && post.title}</span>
      </div>
      <div className="post-date">
        <span>{post && post.date}</span>
      </div>
      <div className="post-lead">
        <span>{post && post.lead}</span>
      </div>
      <div className="post-article">
        <span>{formattedArticle}</span>
      </div>
    </div>
  );
};

export default Post;
