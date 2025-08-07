import React from 'react'

const Profilecards = () => {
  return (
    <div className='px-6 md:-mt-40'>
       {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Ahmed Khan Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-40 h-40 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-36 h-36  rounded-full flex items-center justify-center">
               <img className='w-full h-full rounded-full' src="./images/men.jpg" alt="" srcset="" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Ahmed Khan</h3>
            <p className="text-gray-600 text-sm mb-4">28 years old • Male</p>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">About Me</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Practicing Sunni Muslim who values faith, honesty, and family life. Seeking a pious partner for a halal marriage.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          {/* Fatima Zahra Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-40 h-40 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-36 h-36  rounded-full flex items-center justify-center">
                <img className='w-full h-full rounded-full' src="./images/girl.png" alt="" srcset="" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Fatima Zahra</h3>
            <p className="text-gray-600 text-sm mb-4">25 years old • Female</p>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">About Me</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Modest and respectful sister committed to Islamic values. Looking for a righteous Sunni Muslim husband.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              <div className="h-2 bg-gray-200 rounded w-3/5"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Usman Farooq Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-40 h-40 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-36 h-36  rounded-full flex items-center justify-center">
               <img className='w-full h-full rounded-full' src="./images/men.jpg" alt="" srcset="" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Usman Farooq</h3>
            <p className="text-gray-600 text-sm mb-4">30 years old • Male</p>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">About Me</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sunni Muslim who follows the Sunnah and values sincerity. Wants to build a faith-centered home with a practicing wife.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-sm">
            Sign Up Today To See Full Profiles
          </button>
        </div>
      </div>
   
  )
}

export default Profilecards
