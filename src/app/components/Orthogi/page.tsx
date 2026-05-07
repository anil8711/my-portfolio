import Image from "next/image";

export default function RiyanshArthoGCapsuleBanner() {
  const benefits = [
    "गठिया रोग में अत्यंत लाभकारी",
    "जोड़ों के दर्द, जोड़ों में सूजन और अकड़न को दूर करे",
    "मांसपेशियों के दर्द ऐंठन को दूर करे प्रभावशाली दर्द निवारक",
    "रूमेटाइड अर्थराइटिस (हाथों और पैरों की उंगली व कलाई में दर्द व सूजन) में अत्यंत लाभदयक",
    "हड्डियों को मजबूत बनाए",
    "हड्डियों को जोड़ने में सहायक",
    "चोट, मोच के दर्द में असरदार",
    "कमर दर्द, घुटनों के दर्द में अत्यंत लाभदायक",
    "शरीर के दर्द को दूर करके ताकत प्रदान करे",
  ];

  return (
    <div className="w-full bg-[#ececec] overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="bg-[#1f56a8] py-4 px-6 md:px-10">
        <h1 className="text-white text-3xl md:text-7xl font-extrabold uppercase text-center tracking-wide font-serif leading-none">
          RIYANSH ARTHO-G CAPSULE
        </h1>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-10 py-8 items-start">
        {/* Left Section */}
        <div>
          <div className="inline-block bg-[#b3cf18] rounded-r-full px-8 py-3 shadow-md mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              उपयोगिताएँ -
            </h2>
          </div>

          <ul className="space-y-3 text-[19px] md:text-[22px] font-semibold text-gray-900 leading-relaxed">
            {benefits.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-600 text-2xl leading-none">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center pt-2">
          <h2 className="text-red-600 text-3xl md:text-6xl font-extrabold text-center leading-tight">
            प्राकृतिक के गुणों से भरपूर
          </h2>

          {/* Direction Box */}
          <div className="mt-8 bg-[#eddce5] rounded-md overflow-hidden shadow-lg border border-pink-200 w-full max-w-lg">
            <div className="bg-fuchsia-700 text-white px-6 py-3 text-3xl font-bold rounded-r-full inline-block">
              Direction For Use
            </div>

            <div className="p-6 text-[#2d2d8b] text-[21px] font-bold leading-relaxed">
              <p>1–1 कैप्सूल सुबह और शाम</p>
              <p>भोजन के बाद दूध/गुनगुने पानी के साथ</p>
              <p className="text-[18px] text-gray-700 mt-1">
                (या चिकित्सक के निर्देशानुसार सेवन करें)
              </p>
            </div>
          </div>

          {/* AYUSH Badge */}
          <div className="mt-10 flex flex-col items-center">
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

            <p className="mt-3 text-4xl font-serif text-[#2b2b87] font-semibold">
              Certified
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center lg:justify-end items-end gap-5 flex-wrap">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <Image
              src="/images/artho-g-capsule.png"
              alt="Riyansh Artho-G Capsule"
              width={320}
              height={420}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Box */}
          <div className="relative w-56 h-[420px] bg-gradient-to-b from-white via-orange-100 to-orange-500 border border-gray-300 shadow-2xl overflow-hidden rounded-sm">
            {/* White Curve */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-white rounded-r-[100px]"></div>

            {/* Product Name */}
            <div className="absolute left-6 top-10 rotate-[-90deg] origin-top-left">
              <h2 className="text-gray-700 text-5xl font-extrabold uppercase tracking-wide">
                ARTHO-G
              </h2>
            </div>

            {/* Small Brand Text */}
            <div className="absolute left-4 top-16 rotate-[-90deg] origin-top-left text-orange-700 font-bold tracking-[8px] uppercase text-lg">
              RIYANSH
            </div>

            {/* Hexagon Icons */}
            <div className="absolute right-8 top-32 flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-16 h-16 bg-blue-700 border-4 border-orange-400 rotate-45 rounded-xl shadow-lg"
                />
              ))}
            </div>

            {/* Herbs */}
            <div className="absolute bottom-8 left-6 flex gap-3">
              <div className="w-12 h-20 bg-green-500 rounded-full opacity-80"></div>
              <div className="w-12 h-16 bg-orange-400 rounded-full opacity-80"></div>
            </div>

            {/* Bottom Text */}
            <div className="absolute bottom-5 right-5 text-white font-bold text-sm">
              40 CAPSULE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}