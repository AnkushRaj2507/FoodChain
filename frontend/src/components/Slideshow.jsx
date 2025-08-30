import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        <div className="w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1644822861306-55353baefb98?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZCUyMGRvbmF0aW9ufGVufDB8MnwwfHx8MA%3D%3D"
            alt="1"
            className="w-full h-full bg-cover bg-center rounded-2xl"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1610064094685-2015f42d8586?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGRvbmF0aW9ufGVufDB8MnwwfHx8MA%3D%3D"
            alt="2"
            className="w-full h-full bg-cover bg-center rounded-2xl"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1707635569223-c759b3b0501b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2QlMjBkb25hdGlvbnxlbnwwfDJ8MHx8fDA%3D"
            alt="3"
            className="w-full h-full bg-cover bg-center object-cover rounded-2xl"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Slideshow;
