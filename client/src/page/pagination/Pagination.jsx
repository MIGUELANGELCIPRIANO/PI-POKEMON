const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#8249;
            </button>
            <span>
                {currentPage} de {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &#8250;
            </button>
        </div>
    );
};

export default Pagination;