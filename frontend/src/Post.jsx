import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/blogs/${slug}`,
        );
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <span>Loading...</span>;

  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }

  const { title, content } = post;

  return (
    <div style={{ padding: 20 }}>
      <span>-Tiêu đề</span><h3>{title}</h3>
      <span>-Nội dung</span><p>{content}</p>
    </div>
  );
}
