'use client';

import Image from 'next/image';
import { ReactTyped } from 'react-typed';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';


export default function Home() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const services = [
  //   {
  //     icon: 'fas fa-paint-brush',
  //     title: 'Web Design',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quia sunt, quasi quo illo enim.',
  //   },
  //   {
  //     icon: 'fas fa-chart-line',
  //     title: 'Advertising',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quia sunt, quasi quo illo enim.',
  //   },
  //   {
  //     icon: 'fas fa-code',
  //     title: 'Apps Design',
  //     description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quia sunt, quasi quo illo enim.',
  //   },
  // ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);
  const next = () => setCurrentIndex((prev) => (prev + 1) % project.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + project.length) % project.length);

  const project = [
    { name: 'Ajay patil', img: '/images/ASAS.avif' },
    { name: 'Dilip chavan', img: '/images/ASAS.avif' },
    { name: 'Rohan patil', img: '/images/ASAS.avif' },
    { name: 'Rajesh koli', img: '/images/ASAS.avif' },
    { name: 'Akash rathod', img: '/images/ASAS.avif' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-6">
        <ul className="flex justify-center items-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="h-[13px] w-[13px] rounded-full border-2 border-crimson transition-all duration-300" />
    ),
  };
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
        alert('Contact created successfully')
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
  return (
    <main className="font-poppins scroll-smooth bg-primary text-white min-h-screen  ">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-[999] py-4 px-4 md:px-8 transition-all rounded-2xl duration-300 ${isSticky ? 'bg-secondary text-gray-950 shadow-lg' : 'bg-primary'
          } font-ubuntu`}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="  px-9 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-gray-900 tracking-wide">
            Portfo<span className="text-pink-400">lio.</span>
          </div>
          <ul className="hidden md:flex gap-4 font-medium tracking-wide">
            {['home', 'about', 'skills', 'Projects', 'contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item}`}
                  className="capitalize relative group hover:text-amber-300 transition-colors duration-200"
                >
                  {item}
                  <span className=" h-0.5 w-0 bg-crimson transition-all group-hover:w-full duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="flex scroll-mt-20 items-center  bg-cover bg-center bg-fixed text-center text-black font-ubuntu bg-secondary"
      >
        <div className="max-w-7xl mx-auto px-4 py-12 ">

          {/* Container animation */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Heading 1 */}
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl text-primary mb-2 mt-4 drop-shadow-md"
            >
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Image className='text-center'
                  src="/images/abc.png"
                  alt="Example"
                  width={250}
                  height={250}
                  priority
                />
              </motion.div>

              Hello, my name is
            </motion.h1>

            {/* Name */}
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl font-extrabold mt-2 text-primary drop-shadow-lg"
            >
              Anil Banjara
            </motion.h2>

            {/* Role with Typed effect */}
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-3xl mt-6 text-primary font-medium"
            >
              And I'm a{' '}
              <span className="text-crimson font-bold">
                <ReactTyped
                  strings={['Developer', 'Designer', 'Creator']}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                />
              </span>
            </motion.h3>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}

              className="mt-6"
            >
              <Link
                href="/#contact"
                className="inline-block px-8 py-3 bg-primary text-secondary font-semibold rounded-full shadow-md hover:bg-blue-300 transition-all duration-300"
              >
                Hire Me
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}

        id="about" className=" bg-secondary p-19">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="section-title text-4xl font-bold text-center text-primary mb-4">About Me</h2>
          <div className="flex flex-col md:flex-row items-center  animate-fade-douwn">
            <div className=" md:w-1/3">
              <Image
                src="/images/ASAS.avif"
                alt="ASAS"
                width={300}
                height={300}
                className="rounded-xl shadow-2xl object-cover border-4 border-black hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className=" md:w-1/2 text-primary">
              <h3 className="text-2xl font-semibold mb-2">
                I'm Anil Banjara and I'm a{' '}
                <span className="text-crimson font-bold">
                  <ReactTyped strings={['Web Developer', 'Designer', 'Creator']} typeSpeed={60} backSpeed={30} loop />
                </span>
              </h3>
              <div className="mb-6 text-justify space-y-4">
                <motion.p
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false }}
                >
                  Hi, I’m a <strong>MERN Stack Developer</strong> with hands-on experience building full-stack web applications using <strong>MongoDB</strong>, <strong>Express.js</strong>, <strong>React</strong>, and <strong>Node.js</strong>. specialize in crafting dynamic, scalable, and user-focused web solutions.
                </motion.p>
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="font-semibold"> Tech Stack:</motion.h3>
                  <ul className="list-disc list-inside">
                    <li><strong>Frontend:</strong> React.js (Hooks, Context API, Redux), Next.js, Tailwind CSS, Framer Motion</li>
                    <li><strong>Backend:</strong> Node.js, Express.js, RESTful APIs, JWT Authentication</li>
                    <li><strong>Database:</strong> MongoDB (Mongoose ODM)</li>
                    <li><strong>Tools & DevOps:</strong> Git, GitHub, Postman, Vercel, Netlify, MongoDB Atlas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold"> What I Can Do:</h3>
                  <motion.ul
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}

                    className="list-disc list-inside">
                    <li>Build fast and responsivefull-stack applications</li>
                    <li>Design REST APIs & integrate frontend/backend seamlessly</li>
                    <li>Implement secure authentication & authorization</li>
                    <li>Deploy and maintain projects on cloud platforms</li>
                  </motion.ul>
                </div>
              </div>
              <Link
                href="#"
                className="inline-block px-14 py-4 bg-crimson text-primary font-semibold rounded-full shadow hover:bg-blue-400 transition-all">
                Download
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        id="skills"
        className=" max-w-4xl mx-auto bg-secondary text-center p-20">
        <h2 className="text-3xl font-bold text-primary mb-6">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            {
              name: 'HTML5',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            },
            {
              name: 'CSS3',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            },
            {
              name: 'JavaScript',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            },
            {
              name: 'React.js',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            },
            {
              name: 'Next.js',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
            },
            {
              name: 'TailwindCSS',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
            },
            {
              name: 'Node.js',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            },
            {
              name: 'Git',
              icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            },
          ].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={48}
                height={48}
                className="mb-2"
              />
              <span className="text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        viewport={{ once: false }}
        id="Projects"
        className="bg-secondary text-primary py-20 font-poppins"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">My Projects</h2>

          <Slider {...settings}>
            {project.map((item, index) => (
              <div key={index} className="px-1">
                <div
                  onClick={() => openLightbox(index)}
                >
                  <div className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={200}
                      height={500}
                      className="rounded-4xl object-cover border-[4px] border-crimson hover:border-white"
                    />
                    {/* <h3 className="text-xl mt-4 text-white">{item.name}</h3> */}
                    {/* <p className="text-gray-300 text-sm mt-1">{item.desc}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className=" absolute top-23 right-1 text-black text-5xl font-bold hover:text-red-400"
            >           
              &times;
            </button>

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="relative max-w-4xl w-full text-center"
            >
              <Image
                src={project[currentIndex].img}
                alt={project[currentIndex].name}
                width={900}
                height={600}
                className="rounded-xl mx-auto max-h-[60vh] object-contain"
              />

              <h3 className="text-white text-2xl font-semibold mt-6">{project[currentIndex].name}</h3>
              {/*             <p className="text-gray-300 mt-2">{project[currentIndex].des}</p> */}

              {/* Arrows */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4 hover:text-crimson"
              >
                &#10094;
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4 hover:text-crimson"
              >
                &#10095;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section id="contact" className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: false }}
            className="text-4xl font-bold text-center text-primary mb-2"
          >
            Contact Me
          </motion.h2>

          {/* Subheading */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: false }}
            className="block text-sm text-center text-primary mb-12"
          >
            get in touch
          </motion.span>

          {/* Contact Columns */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="md:w-1/2"
            >
              <h3 className="text-2xl font-semibold  text-primary mb-4">Get in Touch</h3>
              <p className="text-primary mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you prefer reaching out through the form or directly via email, I’d love to hear from you.
              </p>

              <div className="space-y-6">
                {/* Name Row */}
                <div className="flex items-center">
                  <i className="fas fa-user text-gray-950 text-2xl mr-4"></i>
                  <div>
                    <div className="font-medium text-primary">Name</div>
                    <div className="text-gray-600">Anil Chavan</div>
                  </div>
                </div>

                {/* Address Row */}
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-950 text-2xl mr-4"></i>
                  <div>
                    <div className="font-medium text-primary">Address</div>
                    <div className="text-gray-600">At post tonde tel Shirpur Dist Dhule Maharastra</div>
                  </div>
                </div>

                {/* Email Row */}
                <div className="flex items-center">
                  <i className="fas fa-envelope text-gray-950 text-2xl mr-4"></i>
                  <div>
                    <div className="font-medium text-primary">Email</div>
                    <div className="text-gray-600">anilba3636@gmail.com</div>

                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone-alt text-gray-950 text-2xl mr-4"></i>
                  <div>
                    <div className="font-medium text-primary">Mobile No</div>
                    <div className="text-gray-600">8788311185</div>

                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
              </motion.div>

            </motion.div>

            {/* Right Column (Form) */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className="md:w-1/2 bg-gray-800 hover:bg-crimson transition-all duration-300 rounded-lg p-4 text-center"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">Message me</h3>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-1/2 p-3 border-2 bg-white text-black border-gray-950 rounded-md focus:outline-none focus:border-gray-950"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-1/2 p-3 border-2 bg-white text-black border-gray-950 rounded-md focus:outline-none focus:border-gray-400"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 mb-4 border-2 bg-white text-black border-gray-950 rounded-md focus:outline-none focus:border-gray-400"
                />

                <textarea
                  placeholder="Message..."
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 mb-4 border-2 bg-white text-black border-gray-950 rounded-md resize-none focus:outline-none focus:border-gray-400"
                ></textarea>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-3 rounded-md font-semibold border-2 border-crimson hover:bg-transparent hover:text-red-500 transition-all duration-300"
                  >
                    Send message
                  </button>

                </div>
              </form>
            </motion.div>
          </div>
        </div>
        <div className="sticky top-0 text-center z-50">
          <Link href="/#home">
            <Image
              src="/images/abct.png"
              width={200}
              height={200}
              alt="Animated ABCs"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </div>
      </section>

    </main>

  );
}
