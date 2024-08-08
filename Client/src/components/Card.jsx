const Card = (props) => {

    const { book } = props
    console.log(book);

    return (
        <div>
            <div className="p-5  hover:-translate-y-2 transition-all relative">

                <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                    <img
                        style={{ boxShadow: "#3C3D3D 8px 8px 0 0" }}
                        alt="Book"
                        className="h-[200px] w-[130px] object-cover rounded-lg border-[#3C3D3D]"
                        src={book.imgUrl}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#3C3D3D] mb-2 h-14">
                        {book.title}
                    </h3>
                    <button type="button"
                        className="px-5 py-2.5 mr-1 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-[#333] hover:bg-[#222] active:bg-[#333]">
                        Details
                    </button>
                    <button type="button"
                        className="px-5 py-2.5 rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-[#333] hover:bg-[#222] active:bg-[#333]">
                        + List
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Card