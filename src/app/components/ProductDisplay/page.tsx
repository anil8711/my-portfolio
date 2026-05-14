"use client";

import Image from "next/image";

export default function AmritJuiceLuxury() {
  const benefits = [
    "प्राकृतिक एवं दुर्लभ 42 जड़ी-बूटियों से निर्मित",
    "शरीर को शुद्ध एवं सक्रिय बनाने में सहायक",
    "टॉक्सिन्स हटाने में मददगार",
    "रोग प्रतिरोधक क्षमता बढ़ाने में सहायक",
    "संधिवात, मधुमेह एवं रक्तचाप में लाभकारी",
    "अस्थमा, अपच एवं कब्ज में सहायक",
    "किडनी एवं हृदय स्वास्थ्य के लिए उपयोगी",
    "मानसिक तनाव एवं मोटापा नियंत्रित करे",
    "स्मरण शक्ति व पाचन शक्ति बढ़ाए",
    "बालों को झड़ने से रोकने में सहायक",
    "ऊर्जा एवं ताकत प्रदान करे",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f5e9] via-[#efe5cb] to-[#faf7ee] py-12 px-4 md:px-8">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto rounded-[35px] overflow-hidden border border-[#dccb9e] bg-white/70 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.12)]">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f5132] via-[#176b47] to-[#0f5132] py-6 px-6 text-center">

          <p className="text-[#f5d98b] uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-2">
            Ayurvedic Wellness Formula
          </p>

          <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide">
            RIYANSH AMRIT JUICE
          </h1>

          <p className="text-[#f5e7b2] mt-2 text-sm md:text-lg">
            Premium Herbal Immunity & Detox Juice
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-5 md:p-10 items-center">

          {/* LEFT */}
          <div className="space-y-5">

            {/* Intro Card */}
            <div className="bg-gradient-to-br from-[#0f5132] to-[#176b47] text-white rounded-[28px] p-6 shadow-2xl border border-[#2d7a57]">

              <p className="text-[13px] md:text-[15px] leading-relaxed">
                हम बीमारी के लिए नहीं देते,
                <br />
                <span className="text-[#f5d98b] font-bold text-lg">
                  बीमार ना होने के लिए देते हैं।
                </span>
                <br /><br />

                <span className="font-bold text-[#f5d98b]">
                  रियांश अमृत जूस
                </span>{" "}
                शरीर की कोशिकाओं को सक्रिय कर शरीर को शुद्ध बनाने में सहायक है।

                <br /><br />

                इसमें प्राकृतिक एवं दुर्लभ 42 जड़ी-बूटियों का अर्क मौजूद है
                जो शरीर के टॉक्सिन्स हटाने में मदद करता है।
              </p>
            </div>

            {/* Quote Box */}
            <div className="rounded-[28px] bg-gradient-to-r from-[#c59a43] to-[#f2d28a] p-5 text-center shadow-xl border border-[#d6b26b]">

              <h2 className="text-[#2b2b2b] text-2xl md:text-3xl font-extrabold leading-tight">
                बीमारियां अनेक,
                <br />
                इलाज सिर्फ एक
              </h2>
            </div>

            {/* Direction Box */}
            <div className="bg-white/70 backdrop-blur-xl border border-[#ead9b4] rounded-[28px] overflow-hidden shadow-xl">

              <div className="bg-gradient-to-r from-[#8a5a14] to-[#c69a3a] text-white px-5 py-3 text-lg font-bold">
                Direction For Use
              </div>

              <div className="p-5">

                <p className="text-[13px] md:text-[15px] text-[#333] leading-relaxed font-medium">
                  15–15 ml सुबह और शाम
                  <br />
                  भोजन से एक घंटा पहले
                  <br />
                  200 ml गुनगुने पानी के साथ
                  <br />
                  कांच के ग्लास में सेवन करें।
                </p>

                <p className="text-xs text-gray-500 mt-3 italic">
                  (या चिकित्सक के निर्देशानुसार सेवन करें)
                </p>
              </div>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center relative">

            {/* Glow */}
            <div className="absolute w-[320px] h-[320px] bg-[#d4b06a]/30 blur-3xl rounded-full"></div>

            <Image
              src="/images/riyansh juice.jpg"
              alt="Riyansh Amrit Juice"
              width={420}
              height={620}
              priority
              className="relative z-10 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)] hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* Benefits */}
            <div>

              <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-[#c8a85f] to-[#e8d39c] shadow-lg mb-5">
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

                    <span className="text-[13px] md:text-[15px] font-medium text-[#2f2f2f] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight */}
            <div className="rounded-full bg-gradient-to-r from-[#a70d0d] to-[#e53935] px-6 py-5 text-center text-white shadow-2xl border border-red-300">

              <p className="text-lg md:text-2xl font-extrabold leading-tight">
                करोड़ों भारतीयों की
                <br />
                नंबर 1 पसंद
              </p>
            </div>

            {/* AYUSH Badge */}
            <div className="flex justify-center">

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

            {/* CTA */}
            <div className="flex justify-center">

              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#176b47] to-[#0f5132] text-white text-sm md:text-base font-bold shadow-xl hover:scale-105 transition duration-300">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}