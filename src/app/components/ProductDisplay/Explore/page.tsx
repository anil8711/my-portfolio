export default function RiyanshDaiboGJuiceBanner() {
  const benefits = [
    "डायबिटीज के मरीजों के लिए अत्यंत लाभदायक गुणकारी",
    "टाइप 2 डायबिटीज मरीजों के लिए बेहद",
    "रक्त में शुगर लेवल को कम करता है।",
    "शरीर में इंसुलिन उत्पादन को नियंत्रित करता है।",
    "कोलेस्ट्रॉल लेवल को कम करता है",
    "रोग प्रतिरोधक क्षमता को बढ़ाता है।",
    "रक्त शोधक",
    "मीठा खाने की तलब को कम करता है।",
    "पाचन शक्ति को बढ़ाता है",
    "वजन को नियंत्रित करता है।",
  ];

  const directions = [
    "अच्छी तरह हिलाएं और ढक्कन खोलें",
    "पानी में 30 मिली रस डालें",
    "चम्मच से अच्छी तरह मिलाएं",
    "आपका जूस पीने के लिए तैयार है",
    "रोजाना खाली पेट दो बार पिएं",
  ];

  return (
    <div className="w-full bg-[#e9e9e9] overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="bg-[#1f56a8] py-4 px-6 md:px-12">
        <h1 className="text-white text-3xl md:text-6xl font-extrabold tracking-wide text-center uppercase font-serif">
          RIYANSH DAIBO-G JUICE
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-10 items-start">
        {/* Left Section */}
        <div>
          <div className="inline-block bg-[#a7c520] text-black px-6 py-2 rounded-full font-bold text-2xl mb-5 shadow-md">
            उपयोगिताएं -
          </div>

          <ul className="space-y-2 text-[18px] md:text-[21px] font-semibold text-gray-900 leading-relaxed">
            {benefits.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-600 text-2xl leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Certified Badge */}
          <div className="mt-10 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full border-[10px] border-yellow-400 bg-gradient-to-br from-yellow-100 to-white shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-green-700 text-sm font-bold uppercase tracking-wide">
                    AYUSH
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    Premium
                  </div>
                </div>
              </div>
              <p className="mt-3 text-3xl font-serif text-[#2b2b87] font-semibold">
                Certified
              </p>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center justify-start pt-4">
          <h2 className="text-red-600 text-3xl md:text-5xl font-extrabold text-center leading-tight">
            प्राकृतिक एवं अद्भुत गुणकारी
            <br />
            17 जड़ी बूटियों से निर्मित
          </h2>

          {/* Directions Card */}
          <div className="mt-10 w-full max-w-md rounded-[28px] overflow-hidden border-2 border-fuchsia-600 bg-white shadow-xl">
            <div className="bg-fuchsia-700 text-white text-3xl font-bold px-6 py-3">
              Direction For Use
            </div>

            <div className="p-6 space-y-4">
              {directions.map((item, index) => (
                <div key={index} className="flex items-start gap-4 text-[18px] md:text-[20px] font-semibold text-gray-800">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 border border-gray-300 flex items-center justify-center text-sm font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end items-end">
          <div className="relative flex items-end gap-4">
            {/* Box */}
            <div className="w-44 h-[420px] bg-gradient-to-b from-lime-200 to-green-100 border-4 border-yellow-400 rounded-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-yellow-400 h-8"></div>

              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-green-500 mb-4"></div>

                <div className="text-green-700 font-bold text-xl uppercase">
                  DAIBO-G
                </div>

                <div className="text-red-500 text-lg font-bold mt-1">
                  RAS
                </div>

                <div className="mt-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-green-300 mx-auto"></div>
                  <div className="w-12 h-12 rounded-full bg-yellow-300 mx-auto"></div>
                  <div className="w-12 h-12 rounded-full bg-lime-400 mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Bottle */}
            <div className="w-32 h-[380px] bg-gradient-to-b from-green-700 to-green-900 rounded-[40px] relative shadow-2xl border-4 border-green-800">
              {/* Cap */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-12 bg-green-700 rounded-t-xl border-4 border-green-900"></div>

              {/* Label */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-48 bg-white rounded-2xl flex flex-col items-center justify-center p-2 shadow-lg">
                <div className="w-14 h-14 rounded-full border-4 border-green-500"></div>
                <div className="text-red-600 font-extrabold text-lg mt-3 text-center leading-tight">
                  DAIBO-G
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-400"></div>
                  <div className="w-5 h-5 rounded-full bg-yellow-300"></div>
                  <div className="w-5 h-5 rounded-full bg-lime-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
