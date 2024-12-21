import React from "react";
import Carousel from "react-multi-carousel";

// import RatingIcon from "../../assets/rating.png";
// import RatingHalff from "../../assets/rating-half.png";
// import Img from "../../assets/thelionking.jpeg";
// import Iconplay from "../../assets/play-button.png";

const Banner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // Number of slides to scroll
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const images = [
    "https://res.cloudinary.com/dm8km2abq/image/upload/v1734789742/movie-banner_b7mckv.jpg",
    "https://res.cloudinary.com/dm8km2abq/image/upload/v1734789742/cinema-banner_yduiua.jpg",
  ];

  return (
    <div className="bg-black py-8">
      <div className="container mx-auto px-7">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          showDots={true}
          arrows={true}
          containerClass="carousel-container"
          itemClass="carousel-item"
          dotListClass="custom-dot-list-style"
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-[450px] object-contain md:object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
    // <div className="w-full min-h-[500px] bg-center bg-banner bg-no-repeat bg-cover relative">
    //   <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50" />
    //   <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
    //     <div className="flex flex-col space-x-5 items-baseline w-[50%] ">
    //       <p className="text-white bg-gradient-to-r from-red-600 to-white text-md py-2 px-3">
    //         TV SHOW
    //       </p>
    //       <div className="flex flex-col space-y-4">
    //         <h2 className="text-white text-[40px] font-bold font-mono">
    //           {" "}
    //           LION KING
    //         </h2>
    //         <div className="flex items-center space-x-3">
    //           <img src={RatingIcon} alt="rating" className="w-8 h-8" />
    //           <img src={RatingIcon} alt="rating" className="w-8 h-8" />
    //           <img src={RatingIcon} alt="rating" className="w-8 h-8" />
    //           <img src={RatingIcon} alt="rating" className="w-8 h-8" />
    //           <img src={RatingHalff} alt="rating" className="w-8 h-8" />
    //         </div>
    //         <p className="text-white line-clamp-5">
    //           Được sự giúp đỡ của bạn bè, Simba lẻn qua lũ linh cẩu ở Pride Rock
    //           và đối mặt với Scar, kẻ chế nhạo Simba về vai trò được cho là của
    //           hắn trong cái chết của Mufasa. Sau đó, Scar thì thầm với Simba
    //           rằng hắn, Scar, đã giết Mufasa. Tức giận, Simba trả đũa và buộc
    //           Scar phải thú nhận sự thật với bầy linh cẩu. Một trận chiến xảy ra
    //           giữa Simba và đồng minh của hắn và bầy linh cẩu. Scar cố gắng trốn
    //           thoát, nhưng bị Simba dồn vào chân tường tại một mỏm đá gần đỉnh
    //           Pride Rock. Scar cầu xin lòng thương xót và đổ lỗi cho lũ linh
    //           cẩu. Simba tha mạng cho Scar nhưng ra lệnh cho hắn rời khỏi Pride
    //           Lands mãi mãi; Scar từ chối và tấn công Simba. Sau một trận chiến
    //           ngắn, Simba ném Scar khỏi mỏm đá. Scar sống sót sau cú ngã, nhưng
    //           lũ linh cẩu, những kẻ nghe thấy hắn phản bội chúng, đã tấn công và
    //           xé xác hắn đến chết. Sau khi Scar và bầy linh cẩu biến mất, Simba
    //           lên ngôi vua, và Nala trở thành hoàng hậu. Với vùng đất Pride được
    //           phục hồi, Rafiki tặng đứa con mới sinh của Simba và Nala cho các
    //           loài động vật tụ tập, do đó tiếp tục vòng tuần hoàn của cuộc sống.
    //         </p>
    //         <div className="flex items-center space-x-4">
    //           <button className="p-3 text-white bg-black font-bold text-sm">
    //             Chi tiết
    //           </button>
    //           <Link to={"/buytickets"} className="p-3 text-white bg-red-500 font-bold text-sm">
    //             Book Ticket
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-[50%] flex items-center justify-center">
    //       <div className="w-[300px] h-[500px] relative group cursor-pointer">
    //         <img
    //           src={Img}
    //           alt="lionking"
    //           className="w-full h-full object-cover"
    //         />
    //         <div
    //           className="w-full h-full absolute top-0 left-0 flex items-center
    //             justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100
    //             transition-opacity duration-500 esse-in-out"
    //         >
    //           <img src={Iconplay} alt="play" className="w-16 h-16" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Banner;
