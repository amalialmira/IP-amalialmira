import { Link, useNavigate } from "react-router-dom"
import gif from "../assets/flip.gif"
import { useState } from "react"
import RequestBooks from "../helpers/RequestBooks"
import Swal from "sweetalert2";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let { data } = await RequestBooks({
                url: '/login',
                method: 'POST',
                data: {
                    email,
                    password
                }
            })
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error);
            if (error.response.status) {
                Swal.fire({
                    title: "Error!",
                    text: `${error.response.data.message}`,
                    icon: "error",
                });
            }
        }
    }

    return (
        <div className="font-[sans-serif] bg-[#F4F893]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                    <div style={{ boxShadow: "#3C3D3D 10px 10px 0 0", fontFamily: "League Spartan" }} className="border border-[#3C3D3D] rounded-lg p-6 max-w-md  max-md:mx-auto bg-white">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    Sign in
                                </h3>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Email
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        name="email"
                                        placeholder="Enter user name"
                                        required
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        type="password"
                                    />
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button
                                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                            <div>
                                <div className="my-4 flex items-center gap-4">
                                    <hr className="w-full border-gray-300" />
                                    <p className="text-sm text-gray-800 text-center">
                                        or
                                    </p>
                                    <hr className="w-full border-gray-300" />
                                </div>
                                <button
                                    className="w-full flex items-center justify-center gap-4 py-3 px-6 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
                                    type="button"
                                >
                                    <svg
                                        className="inline"
                                        viewBox="0 0 512 512"
                                        width="20px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                            data-original="#fbbd00"
                                            fill="#fbbd00"
                                        />
                                        <path
                                            d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                            data-original="#0f9d58"
                                            fill="#0f9d58"
                                        />
                                        <path
                                            d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                            data-original="#31aa52"
                                            fill="#31aa52"
                                        />
                                        <path
                                            d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                            data-original="#3c79e6"
                                            fill="#3c79e6"
                                        />
                                        <path
                                            d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                            data-original="#cf2d48"
                                            fill="#cf2d48"
                                        />
                                        <path
                                            d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                            data-original="#eb4132"
                                            fill="#eb4132"
                                        />
                                    </svg>
                                    Continue with google
                                </button>
                            </div>
                            <p className="text-sm !mt-8 text-center text-gray-800">
                                Don't have an account ?{' '}
                                <Link to="/register"
                                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                    href="javascript:void(0);"
                                >
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                    <div className="lg:h-[500px] md:h-[400px] max-md:mt-8">
                        <img
                            alt="Dining Experience"
                            className="w-full h-full max-md:w-4/5 mx-auto block object-contain"
                            src={gif}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login