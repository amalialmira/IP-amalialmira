import { useEffect, useState } from "react";
import RequestBooks from "../helpers/RequestBooks";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ReadList = () => {

    const [lists, setLists] = useState([])

    const getReadingList = async () => {
        try {
            let { data } = await RequestBooks({
                url: `/myreadlist`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(data);
            setLists(data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBook = async (BookId) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await RequestBooks({
                            url: `/myreadlist/delete/${BookId}`,
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                            }
                        })
                        getReadingList()
                        Swal.fire({
                            title: "Success!",
                            text: "Deleted from your reading list!",
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
            });

        } catch (error) {
            console.log(error);
        }
    }

    const editReadingList = async (id) => {

    }

    useEffect(() => {
        getReadingList()
    }, [])

    return (
        <div className="bg-[#F6F6F6]">
            <div id="BooksPage" className="font-[sans-serif] bg-[#F6F6F6] pt-10">
                <div style={{ fontFamily: "League Spartan" }} className="mx-auto lg:max-w-full sm:max-w-full">

                    {/* disini table */}
                    <div className="bg-[#F6F6F6] p-8">
                        <h1 className="mb-5 text-[#3C3D3D] text-2xl font-semibold sticky top-0 bg-inherit z-30">My Reading List</h1>
                        <div className="font-sans overflow-x-auto rounded-xl">
                            <table className="min-w-full">
                                <thead className="sticky top-0 bg-[#40A557] whitespace-nowrap text-center">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            No.
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Book
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Title
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Status
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Personal Notes
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Read
                                        </th>
                                        <th className="p-4 text-sm font-semibold text-[#F6F6F6]">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="whitespace-wrap divide-y divide-gray-200 bg-[#F6F6F6] text-center items-center">
                                    {lists.map((el, i) => (
                                        <tr className="hover:bg-gray-50" key={el.id}>
                                            <td className="p-4 text-xs text-[#3C3D3D]">
                                                {i + 1}
                                            </td>
                                            <td className="p-4 text-xs text-[#3C3D3D]">
                                                <img src={el.Book.imgUrl} />
                                            </td>
                                            <td className="p-4 text-xs text-[#3C3D3D]">
                                                {el.Book.title}
                                            </td>
                                            <td className="p-4 text-xs text-[#3C3D3D]">
                                                {el.status}
                                            </td>
                                            <td className="p-4 text-xs  text-[#3C3D3D]">
                                                {el.notes}
                                            </td>
                                            <td className="p-4 text-xs text-[#3C3D3D] items-center">
                                                <a
                                                    href={el.Book.previewUrl}
                                                    className="mt-2 py-3 px-4 inline-flex items-center gap-x-2 text-xs font-medium rounded-full border border-transparent text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    Read
                                                </a>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className="mr-4" title="Edit">
                                                    <Link to={`/edit/${el.id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                                                            viewBox="0 0 348.882 348.882">
                                                            <path
                                                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                                data-original="#000000" />
                                                            <path
                                                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                                data-original="#000000" />
                                                        </svg>
                                                    </Link>
                                                </button>
                                                <button
                                                    className="mr-4"
                                                    title="Delete"
                                                    onClick={() =>
                                                        deleteBook(el.Book.id)
                                                    }
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                        <path
                                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                            data-original="#000000" />
                                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                            data-original="#000000" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>
        </div>


    )
}

export default ReadList