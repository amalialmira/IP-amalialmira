import { useEffect, useState } from "react"
import Card from "../components/Card"
import Hero from "../components/Hero"
import RequestBooks from "../helpers/RequestBooks"
import gif from "../assets/flip.gif"

const Home = () => {

    const [recBooks, setRecBooks] = useState([])
    const [mood, setMood] = useState("")
    const [books, setBooks] = useState([])


    const getAllBooks = async () => {
        try {
            let { data } = await RequestBooks({
                url: '/books',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            setBooks(data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getRec = async (e) => {
        e.preventDefault()
        try {
            let { data } = await RequestBooks({
                url: '/getreccomendation',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    mood
                }
            })
            console.log(data, "INI DIIIIIII SUGESTTT");
            setRecBooks(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <div className="bg-[#F6F6F6] px-10">
            <Hero />
            <div id="BooksPage" className="font-[sans-serif] bg-[#F6F6F6] pt-10">
                <div style={{ fontFamily: "League Spartan" }} className="mx-auto lg:max-w-full sm:max-w-full">
                    <h2 className="text-4xl font-extrabold text-[#3C3D3D] mb-12 text-center">
                        Find your literary treasure here
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-xl:gap-4 gap-6 p-5 ">
                        {books.map((book, i) => (
                            <Card key={i} book={book} />
                        ))}

                    </div>
                </div>
            </div>

            <div className="font-[sans-serif] bg-[#40A557] rounded-xl">
                <div className="flex flex-col items-center justify-center py-6 px-4">
                    <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                        <div style={{ boxShadow: "#3C3D3D 10px 10px 0 0", fontFamily: "League Spartan" }} className="border border-[#3C3D3D] rounded-lg p-6 max-w-md  max-md:mx-auto bg-white">
                            <form onSubmit={getRec} className="space-y-4">
                                <div className="mb-8">
                                    <h3 className="text-gray-800 text-3xl font-extrabold">
                                        Welcome to LitTrack Smart Recommendations
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Discover book recommendations tailored to your favorite genres and moods. Start exploring now to find your next perfect read!
                                    </p>
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        What kind of mood / vibe are you looking for?
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            value={mood}
                                            onChange={(e) => {
                                                setMood(e.target.value)
                                            }}
                                            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                                            name="mood"
                                            placeholder="describe here"
                                            required
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="!mt-8">
                                    <button
                                        className="button-74 px-5 py-2.5 !mt-8 w-full text-[#3C3D3D] border-2 border-[#3C3D3D] bg-[#F4F893] transition-all ease-in-out duration-300 hover:bg-[#40A557] hover:text-[#3C3D3D] text-sm rounded-xl tracking-wide"
                                        type="submit"
                                    >
                                        Generate Reccomendation
                                    </button>
                                </div>
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



            <div id="gemini" className="font-[sans-serif] bg-[#F6F6F6] pt-10">
                <div style={{ fontFamily: "League Spartan" }} className="mx-auto lg:max-w-full sm:max-w-full">
                    <h2 className="text-4xl font-extrabold text-[#3C3D3D] mb-12 text-center">
                        Reccomendations tailored only for you
                    </h2>
                    {/* <pre>{JSON.stringify(recBooks, null, 2)}</pre> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-xl:gap-4 gap-6 p-5 ">
                        {recBooks?.map((book, i) => (
                            <Card key={i} book={book} />
                        ))}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home