import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaLeaf, FaTree, FaSeedling, FaRecycle } from 'react-icons/fa';


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
    img: "https://cdn.shopify.com/s/files/1/0598/1444/5195/files/image_y9p.webp?v=1710859897",
    name: "GEnglish ivy"
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

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Icon className="text-4xl text-green-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Main() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-20 w-full">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Bring Nature Home with GreenLife</h1>
              <p className="text-xl mb-6">Transform your space with beautiful plants and trees. Promote a greener lifestyle, one plant at a time.</p>
              <Link to="/order">
                <button className="bg-yellow-400 text-green-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300">
                  Start Planting Now!
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.pexels.com/photos/64221/flower-sunflower-karnataka-india-64221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Beautiful home garden" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-2xl" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-500">Why Choose GreenLife?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={FaLeaf}
                title="Wide Variety"
                description="Choose from a vast selection of indoor and outdoor plants."
              />
              <FeatureCard
                icon={FaTree}
                title="Expert Advice"
                description="Get guidance from our plant care specialists."
              />
              <FeatureCard
                icon={FaSeedling}
                title="Easy Care"
                description="We provide care instructions for every plant."
              />
              <FeatureCard
                icon={FaRecycle}
                title="Eco-Friendly"
                description="All our products and packaging are environmentally friendly."
              />
            </div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="py-20 bg-green-300">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Popular Plants</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {features.map((item, index) => (
                <img 
                  key={index}
                  src={item.img} 
                  alt={item.name}
                  className="w-72 h-48 object-cover rounded-lg shadow-md flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Green Up Your Space?</h2>
            <p className="text-xl mb-8">Join GreenLife today and start your journey towards a greener home and lifestyle.</p>
            <Link to="/order">
              <button className="bg-yellow-400 text-green-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 GreenLife. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;