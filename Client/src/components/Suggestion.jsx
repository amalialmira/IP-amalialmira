
import Home from "../pages/Home"
import { useState } from "react"
import RequestBooks from "../helpers/RequestBooks"

const BookSuggestions = () => {
    const [recBooks, setRecBooks] = useState([])
    const [mood, setMood] = useState("")


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
    return (
        <div style={{ fontFamily: "League Spartan" }}>
            <Home recBooks={recBooks}/>

       {modalOpen 
       &&  <div style={{ fontFamily: "League Spartan" }} className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
                
                <div className="my-8 text-center">
                    <h4 className="text-3xl text-gray-800 font-extrabold">
                    Welcome to LitTrack Smart Recommendations
                    </h4>
                    <p className="text-sm text-gray-500 mt-4">
                    Discover book recommendations tailored to your favorite genres and moods. Start exploring now to find your next perfect read!
                    </p>
                </div>
                <form onSubmit={getRec} className="space-y-4">
                        <label className="mb-2 block" >What kind of mood / vibe are you looking for?</label>
                    <div className="relative flex items-center">
                        <input
                            value={mood}
                            onChange={(e) => {
                                setMood(e.target.value)
                            }}
                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
                            placeholder="describe here"
                            type="text"
                            name="mood"
                        />
                    </div>
                    <button
                        className="button-74 px-5 py-2.5 !mt-8 w-full text-[#3C3D3D] border-2 border-[#3C3D3D] bg-[#F4F893] transition-all ease-in-out duration-300 hover:bg-[#40A557] hover:text-[#3C3D3D] text-sm rounded-xl tracking-wide"
                        type="submit"
                    >
                        Generate Reccomendation
                    </button>
                </form>
            </div>
        </div>}
        </div>
    )
}

export default BookSuggestions