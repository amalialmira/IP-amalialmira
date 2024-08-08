import { Link, useNavigate } from "react-router-dom"
import bukubuku from "../assets/Untitled design-5.png"
import Swal from "sweetalert2";
import { useState } from "react";
import RequestBooks from "../helpers/RequestBooks";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegist = async (e) => {
        e.preventDefault()
        try {
            let { data } = await RequestBooks({
                url: '/register',
                method: 'POST',
                data: {
                    username,
                    email,
                    password
                }
            })
            navigate('/login')
            Swal.fire({
                title: "Good job!",
                text: "Successfully created an account!",
                icon: "success"
            });
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
        <div className="font-[sans-serif] bg-[#F6F6F6]">
            <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                    <div style={{ boxShadow: "#3C3D3D 10px 10px 0 0", fontFamily: "League Spartan" }} className="border border-[#3C3D3D] rounded-lg p-6 max-w-md  max-md:mx-auto bg-white">
                        <form onSubmit={handleRegist} className="space-y-4">
                            <div className="mb-8">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    Register Now
                                </h3>
                                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                                    Unlock new worlds and expand your literary horizons. Sign up now and explore a diverse collection of stories tailored to your taste
                                </p>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                    Username
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                        name="username"
                                        placeholder="Enter user name"
                                        required
                                        type="text"
                                    />
                                </div>
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
                                    Register
                                </button>
                            </div>
                            <p className="text-sm !mt-8 text-center text-gray-800">
                                Already have an account ?{' '}
                                <Link to="/login"
                                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                    href="javascript:void(0);"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                    <div className="lg:h-[500px] md:h-[400px] max-md:mt-8">
                        <img
                            alt="Dining Experience"
                            className="w-full h-full max-md:w-4/5 mx-auto block object-contain"
                            src={bukubuku}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register