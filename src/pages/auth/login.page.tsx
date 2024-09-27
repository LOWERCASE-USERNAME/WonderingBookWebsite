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
    <div className="z-10 w-1/2 h-[80vh] mx-auto my-16 bg-orange-50 p-16 text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl">Đăng nhập vào Moodbook</h2>
      <button className="relative flex items-start h-10 gap-4 border-2 border-gray-500 rounded-none w-72">
        <span className="flex items-center justify-center w-10 h-10">
          <img src="/public/google_icon.png" className="w-4 h-4" />
        </span>
        <span className="absolute w-48 leading-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">Tiếp tục bằng Google</span>
      </button>
      <hr className="w-full border-t-2 border-black" />
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-4">
        <div>
          <label className="block text-left w-72">Email:</label>
          <input placeholder="Email"
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
          />
        </div>
        <div>
          <label className="block text-left w-72">Mật khẩu:</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
            placeholder="Mật khẩu"
          />
        </div>
        <input
          type="submit" value="Đăng nhập"
          className="px-4 py-2 mt-4 text-white bg-pink-400 outline-2 outline w-72"
        />
      </form>

      <section className="flex flex-col gap-4">
        <p>
          <a className="underline" href="/forgot-password"> Quên mật khẩu của bạn?</a>
        </p>

        <p className="flex justify-around w-64">
          <span>Bạn chưa có tài khoản?</span>
          <a className="underline" href="/register"> Đăng ký ngay</a>
        </p>
      </section>
    </div>
  )
}