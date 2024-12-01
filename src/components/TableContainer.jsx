import { ITEMS_PER_PAGE } from '../constants';
import { useFetchData } from '../hooks/useFetchData';
import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import styles from './TableContainer.module.css';

export const TableContainer = () => {
  const { data, isLoading, error } = useFetchData();

  // Get the current page from the URL query params
  const getQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page'), 10) || 1;
  };

  const [currentPage, setCurrentPage] = useState(getQueryParams());
  const itemsPerPage = ITEMS_PER_PAGE;

  // Calculate the indices for slicing data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Update the URL with the new page number without reloading the page
    window.history.pushState({}, '', `?page=${newPage}`);
  };
  useEffect(() => {
    const newPage = getQueryParams();
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
    if (newPage > totalPages) {
      handlePageChange(1);
    }
  }, [data, currentPage, totalPages]);

  if (error) {
    return <div role="alert">Something went wrong</div>;
  }

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  return (
    <>
      <DataTable data={currentData} />
      <section className={styles.tablefooter}>
        <button
          className={styles.button}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Go to previous page"
          aria-disabled={currentPage <= 1}
          disabled={currentPage <= 1}
          data-testid="prev-button"
        >
          Prev
        </button>

        <span role="status" aria-live="polite">
          {currentPage} of {totalPages}
        </span>

        <button
          className={styles.button}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Go to next page"
          aria-disabled={currentPage >= totalPages}
          disabled={currentPage >= totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </section>
    </>
  );
};
