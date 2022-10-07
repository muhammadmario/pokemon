import React from "react";

function Pagination({ setUrl, nextPage, prevPage }) {
  return (
    <div className="w-full bg-yellow-200 flex justify-center items-center gap-5 py-3">
      <button className="bg-white py-2 w-20" onClick={() => setUrl(prevPage)}>
        Prev
      </button>

      <button className="bg-white py-2 w-20" onClick={() => setUrl(nextPage)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
