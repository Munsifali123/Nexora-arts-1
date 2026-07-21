import React, { useState } from 'react';
import { db } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  // LIGHTBOX MODAL & FILTER STATES
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const portfolioItems = [
    // --- VTUBER MODELS ---
    { type: '2D Model Asset', category: 'VTuber', title: '2D VTuber Model (Full Body)', icon: 'fa-regular fa-image', color: 'text-purple-400', media: '/art1.png', isVideo: false },
    { type: '3D Model Asset', category: 'VTuber', title: '3D VTuber Model (Full Body)', icon: 'fa-regular fa-image', color: 'text-indigo-400', media: '/art2.png', isVideo: false },
    { type: 'Animated Asset', category: 'VTuber', title: '2D VTuber Model + Full Rigging', icon: 'fa-solid fa-clapperboard', color: 'text-purple-400', media: '/rigging1.mp4', isVideo: true },
    { type: 'Animated Asset', category: 'VTuber', title: '3D VTuber Model + Full Rigging', icon: 'fa-solid fa-clapperboard', color: 'text-indigo-400', media: '/rigging2.mp4', isVideo: true },

    // --- CHIBI MODELS ---
    { type: 'Chibi Model', category: 'Chibi', title: 'Full Body Chibi 2D Model', icon: 'fa-solid fa-face-smile-beam', color: 'text-pink-400', media: '', isVideo: false },
    { type: 'Chibi Rigging', category: 'Chibi', title: 'Animated Chibi Live2D Model', icon: 'fa-solid fa-clapperboard', color: 'text-pink-400', media: '', isVideo: true },

    // --- LOGOS & BANNERS ---
    { type: 'Mascot Logo', category: 'Logos & Banners', title: 'Custom Streamer Vector Logo', icon: 'fa-solid fa-shield-halved', color: 'text-amber-400', media: '', isVideo: false },
    { type: 'Channel Banner', category: 'Logos & Banners', title: 'Twitch & YouTube Banner Header', icon: 'fa-regular fa-image', color: 'text-amber-400', media: '', isVideo: false },

    // --- EMOTES & BADGES ---
    { type: 'Emote Pack', category: 'Emotes', title: 'Custom Twitch/Discord Emote Set', icon: 'fa-solid fa-icons', color: 'text-emerald-400', media: '', isVideo: false },
    { type: 'Animated Emote', category: 'Emotes', title: 'Animated GIF Emote Sequence', icon: 'fa-solid fa-clapperboard', color: 'text-emerald-400', media: '', isVideo: true },

    // --- OVERLAYS & SCREENS ---
    { type: 'Overlay Design', category: 'Overlays', title: 'Intro / Outro Static Screens', icon: 'fa-regular fa-image', color: 'text-cyan-400', media: '', isVideo: false },
    { type: 'Motion Graphic', category: 'Overlays', title: 'Be Right Back Screen (Animated)', icon: 'fa-solid fa-clapperboard', color: 'text-cyan-400', media: '', isVideo: true }
  ];

  const categories = ['All', 'VTuber', 'Chibi', 'Logos & Banners', 'Emotes', 'Overlays'];

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const scrollCarousel = (distance) => {
    const carousel = document.getElementById('package-carousel');
    if (carousel) {
      carousel.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const selectService = (categoryValue) => {
    setFormData(prev => ({ ...prev, service: categoryValue }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "artInquiries"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert("Success! Your creative brief has reached NexoraArts. We will review the details and get back to you shortly.");
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', description: '' });
    } catch (error) {
      console.error("Error writing document to Firestore: ", error);
      alert("Something went wrong saving your inquiry. Please try again or call us directly!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans flex flex-col min-h-screen pb-16 lg:pb-12 scroll-smooth">
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-palette text-purple-500 text-2xl"></i>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
              NexoraArts
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#packages" className="hover:text-purple-400 transition-colors">Streamer Packages</a>
            <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+19179620181" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-5 rounded-full text-sm shadow-lg shadow-purple-900/40 transition-all transform hover:-translate-y-0.5">
              <i className="fa-solid fa-phone"></i>
              <span>+1 (917) 962-0181</span>
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/30 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span> Open For Commissions
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Bringing Your Digital Visions <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">To Striking Life</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Premium custom artwork, dynamic VTuber & Chibi models, custom emotes, logos, banners, and streaming assets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="#packages" className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 hover:border-purple-500 text-white font-medium rounded-xl transition-all shadow-md">
                Browse Streamer Packages
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-950/50">
                Request a Custom Quote
              </a>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE SECTION WITH CATEGORY FILTER & LIGHTBOX MODAL */}
        <section id="portfolio" className="py-20 bg-slate-900/20 border-t border-slate-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Our Digital Asset Portfolio</h2>
              <p className="text-slate-400 text-sm mb-8">Filter by asset type and click on any item to view full uncropped resolution.</p>
              
              {/* CATEGORY FILTER BUTTONS */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PORTFOLIO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => item.media && setSelectedMedia(item)}
                  className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-purple-500/80 transition-all flex flex-col justify-between ${item.media ? 'cursor-pointer' : ''}`}
                >
                  <div className="aspect-video bg-slate-800 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                    {item.media ? (
                      <>
                        {item.isVideo ? (
                          <video src={item.media} className="w-full h-full object-cover" muted loop autoPlay />
                        ) : (
                          <img 
                            src={item.media} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                        <div className="absolute inset-0 bg-purple-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                          <i className={`fa-solid ${item.isVideo ? 'fa-circle-play' : 'fa-magnifying-glass-plus'} text-2xl text-purple-400 animate-bounce`}></i>
                          <span className="text-xs font-semibold tracking-wider uppercase">View Full Screen</span>
                        </div>
                      </>
                    ) : (
                      <i className={`${item.icon} text-slate-600 text-3xl group-hover:scale-110 transition-transform`}></i>
                    )}
                  </div>
                  <div className="p-4 bg-slate-900/90">
                    <span className={`text-[10px] font-bold tracking-widest ${item.color} uppercase`}>{item.type}</span>
                    <h4 className="text-sm font-semibold text-white mt-0.5">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTAKE FORM */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Let's Start Your Next Project</h2>
              <p className="text-slate-400 text-sm">Fill out your project requirements below to receive a custom proposal.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => handleInputChange(e, 'name')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" required value={formData.email} onChange={(e) => handleInputChange(e, 'email')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" placeholder="+1 (xxx) xxx-xxxx" required value={formData.phone} onChange={(e) => handleInputChange(e, 'phone')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Service Needed</label>
                  <select required value={formData.service} onChange={(e) => handleInputChange(e, 'service')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all">
                    <option value="" disabled>Select a primary category</option>
                    <option value="2D/3D VTuber Modeling">2D/3D VTuber Modeling & Rigging</option>
                    <option value="Chibi Model & Rigging">Chibi Model Design & Rigging</option>
                    <option value="Logo & Banner Branding">Vector Logo & Channel Banner</option>
                    <option value="Emotes & Sub Badges">Custom Twitch/Discord Emotes</option>
                    <option value="Stream Assets & Overlays">Stream Overlays & Screens</option>
                    <option value="Manga & Comic Design">Manga & Comic Panel Layouts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Estimated Budget (USD)</label>
                <select required value={formData.budget} onChange={(e) => handleInputChange(e, 'budget')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all">
                  <option value="" disabled>Select your budget bracket</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                  <option value="$2,500+">$2,500+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Description</label>
                <textarea rows="4" required placeholder="Tell us about your model requirements, character concepts, or emotes..." value={formData.description} onChange={(e) => handleInputChange(e, 'description')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-purple-950/30 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Project Request'} <i className="fa-solid fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {selectedMedia && (
        <div 
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white text-3xl font-bold cursor-pointer transition-colors z-10"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
              <div>
                <span className={`text-[10px] font-bold tracking-widest ${selectedMedia.color} uppercase`}>{selectedMedia.type}</span>
                <h3 className="text-lg font-bold text-white">{selectedMedia.title}</h3>
              </div>
            </div>

            <div className="p-2 flex items-center justify-center bg-black/40 overflow-auto max-h-[75vh]">
              {selectedMedia.isVideo ? (
                <video src={selectedMedia.media} controls autoPlay className="max-h-[70vh] w-auto rounded-lg" />
              ) : (
                <img src={selectedMedia.media} alt={selectedMedia.title} className="max-h-[70vh] w-auto object-contain rounded-lg" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 py-3 lg:py-4 px-4 sm:px-6 lg:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4 text-xs sm:text-sm text-slate-400">
          <div>
            &copy; 2026 <span className="text-white font-medium">NexoraArts</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800/80">
            <i className="fa-solid fa-envelope text-purple-400 text-xs"></i>
            <a href="mailto:syedmunsifali@nexoraglobal.agency" className="hover:text-purple-400 transition-colors font-mono">
              syedmunsifali@nexoraglobal.agency
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-purple-400 transition-colors"><i className="fa-brands fa-x-twitter text-base"></i></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><i className="fa-brands fa-twitch text-base"></i></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><i className="fa-brands fa-discord text-base"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}