import React from 'react'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-9xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className='w-60'>
                    <img src="./images/wife4life.png" alt="" srcset="" />
                </div>
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-red-500 font-bold text-lg">MYFLEXLIFE</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting Muslim hearts worldwide with dignity and respect.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>hello@myflexlife.co.uk</p>
              <p>MYFLEXLIFE Limited</p>
              <p>Office 7, 35-37 Ludgate Hill</p>
              <p>All Saints, Slough</p>
              <p>Kingdom of Saudi Arabia (KSA)</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 MYFLEXLIFE. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
