import Slider from "react-slick";
import '../App.css';

const features = [
    {
      img: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/products/2020/3/11/8/rx_amazon_two-desert-rose-bonsai-plants.jpeg.rend.hgtvcom.616.462.suffix/1583956224724.jpeg",
      name: "Desert Rose"
    },
    {
      img: "https://nurserylive.com/cdn/shop/products/nurserylive-plants-bird-of-paradise-plant-16968640528524.jpg?v=1634214531",
      name: "bird of paradise"
    },
    {
      img: "https://m.media-amazon.com/images/I/61vzgIolFnS._AC_UF1000,1000_QL80_.jpg",
      name: "Aloe vera"
    },
    {
      img: "https://m.media-amazon.com/images/I/61qX+o5199L._AC_UF1000,1000_QL80_.jpg",
      name: "Hibiscus"
    },
    {
      img: "https://nouveauraw.com/wp-content/uploads/2020/01/Pothos-Golden-Pothos-plant-800-great-coloring.png",
      name: "Golden Pothos"
    },
    {
      img: "https://plantorbit.com/cdn/shop/files/English_Ivy.webp?v=1731067491",
      name: "English ivy"
    },
    {
      img: "https://nurserylive.com/cdn/shop/products/nurserylive-hardy-begonia-plant.jpg?v=1634223205",
      name: "Begonia"
    },
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2022/9/CU/SW/BG/159591572/boston-fern-indoor-plant-500x500.jpg",
      name: "Sward Fern"
    }
  ,
  {
      img: "https://www.rollingnature.com/cdn/shop/products/PLJDCEJRGL-W-Part1.jpg?v=1669452813&width=1946",
      name: "Jade Plant"
    },
    {
      img: "https://i.etsystatic.com/24507111/r/il/df79b3/3360985744/il_1080xN.3360985744_kho8.jpg",
      name: "String-of-Pearls"
    }
  ]
  

function PopularPlantsCarousel() {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {features.map((item, index) => (
        <div key={index} className="p-2">
          <img 
            src={item.img} 
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-center mt-2 text-green-700 font-bold">{item.name}</h3>
        </div>
      ))}
    </Slider>
  );
}
export default PopularPlantsCarousel;