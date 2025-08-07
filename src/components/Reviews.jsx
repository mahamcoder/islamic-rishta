import React from 'react'

const Reviews = () => {
  return (
    <div className='px-6'>
      {/* Success Stories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              {/* 5 Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "We found each other through MYFLEXLIFE and got married 6 months later. The platform helped us connect based on our shared values and goals."
              </p>
              <div >
                <p className="font-semibold text-red-500">Ahmed & Fatima</p>
                <p className="text-gray-500 text-sm">London, United Kingdom</p>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              {/* 5 Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "After trying other platforms, MYFLEXLIFE was different. The detailed profiles helped us understand each other's family values."
              </p>
              <div >
                <p className="font-semibold text-red-500">Omar & Aisha</p>
                <p className="text-gray-500 text-sm">Toronto, Canada</p>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              {/* 5 Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "I'm grateful for this platform bringing us together. The respectful environment made the whole process comfortable."
              </p>
              <div >
                <p className="font-semibold text-red-500">Yusuf & Maryam</p>
                <p className="text-gray-500 text-sm">Sydney, Australia</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Reviews
