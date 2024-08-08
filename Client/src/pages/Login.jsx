import { Link, useNavigate } from "react-router-dom"
import gif from "../assets/flip.gif"
import { useState } from "react"
import RequestBooks from "../helpers/RequestBooks"
import Swal from "sweetalert2";
import GoogleLogin from "../components/GoogleBtn";

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
            if (error.response) {
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
                                <div className="flex justify-center"> 
                                <GoogleLogin />
                                </div>
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