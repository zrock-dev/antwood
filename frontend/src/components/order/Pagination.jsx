import { useRef, useState } from "react";
import Button from "../Button";

const Pagination = ({ totalPages, setPage }) => {
  const [btnsPage, setBtnsPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRef = useRef(0);
  const BUTTONS_PER_PAGE = 10;

  const calculateBtnsPage = () => {
    paginationRef.current = parseInt(totalPages / BUTTONS_PER_PAGE);
    paginationRef.current -= (totalPages % BUTTONS_PER_PAGE === 0) ? 1 : 0;
  }

  const displayDynamicPagination = () => {
    calculateBtnsPage()
    
    let currentBtnsPage = btnsPage * BUTTONS_PER_PAGE;
    let fromBtns = currentBtnsPage + 1;
    let toBtns = 0;

    if (paginationRef.current === btnsPage) {
       toBtns = currentBtnsPage + (totalPages - currentBtnsPage);
    } else {
       toBtns = currentBtnsPage + BUTTONS_PER_PAGE;
    }

    return displayPagination(fromBtns, toBtns);
  };

  const displayPagination = (from, to) => {
    const btns = [];
    if (to < from) return;
    for (let i = from; i <= to; i++) {
      btns.push(
        <Button
          key={i}
          className={currentPage === i ? "pagination-active" : ""}
          onClick={() => setActivePage(i)}
        >
          {i}
        </Button>
      );
    }
    console.log(paginationRef.current, btnsPage)
    return btns;
  };

  const setActivePage = (page) => {
    setPage(page);
    setCurrentPage(page);
  };

  return (
    <div className="order-pagination-ctn">
      {totalPages <= 10 ? (
        displayPagination(1, totalPages)
      ) : (
        <>
          {btnsPage !== 0 && (
            <Button onClick={() => setBtnsPage(btnsPage - 1)}>
              <i className="fa-solid fa-angles-left"></i>
            </Button>
          )}

          {displayDynamicPagination()}

          {btnsPage !== paginationRef.current && (
            <Button onClick={() => setBtnsPage(btnsPage + 1)}>
              <i className="fa-solid fa-angles-right"></i>
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
