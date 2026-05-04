import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import PostList from "./PostList";
import Post from "./Post";
import About from "./About";
import NoMatch from "./NoMath";
import NewPost from "./NewPost";
import Login from "./Login";
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Stats from "./Stats";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
  return (
    <>
      <div className="App">
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>

          <Link to="/about" style={{ padding: 5 }}>
            About
          </Link>
          {user && (
            <>
              <Link to="/posts" style={{ padding: 5 }}>
                Posts
              </Link>
              <Link to="/newpost" style={{ padding: 5 }}>
                {" "}
                New Post
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" style={{ padding: 5 }}>
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/stats"
            element={
              <ProtectedRoute user={user}>
                <Stats />
              </ProtectedRoute>
            }
          />

          <Route
            path="/newpost"
            element={
              <ProtectedRoute user={user}>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </>
  );
}
