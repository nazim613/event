// pages/index.js
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const services = [
    {
      title: "Venue Selection",
      description: "Find the perfect wedding venue that matches your vision and budget",
      icon: "🏛️"
    },
    {
      title: "Wedding Planning",
      description: "End-to-end wedding planning with attention to every detail",
      icon: "📋"
    },
    {
      title: "Catering Services",
      description: "Exquisite menus tailored to your preferences and dietary needs",
      icon: "🍽️"
    },
    {
      title: "Decor & Styling",
      description: "Transform your venue into a magical space with our design expertise",
      icon: "💐"
    }
  ];

  const testimonials = [
    {
      name: "Sarah & Michael",
      text: "Our wedding was absolutely perfect! The team handled everything flawlessly.",
      date: "June 2023"
    },
    {
      name: "Priya & Raj",
      text: "Exceeded all our expectations. Every detail was thoughtfully executed.",
      date: "April 2023"
    },
    {
      name: "Emma & James",
      text: "Stress-free planning experience. Professional and creative team!",
      date: "February 2023"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Events - Premium Wedding Planning</title>
        <meta name="description" content="Creating unforgettable wedding experiences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-rose-600">Events</div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-rose-600 transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-rose-600 transition">Services</a>
            <a href="#" className="text-gray-700 hover:text-rose-600 transition">Gallery</a>
            <a href="#" className="text-gray-700 hover:text-rose-600 transition">About</a>
            <a href="#" className="text-gray-700 hover:text-rose-600 transition">Contact</a>
          </div>
          
          <button className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Crafting Your <span className="text-rose-600">Dream Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Professional wedding planning that turns your vision into reality with elegance and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-rose-700 transition">
                Book Consultation
              </button>
              <button className="border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-rose-50 transition">
                View Gallery
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-rose-200 rounded-2xl transform rotate-6"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Schedule a free consultation with our wedding experts today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition">
              Book Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-rose-400 mb-4">Events</h3>
              <p className="text-gray-400">
                Creating magical wedding experiences since 2010
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Gallery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Full Planning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Partial Planning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Day-of Coordination</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Destination Weddings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Wedding Avenue</p>
                <p>Bridal City, WC 10001</p>
                <p className="mt-2">info@blissfulunions.com</p>
                <p>(123) 456-7890</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}