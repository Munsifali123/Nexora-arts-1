import React, { useState } from 'react';
// Import the database instance exported from your firebase.js
import { db } from './firebase'; 
// Import Firestore collection and document creation methods
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

  // CONNECTED TO FIRESTORE DATABASE
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Add a new document to the "artInquiries" collection
      await addDoc(collection(db, "artInquiries"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        description: formData.description,
        createdAt: serverTimestamp() // Tracks exactly when they reached out
      });

      alert("Success! Your creative brief has reached NexoraArts. We will review the details and get back to you shortly.");
      // Reset the form state
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
      
      {/* 1. NAVIGATION BAR */}
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
        
        {/* 2. HERO SECTION */}
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
              Premium custom artwork, dynamic VTuber models, active streaming assets, and complete book/manga formatting optimized beautifully for digital creators and authors.
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

        {/* 3. CAROUSEL */}
        <section id="packages" className="py-20 bg-slate-900/40 border-b border-slate-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Exclusive Streamer Packages</h2>
                <p className="text-slate-400">All-in-one combinations calibrated perfectly to jumpstart or overhaul your stream brand.</p>
              </div>
              <div class="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => scrollCarousel(-340)} className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:text-purple-400 hover:border-purple-500 flex items-center justify-center transition-all cursor-pointer">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button onClick={() => scrollCarousel(340)} className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:text-purple-400 hover:border-purple-500 flex items-center justify-center transition-all cursor-pointer">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div id="package-carousel" className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Pack 1 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 01</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Debut VTuber Pack (2D)</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 2D VTuber Model (Half Body)</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Custom Character Concept Sheet</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 3 Standard Custom Emotes</li>
                  </ul>
                </div>
                <button onClick={() => selectService('2D/3D VTuber Modeling')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 2 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 02</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Pro VTuber Pack (2D Animated)</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 2D VTuber Model (Full Body)</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Full Articulate Character Rigging</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 1 Profile Picture + 1 Channel Banner</li>
                  </ul>
                </div>
                <button onClick={() => selectService('2D/3D VTuber Modeling')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 3 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 03</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Next-Gen 3D VTuber Pack</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 3D VTuber Model (Full Body)</li>
                    <li className="flex items-start gap-2.5"><i class="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Comprehensive 3D Rigging</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 3D Model Turnaround Sheet</li>
                  </ul>
                </div>
                <button onClick={() => selectService('2D/3D VTuber Modeling')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 4 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 04</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Essential Streamer Toolkit</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Static Modern Overlay Suite</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Offline Screen + Be Right Back Screen</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Profile PFP & Matching Channel Banner</li>
                  </ul>
                </div>
                <button onClick={() => selectService('Stream Assets & Overlays')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 5 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 05</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Motion Streamer Upgrade</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Animated Overlay Set</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Animated Intro + Animated Outro Screens</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Animated Be Right Back Display Screen</li>
                  </ul>
                </div>
                <button onClick={() => selectService('Stream Assets & Overlays')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 6 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between snap-start hover:border-slate-700 transition-all">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 06</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">The Custom Branding Suite</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> Custom Vector Mascot Logo</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 6 Bespoke Twitch/Discord Emotes</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-500 mt-1 text-xs"></i> 6 Channel Sub Badges + 5 Info Panels</li>
                  </ul>
                </div>
                <button onClick={() => selectService('Custom Digital Illustration')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 7 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-gradient-to-b from-purple-950/40 to-slate-900 border-2 border-purple-500/60 rounded-2xl p-6 flex flex-col justify-between snap-start relative">
                <span className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full">Ultimate 2D</span>
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Package 07</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">Ultimate VTuber Bundle</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-crown text-amber-400 mt-1 text-xs"></i> Full Body 2D Model + Premium Rigging</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-400 mt-1 text-xs"></i> Animated Overlay Pack & Full Screens Set</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-purple-400 mt-1 text-xs"></i> Full Visual Branding Suite</li>
                  </ul>
                </div>
                <button onClick={() => selectService('2D/3D VTuber Modeling')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all cursor-pointer">Inquire For Pricing</button>
              </div>

              {/* Pack 8 */}
              <div className="w-[300px] sm:w-[330px] shrink-0 bg-gradient-to-b from-indigo-950/40 to-slate-900 border-2 border-indigo-500/60 rounded-2xl p-6 flex flex-col justify-between snap-start relative">
                <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3 rounded-full">Ultimate 3D</span>
                <div>
                  <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Package 08</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-4">Ultimate 3D VTuber Creator</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-crown text-amber-400 mt-1 text-xs"></i> Full Body 3D VRM Model + Tracking Rig</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-indigo-400 mt-1 text-xs"></i> Full Animated Overlay & Interactive Assets</li>
                    <li className="flex items-start gap-2.5"><i className="fa-solid fa-circle-check text-indigo-400 mt-1 text-xs"></i> Complete Custom Branding Asset Kit</li>
                  </ul>
                </div>
                <button onClick={() => selectService('2D/3D VTuber Modeling')} className="mt-8 block w-full py-3 text-center text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all cursor-pointer">Inquire For Pricing</button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVICES DIRECTORY */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Core Artistic Specializations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">From streamer ecosystems to full comic layout configurations, we build visuals optimized for digital creators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-900/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl mb-6">
                <i className="fa-solid fa-video"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">For Streamers & VTubers</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>• 2D & 3D VTuber Models <span className="text-xs text-slate-500">(Full/Half)</span></li>
                <li>• Complete Articulate Live2D Rigging</li>
                <li>• Animated Intro, Outro & BRB Screens</li>
                <li>• Static & Dynamic Live Overlays</li>
                <li>• Tailored Channel Branding Assets</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-900/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-xl mb-6">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Writers & Publishing Art</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>• Custom Character Design Sheets</li>
                <li>• Multi-Panel Manga & Storyboarding</li>
                <li>• High-Impact Whole Book Layouts</li>
                <li>• Full Children's Book Illustrations</li>
                <li>• Vertical Webtoon Content Layouts</li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-900/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl mb-6">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">General Digital Art</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>• High-End Concept & Environment Art</li>
                <li>• Premium Commercial Illustrations</li>
                <li>• Custom Merchandise & T-Shirt Graphics</li>
                <li>• High-Conversion Social Thumbnails</li>
                <li>• Album Covers & Event Posters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. PORTFOLIO SHOWCASE SECTION */}
        <section id="portfolio" className="py-20 bg-slate-900/20 border-t border-slate-900 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Our Streaming Asset Grid</h2>
              <p className="text-slate-400 text-sm">Replace the placeholder cards below directly with your asset paths inside the grid architecture.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: '2D Model Asset', title: '2D VTuber Model (Full Body)', icon: 'fa-regular fa-image', color: 'text-purple-400' },
                { type: '3D Model Asset', title: '3D VTuber Model (Full Body)', icon: 'fa-regular fa-image', color: 'text-indigo-400' },
                { type: 'Animated Asset', title: '2D VTuber Model + Full Rigging', icon: 'fa-solid fa-clapperboard', color: 'text-purple-400' },
                { type: 'Animated Asset', title: '3D VTuber Model + Full Rigging', icon: 'fa-solid fa-clapperboard', color: 'text-indigo-400' },
                { type: '2D Model Asset', title: '2D VTuber Model (Half Body)', icon: 'fa-regular fa-image', color: 'text-purple-400' },
                { type: '3D Model Asset', title: '3D VTuber Model (Half Body)', icon: 'fa-regular fa-image', color: 'text-indigo-400' },
                { type: 'Animated Asset', title: '2D VTuber Model Rigging (Half Body)', icon: 'fa-solid fa-clapperboard', color: 'text-purple-400' },
                { type: 'Animated Asset', title: '3D VTuber Model Rigging (Half Body)', icon: 'fa-solid fa-clapperboard', color: 'text-indigo-400' },
                { type: 'Overlay Design', title: 'Intro / Outro Static Screens', icon: 'fa-regular fa-image', color: 'text-pink-400' },
                { type: 'Motion Graphic', title: 'Intro / Outro Screens (Animated)', icon: 'fa-solid fa-clapperboard', color: 'text-pink-400' },
                { type: 'Overlay Design', title: 'Be Right Back Screen (Static)', icon: 'fa-regular fa-image', color: 'text-pink-400' },
                { type: 'Motion Graphic', title: 'Be Right Back Screen (Animated)', icon: 'fa-solid fa-clapperboard', color: 'text-pink-400' },
                { type: 'Overlay Design', title: 'Offline Screen (Static)', icon: 'fa-regular fa-image', color: 'text-pink-400' },
                { type: 'Motion Graphic', title: 'Offline Screen (Animated)', icon: 'fa-solid fa-clapperboard', color: 'text-pink-400' },
                { type: 'UI Overlay', title: 'Stream Overlay UI (Static)', icon: 'fa-regular fa-image', color: 'text-emerald-400' },
                { type: 'UI Motion', title: 'Stream Overlay UI (Animated)', icon: 'fa-solid fa-clapperboard', color: 'text-emerald-400' }
              ].map((item, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col justify-between">
                  <div className="aspect-video bg-slate-800 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                    <i className={`${item.icon} text-slate-600 text-3xl group-hover:scale-110 transition-transform`}></i>
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

        {/* 6. HIGH-CONVERTING INTAKE FORM */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Let's Start Your Next Project</h2>
              <p className="text-slate-400 text-sm">Fill out the creative brief details below, and we'll engineer a customized strategic roadmap and project layout statement.</p>
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
                    <option value="Stream Assets & Overlays">Stream Assets & Overlays</option>
                    <option value="Manga & Comic Design">Manga & Comic Panel Layouts</option>
                    <option value="Children's Book Design">Children's Book Design</option>
                    <option value="Custom Digital Illustration">Custom Digital Illustration</option>
                    <option value="Other Custom Branding">Other Custom Branding</option>
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
                <textarea rows="4" required placeholder="Tell us about your requirements, character inspirations, or book spreads..." value={formData.description} onChange={(e) => handleInputChange(e, 'description')} className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-sm shadow-xl shadow-purple-950/30 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : 'Send Project Request'} <i className="fa-solid fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* 7. FIXED STICKY FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 py-3 lg:py-4 px-4 sm:px-6 lg:px-8 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.5)]">
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