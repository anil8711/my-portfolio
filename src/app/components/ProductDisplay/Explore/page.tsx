import Image from "next/image";

export default function RiyanshDaiboGJuiceBanner() {
  const benefits = [
    "डायबिटीज के मरीजों के लिए अत्यंत लाभदायक",
    "टाइप 2 डायबिटीज में लाभकारी",
    "रक्त में शुगर लेवल नियंत्रित करे",
    "इंसुलिन उत्पादन को संतुलित करे",
    "कोलेस्ट्रॉल लेवल कम करने में सहायक",
    "रोग प्रतिरोधक क्षमता बढ़ाए",
    "रक्त शोधक",
    "मीठा खाने की तलब कम करे",
    "पाचन शक्ति बढ़ाए",
    "वजन नियंत्रित रखने में सहायक",
  ];

  const directions = [
    "अच्छी तरह हिलाएं",
    "30ml रस पानी में मिलाएं",
    "चम्मच से अच्छी तरह मिलाएं",
    "जूस पीने के लिए तैयार है",
    "खाली पेट दिन में दो बार सेवन करें",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f4e8] via-[#efe6cb] to-[#f9f6ed] py-12 px-4 md:px-8">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto rounded-[35px] overflow-hidden border border-[#dccb9e] bg-white/70 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.12)]">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f5132] via-[#176b47] to-[#0f5132] py-6 px-6 text-center relative">

          <p className="text-[#f6d78b] uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-2">
            Ayurvedic Wellness Juice
          </p>

          <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide">
            RIYANSH DAIBO-G JUICE
          </h1>

          <p className="text-[#f5e7b2] mt-2 text-sm md:text-lg">
            Premium Ayurvedic Diabetes Care Formula
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-5 md:p-10 items-center">

          {/* Left */}
          <div>

            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-[#c8a85f] to-[#e8d39c] shadow-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#2b2b2b]">
                उपयोगिताएं
              </h2>
            </div>

            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/60 border border-[#ead9b4] shadow-sm hover:shadow-md transition"
                >
                  <span className="text-[#176b47] text-lg mt-0.5">
                    ✦
                  </span>

                  <span className="text-[14px] md:text-[16px] font-medium text-[#2f2f2f] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* AYUSH Badge */}
            <div className="mt-8 flex justify-center">
              <div className="flex flex-col items-center">

                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f6e4aa] via-[#d9b466] to-[#b98c2f] p-2 shadow-2xl">

                  <div className="w-full h-full rounded-full bg-white border-[5px] border-[#f0d38c] flex flex-col items-center justify-center">

                    <span className="text-[#176b47] text-[10px] tracking-[3px] font-bold uppercase">
                      AYUSH
                    </span>

                    <span className="text-[#8a5a14] text-lg font-extrabold">
                      Certified
                    </span>

                    <span className="text-[9px] text-gray-500">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">

            <div className="bg-white/70 backdrop-blur-xl rounded-[28px] border border-[#ead9b4] shadow-2xl p-6 w-full">

              <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-[#0f5132]">
                प्राकृतिक एवं गुणकारी
              </h2>

              <p className="mt-3 text-sm md:text-base text-[#5f5f5f] leading-relaxed">
                17 आयुर्वेदिक जड़ी-बूटियों से निर्मित
                शक्तिशाली हेल्थ सपोर्ट जूस
              </p>

              {/* Direction Box */}
              <div className="mt-6 rounded-3xl overflow-hidden border border-[#d8c59d] bg-gradient-to-br from-[#fff8e8] to-[#f4e6c4] shadow-lg">

                <div className="bg-gradient-to-r from-[#8a5a14] to-[#c69a3a] text-white py-3 px-5 text-xl font-bold">
                  Direction For Use
                </div>

                <div className="p-5 space-y-4">
                  {directions.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-white border border-[#d8c59d] flex items-center justify-center text-xs font-bold text-[#176b47] shrink-0">
                        {index + 1}
                      </div>

                      <p className="text-[13px] md:text-[15px] font-medium text-[#333] leading-relaxed text-left">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#176b47] to-[#0f5132] text-white text-sm md:text-base font-bold shadow-xl hover:scale-105 transition duration-300">
                Order Now
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center relative">

            {/* Glow */}
            <div className="absolute w-[320px] h-[320px] bg-[#d4b06a]/30 blur-3xl rounded-full"></div>

            <Image
              src="/images/riyansh-diabo.webp"
              alt="Riyansh Daibo-G Juice"
              width={520}
              height={820}
              priority
              className="relative z-10 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.3)] hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}