import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function NewPost() {
  const [newPost, setNewPost] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/blogs",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setNewPost("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post created failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        <br />

        <span>Slug:</span>
        <br />
        <input type="text" {...register("slug", { required: true })} />
        <br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}

        <span>Title:</span>
        <br />
        <input type="text" {...register("title", { required: true })} />
        <br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}

        <span>content:</span>
        <br />
        <input type="text" {...register("content", { required: true })} />
        <br />
        {errors.content && (
          <div style={{ color: "red" }}>content is required</div>
        )}

        <br />
        <button type="submit">Add New</button>

        <p className="text-success">{newPost}</p>
      </div>
    </form>
  );
}

export default NewPost;
