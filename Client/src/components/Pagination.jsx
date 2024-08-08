const Pagination = (props) => {
    const { currentPage, nextPage, prevPage, totalPage } = props

    return (
        <nav className="flex items-center gap-x-1 justify-center mb-12" aria-label="Pagination">
            {currentPage !== 1 && (
                <button type="button" 
                onClick={() => {
                    prevPage()
                }} 
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-base font-semibold rounded-full text-[#3C3D3D] bg-[#F4F893] hover:bg-[#3375ED] border-2 border-[#3C3D3D] focus:outline-[#3C3D3D] disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous" disabled="">
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span>Previous</span>
                </button>
            )}

            {currentPage !== totalPage && (
                <button type="button"
                onClick={() => {
                    nextPage()
                }}
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-base font-semibold rounded-full text-[#3C3D3D] bg-[#F4F893] hover:bg-[#3375ED] focus:outline-[#3C3D3D] border-2 border-[#3C3D3D] disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                    <span>Next</span>
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>

            )}
        </nav>
    )
}

export default Pagination