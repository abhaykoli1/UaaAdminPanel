import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "vishalgoswami87015@gmail.com" && password === "7014544515") {
      sessionStorage.setItem("isLogin", true);
      window.location.reload();
    } else {
      window.location.reload();
      alert("Wrong Email & Password");
      sessionStorage.setItem("isLogin", false);
    }
    setError("");
  };

  return (
    <section className="LoginPage">
      <div className="login-container">
        <h2>UAA Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
