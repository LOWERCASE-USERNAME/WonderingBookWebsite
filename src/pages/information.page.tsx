import { UserCircleIcon } from "lucide-react";
import Navigation from "../components/navigations/navigation";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function Information() {
  const { userInfo, setUserInfo, loading } = useFetchUserInfo();
  if (loading) {
    return (
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
    )
  } else {
    console.log(userInfo);
  }
  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="px-24 py-8 mx-24">
        <form>
          <h1 className="text-3xl font-semibold leading-7 text-gray-900">Thông tin</h1>
          <hr className="my-4 border border-gray-500 "></hr>
          <div className="space-y-12">
            <div className="pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Thông tin công khai</h2>
              <p className="mt-1 text-base leading-6 text-gray-600">
                Những thông tin này sẽ được công khai, nên hãy cẩn thận với những gì bạn chia sẻ.
              </p>

              <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Tên người dùng
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md focus-within:bg-white">
                      <span className="flex items-center pl-3 text-gray-500 select-none sm:text-sm">moodbook.site/</span>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={userInfo?.userName}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none "
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Miêu tả
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none focus:bg-white"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Viết một vài dòng để miêu tả về bản thân bạn.</p>
                </div>

                <div className="col-span-full">
                  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Ảnh
                  </label>
                  <div className="flex items-center mt-2 gap-x-3">
                    <UserCircleIcon aria-hidden="true" className="w-12 h-12 text-gray-300" />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Ảnh bìa
                  </label>
                  <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="w-12 h-12 mx-auto text-gray-300" />
                      <div className="flex mt-4 text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative font-semibold text-indigo-600 rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4 border border-gray-500 "></hr>
            <div className="">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Thông tin cá nhân</h2>
              <p className="mt-1 text-base leading-6 text-gray-600">Cung cấp địa chỉ email để chúng tôi có thể gửi cho bạn những nội dung cá nhân hóa tốt nhất.</p>

              <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Tên
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      value={userInfo?.fullname?.split(" ")[0] || ""}
                      type="text"
                      autoComplete="given-name"
                      className="bg-transparent focus:bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Họ
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      value={userInfo?.fullname?.split(" ").slice(1).join(" ") || ""}
                      type="text"
                      autoComplete="family-name"
                      className="bg-transparent focus:bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Địa chỉ Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={userInfo?.email}
                      className="bg-transparent focus:bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4 border border-gray-500 "></hr>
            <div className="pb-12 border-b border-gray-900/10">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">Thông báo</h2>
              <p className="mt-1 text-base leading-6 text-gray-600">
                Cài đặt thông báo bạn nhận được từ chúng tôi
              </p>

              <fieldset className="mt-10">
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex items-center h-6">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Nhận thông báo khi có ai đó comments dưới bài viết của bạn hoặc phản hồi comment của bạn.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex items-center h-6">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Theo dõi
                      </label>
                      <p className="text-gray-500">Nhận thông báo khi người dùng bạn theo dõi đăng bài viết mới.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex items-center h-6">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Ưu đãi
                      </label>
                      <p className="text-gray-500">Nhận thông báo khi có gói ưu đãi mới.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}