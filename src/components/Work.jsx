import React from 'react'

const Work = () => {
  return (
    <div>
       {/* How It Works Section */}
        <div id='howitworks' className="mt-20 mb-16 bg-[#FEF2F2] p-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1: Create */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Create</h3>
              <p className="text-gray-600 text-sm">
                Create your profile and account
              </p>
            </div>

            {/* Step 2: Consider */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14H20.5L22 15.5V7C22 5.9 21.1 5 20 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H13L15.5 14ZM9.5 11.5C9.5 10.1 8.4 9 7 9S4.5 10.1 4.5 11.5 5.6 14 7 14 9.5 12.9 9.5 11.5ZM17 9C15.6 9 14.5 10.1 14.5 11.5S15.6 14 17 14 19.5 12.9 19.5 11.5 18.4 9 17 9Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: Consider</h3>
              <p className="text-gray-600 text-sm">
                Browse compatible profiles based on your preferences and requirements
              </p>
            </div>

            {/* Step 3: Connect */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Connect</h3>
              <p className="text-gray-600 text-sm">
                Express interest and start meaningful conversations with potential matches
              </p>
            </div>
          </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-6">
            {/* Video 1 */}
           <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <video src="./images/video1.mp4" controls></video>
            </div>

            {/* Video 2 */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <video src="./images/video2.mp4" controls></video>
            </div>

            {/* Video 3 */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              <video src="./images/video3.mp4" controls></video>
            </div>
          </div>
        

        
      </div>
   
  )
}

export default Work
