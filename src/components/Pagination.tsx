'use client';

export default function Pagination({currentPage, totalPages, onPageChangeAction}: {
    currentPage: number,
    totalPages: number,
    onPageChangeAction: (page: number) => void
}) {
    if (totalPages <= 1) return null;

    // Helper to create page button
    const pageButton = (page: number) => (
        <li key={page} className="page-item">
            <button
                className={`page-link ${page === currentPage ? 'active bg-primary text-white border-primary' : ''}`}
                onClick={() => onPageChangeAction(page)}
            >
                {page}
            </button>
        </li>
    );

    const renderPageNumbers = () => {
        if (totalPages <= 10) {
            // Show all pages
            return Array.from({ length: totalPages }, (_, i) => pageButton(i + 1));
        }

        const pages = [];

        // Always show first page
        pages.push(pageButton(1));

        // Show ellipsis after first page if needed
        if (currentPage > 4) {
            pages.push(
                <li key="start-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                </li>
            );
        }

        // Calculate start and end page around current page (max 3 pages)
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Adjust when near the start
        if (currentPage <= 4) {
            startPage = 2;
            endPage = 4;
        }

        // Adjust when near the end
        if (currentPage >= totalPages - 3) {
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        }

        // Add pages between first and last with ellipses as needed
        for (let i = startPage; i <= endPage; i++) {
            pages.push(pageButton(i));
        }

        // Show ellipsis before last page if needed
        if (currentPage < totalPages - 3) {
            pages.push(
                <li key="end-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                </li>
            );
        }

        // Always show last page
        pages.push(pageButton(totalPages));

        return pages;
    };

    return (
        <nav aria-label="Flight list pagination" className="mt-4">
            <ul className="pagination justify-content-center flex-wrap">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChangeAction(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        &laquo;
                    </button>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChangeAction(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};