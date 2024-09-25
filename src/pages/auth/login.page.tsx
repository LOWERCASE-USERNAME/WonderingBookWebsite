import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/authService";
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login({ email, password, isRemember: true });
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col items-start">
        <label className="flex w-72">
          Email:
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="ml-auto mr-0"
          />
        </label>
        <label className="flex w-72">
          Password:
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="ml-auto mr-0"
          />
        </label>
        <input
          type="submit" value="Login"
          className="px-2 py-1 outline-2 outline "
        />
      </form>

      {/* Add forgot password link */}
      <section className="flex flex-col">
        <p>
          Forgot password?
          <a className="text-blue-700 underline decoration-blue-700 visited:text-purple-900 visited:decoration-purple-900" href="/forgot-password"> Click here</a>
        </p>

        {/* Add registration link */}
        <p>
          Don't have an account?
          <a className="text-blue-700 underline decoration-blue-700 visited:text-purple-900 visited:decoration-purple-900" href="/register"> Register now</a>
        </p>

        {/* Add social media login links */}
        <p>
          Or login with:
          <div className="flex flex-col">
            <span>Facebook</span>
            <span>Google</span>
            <span>Github</span>
          </div>
        </p>
      </section>
    </div>
  )
}