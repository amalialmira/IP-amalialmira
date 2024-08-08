const EditPage = () => {
    return (
        <div style={{ fontFamily: "League Spartan" }} className="h-screen font-[sans-serif] bg-[#F4F893]">
            <div  className=" flex flex-col items-center justify-center align-middle">
                <div style={{ boxShadow: "#3C3D3D 10px 10px 0 0" }}className="grid bg-[#F6F6F6] md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 border-2 border-[#3C3D3D] rounded-xl">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form>
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    disini title nya
                                </h3>
                                <p className="text-sm mt-4 text-gray-800">
                                    disini desc
                                </p>
                            </div>
                            <div>
                                <label className="text-gray-800 text-xs block mb-2">
                                    Status
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        name="email"
                                        placeholder="Enter email"
                                        required
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="text-gray-800 text-xs block mb-2">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        type="password"
                                    />
                                    <svg
                                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        viewBox="0 0 128 128"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-12">
                                <button
                                    className="w-full py-2.5 px-4 text-sm tracking-wide rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    type="button"
                                >
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
                        <img
                            alt="login-image"
                            className="w-full h-full object-contain"
                            src="https://readymadeui.com/signin-image.webp"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage