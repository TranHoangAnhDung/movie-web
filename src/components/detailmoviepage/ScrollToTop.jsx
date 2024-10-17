import React from "react";

const ScrollTopTop = () => {
  window.onscroll = function () {
    scrollFunction();
  };
  // khai báo hàm scrollFunction
  function scrollFunction() {
    // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      //nếu lớn hơn 20px thì hiện button
      document.getElementById("myBtn").style.display = "inline-block";
    } else {
      //nếu nhỏ hơn 20px thì ẩn button
      document.getElementById("myBtn").style.display = "none";
    }
  }
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        id="myBtn"
        className="fixed bottom-2 right-2 rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md  hover:bg-red-700 active:shadow-none hover:cursor-pointer ml-2 z-50"
        type="button"
        onClick={() => handleScrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </>
  );
};

export default ScrollTopTop;
