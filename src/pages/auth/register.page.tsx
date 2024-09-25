import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../services/authService";

export function Register() {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await register(userData);
      alert('Registration sucessful. Redirect to login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col items-start">
        <label className="flex w-72">
          Full Name:
          <input
            type="text" value={userData.fullname} onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} required
            className="ml-auto mr-0" />
        </label>
        <label className="flex w-72">
          Email:
          <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required
            className="ml-auto mr-0" />
        </label>
        <label className="flex w-72">
          Username:
          <input type="text" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} required
            className="ml-auto mr-0" />
        </label>
        <label className="flex w-72">
          Password:
          <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required
            className="ml-auto mr-0" />
        </label>
        <input type="submit" value="Register" />
      </form>

      {/* Add registration link */}
      <p>
        Already have an account?
        <a href="/login">Login now</a>
      </p>

      {/* Add social media login links */}
      <p>
        Or login with:
        <span>Facebook</span>
        <span>Google</span>
        <span>Github</span>
      </p>
    </div>
  )
}