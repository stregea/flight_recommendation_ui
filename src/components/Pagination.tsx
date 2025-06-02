'use client';

export default function Pagination({currentPage, totalPages, onPageChangeAction}: {
    currentPage: number,
    totalPages: number,
    onPageChangeAction: (page: number) => void
}) {
    if (totalPages <= 1) return null;

    return (
        <nav className="d-flex justify-content-center my-4">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChangeAction(currentPage - 1)}>&laquo;</button>
                </li>
                {Array.from({length: totalPages}, (_, idx) => idx + 1).map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChangeAction(page)}>{page}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChangeAction(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </nav>
    );
};