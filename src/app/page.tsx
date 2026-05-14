'use client';

import Image from 'next/image';
import { ReactTyped } from 'react-typed';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductDisplay from "./components/ProductDisplay/page";
import Explore from "./components/ProductDisplay/Explore/page";
import Banners1 from './components/Banners1/page';
import Card from '../app/components/Card/page';
import Orthogi from '../app/components/Orthogi/page';
export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, email, subject, message };
    console.log(data)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        alert('✨ Your wellness journey begins! Our Ayurvedic expert will contact you soon.');
        setName('');
        setEmail('');
        setSubject('')
        setMessage('');
        console.log(response)
        return
      }
    } catch (error) {
      alert("Something went wrong while submitting.");
    }
  }
  
  // const productList = [
  //   { name: 'Amrit Rasayana', icon: 'https://bharaticomputers.com/riyanshmultitrade/images/resource/products/104.jpg', desc: 'Immunity Booster', price: '₹499' },
  //   { name: 'Diabo Care', icon: '/images/riyansh-diabo.webp', desc: 'Sugar Balance Support', price: '₹599' },
  //   { name: 'Ashwagandha Gold', icon: '/images/OIP.webp', desc: 'Stress & Vitality', price: '₹449' },
  //   { name: 'Triphala Detox', icon: '/images/riyansh-amrit-juice.webp', desc: 'Digestive Wellness', price: '₹399' },
  //   { name: 'Neem Tulsi', icon: 'https://bharaticomputers.com/riyanshmultitrade/images/resource/products/104.jpg', desc: 'Skin & Immunity', price: '₹349' },
  //   { name: 'Brahmi Brain', icon: '/images/ASAS.avif', desc: 'Mental Clarity', price: '₹549' },
  //   { name: 'Shilajit Resin', icon: '/images/riyansh-diabo.webp', desc: 'Energy & Stamina', price: '₹899' },
  //   { name: 'Giloy Juice', icon: '/images/riyansh-amrit-juice.webp', desc: 'Fever & Immunity', price: '₹449' },
  // ];

  return (
    <main className="font-poppins scroll-smooth bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-emerald-900 min-h-screen">
      {/* Navbar - Luxurious Ayurvedic with Mobile Menu */}
      <nav
        className={`fixed w-full z-[999] py-3 md:py-4 px-4 transition-all duration-500 ${
          isSticky ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-emerald-200' : 'bg-gradient-to-r from-emerald-900/10 to-emerald-800/5 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <div className="text-xl md:text-4xl font-extrabold tracking-wide">
                <span className="bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">ArogyaMitra</span>
                <span className="text-emerald-700 text-sm md:text-xl"></span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 lg:gap-8 font-medium tracking-wide">
              {['home', 'about', 'products', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item}`}
                    className="capitalize relative group text-emerald-800 hover:text-emerald-600 transition-colors duration-200 font-semibold text-sm lg:text-base"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-600 transition-all group-hover:w-full duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Admin Button */}
            <Link
              href="/adminlayout"
              className="hidden md:inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Admin Portal
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-emerald-800 focus:outline-none z-50 relative"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-6 h-0.5 bg-emerald-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-emerald-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-emerald-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <motion.div
            initial={false}
            animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {['home', 'about', 'products', 'gallery', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-4 text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors capitalize font-semibold"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/adminlayout"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-center font-semibold mt-2"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Home Section - Luxurious Ayurvedic Welcome */}
      <section
        id="home"
        className="flex scroll-mt-16 items-center min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-amber-50 text-center pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center items-center mb-4 md:mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full blur-3xl opacity-20"></div>
                <Image
                  className='relative z-10'
                  src="/images/abc.png"
                  alt="Riyansh Ayurvedic Logo"
                  width={180}
                  height={180}
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-lg sm:text-2xl text-emerald-800 mb-2 drop-shadow-md"
            >
              Welcome to the World of
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold mt-2 bg-gradient-to-r from-emerald-900 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg px-2"
            >
              Riyansh Multitrade
            </motion.h2>

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="text-xl sm:text-3xl mt-4 md:mt-6 text-emerald-800 font-medium px-2"
            >
              Your Trusted{' '}
              <span className="text-emerald-600 font-bold block sm:inline">
                <ReactTyped
                  strings={['AYURVEDIC HEALTH ADVISOR', 'WELLNESS GUIDE', 'HOLISTIC HEALING EXPERT']}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                />
              </span>
            </motion.h3>
            
            <div className="mt-8 md:mt-12">
              <ProductDisplay />
        
            </div>
            <div className="mt-6">
              <Explore />
              <Orthogi/>
            </div>
            <div className="mt-6">
              {/* <Banners1 /> */}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="mt-8 md:mt-12"
            >
              <Link
                href="#contact"
                className="inline-block px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                Begin Your Wellness Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

     
      {/* Products Section - Luxurious Ayurvedic Products */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        id="products"
        className="max-w-7xl mx-auto bg-white text-center py-12 md:py-20 px-4 md:px-6"
      >
        <Card/>
      </motion.div>

      {/* Gallery Section Placeholder */}
      <section id="gallery" className="py-12 md:py-16 bg-gradient-to-br from-emerald-100 to-amber-50">
        {/* <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-900 mb-2 md:mb-4">Our Gallery</h2>
          <p className="text-center text-emerald-600 mb-8 md:mb-12 text-base md:text-lg">Discover the essence of Ayurvedic luxury</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="relative group overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={`/images/ASAS.avif`}
                  alt={`Gallery image ${item}`}
                  width={400}
                  height={300}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="text-white font-semibold">Ayurvedic Wellness</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <Banners1 />
      </section>
       {/* About Section - Luxurious Ayurvedic Heritage */}
       <motion.section
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        id="about"
        className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 py-16 md:py-24 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-amber-400 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 md:w-80 md:h-80 rounded-full bg-emerald-400 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold text-amber-300 tracking-wide">
              About Riyansh
            </h2>
            <p className="text-emerald-200 mt-2 md:mt-3 text-base md:text-lg">
              Experience the elegance of natural healing
            </p>
            <div className="w-20 h-1 md:w-24 bg-gradient-to-r from-amber-400 to-emerald-400 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="md:w-1/3 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group max-w-sm mx-auto md:mx-0">
                <Image
                  src="/images/ASAS.avif"
                  alt="Riyansh Multitrade Ayurvedic Products"
                  width={350}

                  height={350}
                  className="rounded-2xl shadow-2xl object-cover border-4 border-amber-400/50 group-hover:scale-105 transition duration-500 w-full"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </div>
            </motion.div>

            <div className="md:w-2/3 text-emerald-100">
              <motion.p
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-base md:text-lg leading-relaxed mb-4 md:mb-6"
              >
                <span className="font-semibold text-amber-300 text-lg md:text-xl">
                  Riyansh Multitrade Pvt. Ltd.
                </span>{" "}
                is a premium Ayurvedic wellness company dedicated to bringing the
                timeless wisdom of nature into modern lifestyles. We blend ancient Vedic knowledge with contemporary quality standards.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-sm leading-relaxed">
                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-xl transition border border-amber-400/30">
                  <div className="text-xl md:text-2xl mb-2">🌿</div>
                  <span className="font-semibold text-amber-300 text-sm md:text-base">Natural Ingredients:</span>
                  <p className="mt-1 text-emerald-100 text-xs md:text-sm">
                    Crafted using authentic herbs rooted in 5000-year-old Ayurvedic traditions.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-xl transition border border-amber-400/30">
                  <div className="text-xl md:text-2xl mb-2">💊</div>
                  <span className="font-semibold text-amber-300 text-sm md:text-base">Health Focus:</span>
                  <p className="mt-1 text-emerald-100 text-xs md:text-sm">
                    Enhances immunity, promotes holistic well-being, and restores body balance.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-xl transition border border-amber-400/30">
                  <div className="text-xl md:text-2xl mb-2">⚗️</div>
                  <span className="font-semibold text-amber-300 text-sm md:text-base">Modern Science:</span>
                  <p className="mt-1 text-emerald-100 text-xs md:text-sm">
                    Combines ancient knowledge with modern quality standards and lab testing.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-xl transition border border-amber-400/30">
                  <div className="text-xl md:text-2xl mb-2">🎯</div>
                  <span className="font-semibold text-amber-300 text-sm md:text-base">Our Mission:</span>
                  <p className="mt-1 text-emerald-100 text-xs md:text-sm">
                    Making authentic Ayurvedic wellness accessible to every household.
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-10 text-center md:text-left">
                <Link
                  href="#products"
                  className="inline-block px-6 md:px-10 py-2 md:py-3 bg-amber-500 text-emerald-900 font-semibold rounded-full shadow-lg hover:bg-amber-400 hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  Explore Our Products →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section> 


      {/* Contact Section - Luxurious Consultation */}
      <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-emerald-900 to-emerald-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: false }}
            className="text-3xl md:text-4xl font-bold text-center text-amber-300 mb-2"
          >
            Begin Your Ayurvedic Journey
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: false }}
            className="block text-xs md:text-sm text-center text-emerald-200 mb-8 md:mb-12"
          >
            Consult with our Ayurvedic Health Expert
          </motion.span>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="lg:w-1/2"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-amber-300 mb-3 md:mb-4">Get in Touch</h3>
              <p className="text-emerald-100 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Connect with Anil Banjara, your dedicated Ayurvedic Health Advisor, for personalized guidance on choosing authentic products tailored to your unique constitution and wellness goals.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-amber-300 text-sm md:text-base">Wellness Advisor</div>
                    <div className="text-emerald-100 text-xs md:text-sm">Anil Banjara</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-amber-300 text-sm md:text-base">Corporate Address</div>
                    <div className="text-emerald-100 text-xs md:text-sm">At post Tonde, Tal Shirpur, Dist Dhule, Maharashtra</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-amber-300 text-sm md:text-base">Email</div>
                    <div className="text-emerald-100 text-xs md:text-sm break-all">anilba3636@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-amber-300 text-sm md:text-base">WhatsApp / Call</div>
                    <div className="text-emerald-100 text-xs md:text-sm">+91 87883 11185</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="lg:w-1/2 bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-2xl p-4 md:p-6 shadow-2xl border border-amber-400/30"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-amber-300 mb-4 text-center">Free Wellness Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 md:p-3 border- bg-white/10 text-white border-amber-400/50 rounded-xl focus:outline-none focus:border-amber-400 placeholder:text-emerald-200 text-sm md:text-base"
                  />
                  <input
                    type="email"
                    placeholder="email "
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 md:p-3 border-2 bg-white/10 text-white border-amber-400/50 rounded-xl focus:outline-none focus:border-amber-400 placeholder:text-emerald-200 text-sm md:text-base"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject (e.g., Immunity, Diabetes, Stress, Digestion)"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 md:p-3 border-2 bg-white/10 text-white border-amber-400/50 rounded-xl focus:outline-none focus:border-amber-400 placeholder:text-emerald-200 text-sm md:text-base"
                />

                <textarea
                  placeholder="tell me our address and Mobile N0."
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 md:p-3 border-2 bg-white/10 text-white border-amber-400/50 rounded-xl resize-none focus:outline-none focus:border-amber-400 placeholder:text-emerald-200 text-sm md:text-base"
                ></textarea>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-amber-500 text-emerald-900 px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold shadow-lg hover:bg-amber-400 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                  >
                    Send Wellness Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <Link href="#home">
          <div className="bg-emerald-600 hover:bg-emerald-500 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all hover:scale-110">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-300 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          {/* <p className="text-xs md:text-sm">© 2026 Riyansh Multitrade Pvt. Ltd. All rights reserved. | Ancient Wisdom for Modern Wellness</p> */}
        </div>
      </footer>
    </main>
  );
}