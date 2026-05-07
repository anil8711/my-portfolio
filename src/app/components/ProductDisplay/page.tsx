"use client";

import Image from "next/image";

export default function AmritJuice() {
  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 items-center">
        
        {/* LEFT SECTION */}
        <div className="space-y-4">
          <div className="bg-blue-900 text-white p-5 rounded-xl text-sm leading-relaxed shadow-lg">
            हम बीमारी के लिए नही देते, बीमार ना होने के लिए देते है,<br /><br />
            <b>रियांश अमृत जूस</b> शरीर की कोशिकाओं को सक्रिय करता है और शरीर को शुद्ध करता है।<br /><br />
            रियांश अमृत जूस में प्राकृतिक एवं अति दुर्लभ 42 जड़ी बूटियों का अर्क होता है।
            यह शरीर को साफ करने में मदद करता है, शरीर साफ होने से शरीर के टॉक्सिन हट जाते है,
            इसलिए बीमारियों को कम करने में मदद मिलती है।
          </div>

          <div className="bg-green-700 text-yellow-300 text-2xl font-bold p-6 rounded-xl shadow-lg text-center">
            बीमारियां अनेक,<br /> इलाज सिर्फ एक
          </div>

          <div className="bg-white border rounded-xl p-4 shadow">
            <h3 className="bg-blue-800 text-white px-4 py-2 rounded-md inline-block mb-3 font-semibold">
              Direction For Use
            </h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              15-15 ml सुबह और शाम <br />
              खाना खाने से एक घंटा पहले 200 ml गुनगुने पानी के साथ कांच के ग्लास में।<br />
              <span className="text-xs text-gray-500">
                (या चिकित्सक के निर्देशानुसार सेवन करें)
              </span>
            </p>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/images/riyansh juice.jpg" // 👉 replace with your actual image path
            alt="Riyansh Amrit Juice"
            width={300}
            height={500}
            className="object-contain"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="text-purple-700 font-bold text-lg mb-2">उपयुक्तताएं -</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>प्राकृतिक एवं अति दुर्लभ 42 जड़ी बूटियों से तैयार किया गया है</li>
              <li>हजारों मरीजों को फायदा</li>
            </ul>
          </div>

          <div className="border-t pt-3">
            <ul className="space-y-2">
              <li>• बवासीर (पाइल्स) पथरी (किडनी स्टोन)</li>
              <li>• संधिवात (जॉइंट पेन) मधुमेह (डायबिटीज)</li>
              <li>• रक्तचाप (हाई BP / लो BP)</li>
              <li className="text-red-600 font-semibold">
                • रोग प्रतिरोधक क्षमता को बढ़ाता है (corona virus) में उपयोगी
              </li>
              <li>• अस्थमा, श्वसन विकार, अपच, कब्ज (एसिडिटी)</li>
              <li>• किडनी रोग, लकवा (पैरालिसिस)</li>
              <li>• हृदय रोग, कैंसर</li>
              <li>• एड्स / एच. आई. वी. मूत्राशय के रोग</li>
              <li>• बालों को झड़ने से रोकता है</li>
              <li>• मानसिक तनाव, मोटापा (ओबेसिटी)</li>
              <li>• स्मरण शक्ति व पाचन शक्ति बढ़ाता है</li>
              <li>• गर्भ धारण क्षमता बढ़ाता है (इनफर्टिलिटी)</li>
            </ul>
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-red-600 text-white px-6 py-3 rounded-full text-center font-bold shadow-lg">
              करोड़ों भारतीयों की<br /> नंबर 1 पसंद
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}