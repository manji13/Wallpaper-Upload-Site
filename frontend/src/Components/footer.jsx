import React from 'react';

const Footer = () => {
  const currentYear = 2025;

  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-rose-900/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-rose-500 tracking-tight">
            WALLPIX<span className="text-white">.</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            The ultimate tool for high-quality background removal and image editing powered by AI.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-rose-400 font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-rose-500 transition-colors">Home</a></li>
              <li><a href="/contact" className="hover:text-rose-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-rose-400 font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/removebackground" className="hover:text-rose-500 transition-colors">Remove Background</a></li>
              <li><a href="/userpolicy" className="hover:text-rose-500 transition-colors">Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter / Action */}
        <div className="space-y-4">
          <h3 className="text-rose-400 font-semibold text-sm uppercase tracking-wider">Newsletter</h3>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-zinc-900 border border-zinc-800 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-rose-500 text-sm"
            />
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md transition-all text-sm font-medium">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs">
        <p>© {currentYear} Wallpix. All rights reserved.</p>
        <p className="mt-2 md:mt-0 uppercase tracking-widest font-medium">
          Created by <span className="text-rose-500">Wallpix</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;