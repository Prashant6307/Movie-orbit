
function Pagination({ page, setSearchParams, totalPages }) {

    

    const previousPage = () => {
        if (page > 1) {
            setSearchParams({
                page: page - 1
            });
        }
    }
    const nextPage = () => {
        if(page < totalPages){
        setSearchParams({
            page: page + 1
        });
    }
    }

    return (
        <div className="flex justify-between text-white my-8 text-xs">
            <button onClick={() => previousPage()} className="bg-[#161D2F] border border-[#1E293B] text-[#CBD5E1] px-5 py-2 rounded-lg font-bold hover:bg-[#8B5CF6]hover:text-white transition">Previous</button>

            <span
                className="bg-[#161D2F] border border-[#1E293B] text-[#CBD5E1] px-5 py-2 rounded-lg font-bold hover:bg-[#8B5CF6]hover:text-white transition">
                Page {page}
            </span>
            <button onClick={() => nextPage()} className="bg-[#161D2F] border border-[#1E293B] text-[#CBD5E1] px-5 py-2 rounded-lg font-bold hover:bg-[#8B5CF6]hover:text-white transition">Next</button>
        </div>
    )
}

export default Pagination