import { Link } from "react-router-dom"
import image1 from "../assets/hero.png"

const Hero = () => {
    return (
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-full max-md:max-w-md mx-auto p-10 bg-[#3C3D3D] my-5 rounded-xl">
            <div className="max-md:order-1 max-md:text-center lg:ml-24">
                <h2 style={{ fontFamily: "League Spartan" }} className="md:text-4xl text-3xl md:leading-10 font-bold text-[#F6F6F6] mb-4">
                    Track your reads, <br />
                    build your library, <br />
                    and let smart suggestions <br />
                    spark your next great book
                </h2>

                <div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
                    <a 
                        style={{ fontFamily: "League Spartan" }}
                        className="px-6 py-3 text-base font-semibold text-[#F4F893] border border-[#F4F893] rounded-full  hover:bg-[#F4F893] hover:text-[#3C3D3D] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:outline-none focus:ring-opacity-50"
                        href="/#gemini"
                    >
                        Get Recommendation
                    </a>
                </div>
            </div>
            <div className="md:h-[450px]">
                <img
                    alt="Dining Experience"
                    className="w-full h-full object-contain rounded-lg"
                    src={image1}
                />
            </div>
        </div>
    )
}

export default Hero