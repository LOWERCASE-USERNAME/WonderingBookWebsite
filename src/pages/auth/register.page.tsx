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
    <div className="z-10 flex flex-col items-center w-1/2 h-screen gap-6 p-16 mx-auto text-center bg-orange-50">
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
      <button className="relative flex items-start h-10 gap-4 border-2 border-gray-500 rounded-none w-72">
        <span className="flex items-center justify-center w-10 h-10">
          <img src="/public/google_icon.png" className="w-4 h-4" />
        </span>
        <span className="absolute w-48 leading-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">Tiếp tục bằng Google</span>
      </button>
      <p className="flex justify-around w-64">
        <span>Bạn đã có tài khoản?</span>
        <a className="underline" href="/login"> Đăng nhập tại đây</a>
      </p>

    </div>
  )
}