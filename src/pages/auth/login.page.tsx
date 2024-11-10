import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import toast from 'react-hot-toast';
import useCustomToast from "../../hooks/useCustomToast";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
export function Login() {
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { getToaster } = useCustomToast();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state])

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login({ email, password, isRemember: true })

      toast.success("Đăng nhập thành công");
      setTimeout(_ => navigate("/home"), 1000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Lỗi chưa dự kiến đã xảy ra', { duration: 1000 });
      }
    }
  }

  const handleGoogleLogin = async (response) => {
    const baseApiUrl =
      import.meta.env.MODE === 'development'
        ? 'https://localhost:7213/api' // Replace with your dev port
        : 'http://13.76.25.67:8080/api'; // Replace with your production URL

    try {
      const res = await fetch(`${baseApiUrl}/user/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response.tokenId), // tokenId from Google login response
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user-token", JSON.stringify(data.token));
        console.log(data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        toast.success("Đăng nhập thành công với Google");
        setTimeout(_ => navigate("/home"), 1000);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Đăng nhập thất bại với Google');
      }

    } catch (error) {
      console.error("Lỗi bất ngờ đã xảy ra khi cố đăng nhập với Google: ", error);
    }
  };

  return (
    <div className="z-10 w-1/2 h-[80vh] mx-auto my-16 bg-orange-50 p-16 text-center flex flex-col items-center gap-6">
      {getToaster()}
      <h2 className="text-3xl">Đăng nhập vào Moodbook</h2>
      <GoogleLogin
        clientId="798378210108-8thhu0hg1hc7leafgetqlpvbisur36gg.apps.googleusercontent.com"
        render={renderProps => (
          <button
            onClick={renderProps.onClick} disabled={renderProps.disabled}
            className="relative flex items-start h-10 gap-4 border-2 border-gray-500 rounded-none w-72">
            <span className="flex items-center justify-center w-10 h-10">
              <img src="/google_icon.png" className="w-4 h-4" />
            </span>
            <span className="absolute w-48 leading-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">Tiếp tục bằng Google</span>
          </button>
        )
        }
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
      />
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
    </div >
  )
}