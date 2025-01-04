import Navbar from "./Navbar";

function About(){
  return(
<div class="min-h-screen bg-gray-100 py-12">
  <Navbar/>
  <div class="container mx-auto px-4 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-800">About Us</h1>
      <p class="mt-4 text-lg text-gray-600">
        Discover who we are and what drives us to provide exceptional services and solutions.
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div class="overflow-hidden rounded-lg shadow-lg">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/028/340/402/small_2x/green-leaves-natural-green-leaves-plants-using-as-spring-background-cover-page-greenery-environment-ecology-wallpaper-generative-ai-photo.jpeg"
          alt="About Us Image"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="text-gray-700 space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Our Mission</h2>
        <p>
          At GreenLife, our mission is to empower individuals and organizations through
          cutting-edge solutions. We aim to deliver products and services that enhance efficiency
          and foster growth.
        </p>
        <h2 class="text-2xl font-bold text-gray-800">Our Values</h2>
        <p>
          Integrity, innovation, and customer-centricity are the core values that drive every
          decision we make. We are committed to excellence and dedicated to exceeding expectations.
        </p>
        <a
          href="/contact"
          class="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Contact Us
        </a>
      </div>
    </div>
    <div class="mt-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <h3 class="mt-4 text-lg font-medium text-gray-800">Karthika Movva</h3>
          <p class="text-gray-500 text-sm">Lead Developer</p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
export default About;

