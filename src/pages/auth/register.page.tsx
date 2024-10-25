import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../services/authService";
import toast from "react-hot-toast";
import axios from "axios";
import GoogleLogin from "react-google-login";
import useCustomToast from "../../hooks/useCustomToast";

export function Register() {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  });
  const { getToaster } = useCustomToast();
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await register(userData);

      toast.success("Đăng ký thành công! Điều hướng tới trang đăng nhập");
      setTimeout(_ => navigate("/login"), 1000);
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
    <div className="z-10 flex flex-col items-center w-1/2 h-screen gap-6 p-16 mx-auto text-center bg-orange-50">
      {getToaster()}
      <h2 className="text-3xl">Đăng ký để đọc sách thôi!</h2>
      <form onSubmit={handleRegister} className="flex flex-col items-center justify-center gap-4">
        <div>
          <label className="block text-left w-72">Tên đầy đủ:</label>
          <input placeholder="Tên đầy đủ"
            type="text" value={userData.fullname} onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} required
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
          />
        </div>
        <div>
          <label className="block text-left w-72">Email:</label>
          <input placeholder="Email"
            type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
          />
        </div>
        <div>
          <label className="block text-left w-72">Tên người dùng:</label>
          <input placeholder="Tên người dùng"
            type="text" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} required
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
          />
        </div>
        <div>
          <label className="block text-left w-72">Mật khẩu:</label>
          <input placeholder="Mật khẩu"
            type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required
            className="px-4 py-2 ml-auto mr-0 border-2 border-black w-72"
          />
        </div>
        <input
          type="submit" value="Đăng ký"
          className="px-4 py-2 mt-4 text-white bg-pink-400 outline-2 outline w-72"
        />
      </form>
      <hr className="w-full border-t-2 border-black" />
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
      <p className="flex justify-around w-64">
        <span>Bạn đã có tài khoản?</span>
        <a className="underline" href="/login"> Đăng nhập tại đây</a>
      </p>

    </div>
  )
}