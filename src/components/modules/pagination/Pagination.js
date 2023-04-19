import React, { useEffect, useState } from "react";

const Pagination = ({
  total,
  per_page,
  current_page,
  last_page,
  first_page,
  first_page_url,
  last_page_url,
  next_page_url,
  previous_page_url,
  dispatchAction,
}) => {
  const [pageLinks, setPageLinks] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);

  const goToPreviousPage = () => {
    const previousPage = current_page - 1;
    dispatchAction({ page: previousPage });
  };

  const goToNextPage = () => {
    const nextPage = current_page + 1;
    dispatchAction({ page: nextPage });
  };

  const changePage = (page) => {
    dispatchAction({ page });
  };

  const buildPageLinks = (pageLinks) => {
    let newArray = [];
    let i = 1;

    while (i <= pageLinks?.length) {
      if (
        i <= 1 || // get first
        i >= pageLinks?.length - 1 || // get last two 39 38 37
        (i >= current_page - 1 && i <= current_page + 1)
      ) {
        // get b4 and after current page
        newArray.push(i);
        i++;
      } else {
        newArray.push("...");

        //jump to the next page to be linked in the navigation
        i = i < current_page ? current_page - 1 : pageLinks?.length - 1; // 9  38
      }
    }
    setPaginationLinks(newArray);
  };

  const showPagination = total > per_page;

  const startIndex = current_page * per_page - (per_page - 1);
  const endIndex = Math.min(startIndex + per_page - 1, total);

  useEffect(() => {
    const pages = Math.ceil(total / per_page);
    setPageLinks(pages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    buildPageLinks([...Array(pageLinks)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLinks]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });

    buildPageLinks([...Array(pageLinks)]);
  }, [current_page]);

  return (
    <div
      className={`${
        showPagination ? "d-flex flex-stack flex-wrap pt-5" : "d-none"
      }`}
    >
      <div className="fs-6 fw-bold text-gray-700">
        Showing {startIndex} to {endIndex} of {total} entries
      </div>

      <ul className="pagination">
        <li
          className={`page-item previous ${
            current_page === first_page && "invisible"
          }`}
        >
          <button className="page-link" onClick={goToPreviousPage}>
            <i className="previous"></i>
          </button>
        </li>

        {paginationLinks.map((linkNumber, index) => (
          <li
            key={index}
            className={`page-item ${
              typeof linkNumber === "string" && "disabled"
            } ${current_page === linkNumber ? "active" : ""} `}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => changePage(linkNumber)}
            >
              {linkNumber}
            </button>
          </li>
        ))}

        <li
          className={`page-item next ${
            current_page === last_page && "invisible"
          }`}
        >
          <button className="page-link" onClick={goToNextPage}>
            <i className="next"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
