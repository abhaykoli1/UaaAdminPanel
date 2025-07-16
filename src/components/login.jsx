import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
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
        <h2 className="font-bold text-2xl  pt-7   bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          UAA Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="font-medium">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>
          <div className="input-group">
            <label className="font-medium">Password :</label>
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
