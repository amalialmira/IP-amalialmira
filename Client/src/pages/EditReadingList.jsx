import { useEffect, useState } from "react"
import RequestBooks from "../helpers/RequestBooks"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

const EditPage = () => {
    const [toEdit, setToEdit] = useState([])
    const [status, setStatus] = useState('to read')
    const [notes, setNotes] = useState('')
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const { id } = useParams()
    // console.log(id);

    const getBookById = async () => {
        try {
            let { data } = await RequestBooks({
                url: `/myreadlist/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(data, "<<<<<");
            setToEdit(data)
            setTitle(data.Book.title)
            setDescription(data.Book.description)
            setImgUrl(data.Book.imgUrl)
            // console.log(toEdit);

        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            await RequestBooks({
                url: `/myreadlist/edit/${id}`,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {
                    status,
                    notes
                }
            });
            Swal.fire({
                title: "Good job!",
                text: "Successfully edit your status and notes!",
                icon: "success"

            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookById()
    }, [])


    return (
        <div style={{ fontFamily: "League Spartan" }} className="h-screen font-[sans-serif] bg-[#40A557]">
            <div className=" flex flex-col items-center justify-center align-middle">
                <div style={{ boxShadow: "#3C3D3D 10px 10px 0 0" }} className="grid bg-[#F6F6F6] md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 border-2 border-[#3C3D3D] rounded-xl">
                    <div className="md:max-w-md w-full px-4 py-4">
                        <form onSubmit={handleEdit}>
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-extrabold">
                                    {title}
                                </h3>
                                <p className="text-sm mt-4 text-gray-800">
                                    {description}
                                </p>
                            </div>
                            <div>
                                <label className="text-gray-800 text-xs block mb-2">
                                    Status
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        name="status"
                                        placeholder="Change"
                                        required
                                        type="text"
                                        value={status}
                                        onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="text-gray-800 text-xs block mb-2 pt-">
                                    Your Personal Notes
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                                        name="notes"
                                        placeholder="put your notes here"
                                        required
                                        type="text"
                                        value={notes}
                                        onChange={(e) => {
                                            setNotes(e.target.value)
                                        }}
                                    />
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
                    <div className="md:h-full bg-[#F4F893] rounded-xl lg:p-12 p-8">
                        <img
                            alt="login-image"
                            className="w-full h-full object-contain rounded-lg"
                            src={imgUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage