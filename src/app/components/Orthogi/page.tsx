import Image from "next/image";

export default function RiyanshArthoGCapsuleBanner() {
  const benefits = [
    "गठिया रोग में अत्यंत लाभकारी",
    "जोड़ों के दर्द, जोड़ों में सूजन और अकड़न को दूर करे",
    "मांसपेशियों के दर्द ऐंठन को दूर करे प्रभावशाली दर्द निवारक",
    "रूमेटाइड अर्थराइटिस में अत्यंत लाभदयक",
    "हड्डियों को मजबूत बनाए",
    "हड्डियों को जोड़ने में सहायक",
    "चोट, मोच के दर्द में असरदार",
    "कमर दर्द, घुटनों के दर्द में अत्यंत लाभदायक",
    "शरीर के दर्द को दूर करके ताकत प्रदान करे",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f3e8] via-[#efe4c8] to-[#f7f1df] py-16 px-4 md:px-10">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden border border-[#d8c59d] shadow-[0_20px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl bg-white/70">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f5132] via-[#176b47] to-[#0f5132] py-8 px-6 text-center relative">
          
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover"></div>

          <p className="text-[#f5d98b] tracking-[6px] uppercase text-sm md:text-lg font-semibold mb-2">
            Ayurvedic Wellness Formula
          </p>

          <h1 className="text-white text-4xl md:text-7xl font-extrabold leading-tight tracking-wide">
            RIYANSH ARTHO-G
          </h1>

          <p className="text-[#f5e7b2] text-lg md:text-2xl mt-3 font-medium">
            Premium Herbal Joint Care Capsules
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 md:p-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center bg-gradient-to-r from-[#c6a664] to-[#e6cc8f] text-[#2d2d2d] px-8 py-3 rounded-full shadow-lg mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                उपयोगिताएँ
              </h2>
            </div>

            <ul className="space-y-5">
              {benefits.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-[#ead9b4] shadow-sm hover:shadow-lg transition"
                >
                  <span className="text-[#176b47] text-2xl">✦</span>

                  <span className="text-[18px] md:text-[20px] font-medium text-[#2f2f2f] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">

            <div className="bg-white/70 backdrop-blur-xl border border-[#ead9b4] rounded-[30px] p-8 shadow-2xl">
              
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#0f5132]">
                प्राकृतिक गुणों से भरपूर
              </h2>

              <p className="mt-4 text-lg text-[#5b5b5b] leading-relaxed">
                जोड़ों, हड्डियों और मांसपेशियों के लिए
                शक्तिशाली आयुर्वेदिक समाधान
              </p>

              {/* Direction Box */}
              <div className="mt-8 bg-gradient-to-br from-[#fff8ea] to-[#f3e5c2] rounded-3xl overflow-hidden border border-[#d8c59d] shadow-lg">
                
                <div className="bg-gradient-to-r from-[#8a5a14] to-[#c69a3a] text-white py-4 px-6 text-2xl font-bold">
                  Direction For Use
                </div>

                <div className="p-6 text-[#2d2d2d] space-y-3">
                  <p className="text-2xl font-bold">
                    1–1 Capsule Morning & Evening
                  </p>

                  <p className="text-lg">
                    भोजन के बाद दूध / गुनगुने पानी के साथ
                  </p>

                  <p className="text-sm text-gray-600 italic">
                    (या चिकित्सक के निर्देशानुसार सेवन करें)
                  </p>
                </div>
              </div>
            </div>

            {/* Certified Badge */}
            <div className="mt-10 flex flex-col items-center">
              
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#f8e7b2] via-[#d8b46a] to-[#b98b2f] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border-[6px] border-[#f2d38b]">
                  
                  <span className="text-[#176b47] text-sm tracking-[4px] font-bold uppercase">
                    AYUSH
                  </span>

                  <span className="text-[#8a5a14] text-2xl font-extrabold mt-1">
                    Certified
                  </span>

                  <span className="text-xs text-gray-500 mt-1">
                    Premium Quality
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center relative">

            {/* Glow */}
            <div className="absolute w-[400px] h-[400px] bg-[#d4b06a]/30 blur-3xl rounded-full"></div>

            <Image
              src="/images/riyansh artho.webp"
              alt="Riyansh Artho-G Capsule"
              width={650}
              height={750}
              priority
              className="relative z-10 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)] hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}