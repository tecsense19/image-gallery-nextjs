import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({currentPage, totalRecords, perPage, handlePageChange}) => {
  const showPages = 1; // Number of pages to show before and after the current page
  
  const totalPages = Math.ceil(totalRecords / perPage); // Replace with the actual total number of pages

  const renderPagination = () => {
    const pagination = [];

    for (let i = Math.max(1, currentPage - showPages); i <= Math.min(totalPages, currentPage + showPages); i++) {
      pagination.push(
        <a key={i} href="#" onClick={(e) => {e.preventDefault(); handlePageChange(i)}}
          className={`relative inline-flex items-center px-3 md:px-4 py-2 text-sm font-semibold ${
            currentPage === i
              ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-gray-300'
              : 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
          }`} >
          {i}
        </a>
      );
    }

    return pagination;
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-1 sm:items-center justify-center sm:justify-between">
        <div className='hidden sm:block'>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            Showing <span className="font-medium">{((currentPage - 1) * perPage) + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * perPage, totalRecords)}</span> of{' '}
            <span className="font-medium">{totalRecords}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#" onClick={(e) => {e.preventDefault();handlePageChange(Math.max(1, currentPage - 1))}}
              className={`relative hidden sm:inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`} >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {
              (currentPage - showPages) > 1
              ? <>
                  <a href="#" onClick={(e) => {e.preventDefault();handlePageChange(1)}}
                    className={`relative inline-flex items-center px-3 md:px-4 py-2 text-sm font-semibold ${
                      currentPage === 1
                        ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-gray-300'
                        : 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
                    }`} >
                    {1}
                  </a>
                  {currentPage - showPages !== 2
                    ? <span className="relative inline-flex items-center px-3 md:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ... 
                      </span>
                    : <></>
                  }
                </>
              : <></>
            }
            {renderPagination()}
            {
              (currentPage + showPages) < totalPages
              ? <>
                  {currentPage + showPages !== totalPages-1
                    ? <span className="relative inline-flex items-center px-3 md:px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ... 
                      </span>
                    : <></>
                  }
                  <a href="#" onClick={(e) => {e.preventDefault(); handlePageChange(totalPages)}}
                    className={`relative inline-flex items-center px-3 md:px-4 py-2 text-sm font-semibold ${
                      currentPage === totalPages
                        ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-gray-300'
                        : 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
                    }`} >
                    {totalPages}
                  </a>
                </>
              : <></>
            }
            <a href="#" onClick={(e) => {e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1))}}
              className={`relative hidden sm:inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`} >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;