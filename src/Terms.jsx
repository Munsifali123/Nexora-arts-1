import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
        <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-2 mb-8">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 text-xs mb-8">Last Updated: July 2026</p>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Overview & Commission Scope</h2>
            <p>
              By commissioning artwork or assets from NexoraArts ("we", "us", "our"), you agree to the following terms and conditions. These terms govern all visual assets created, including VTuber models, rigging, emotes, logos, banners, overlays, and comic panel layouts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Payments & Refunds</h2>
            <p>
              Due to the custom nature of digital artwork, all payments made towards completed or in-progress commissions are non-refundable once work has commenced. Initial deposits or upfront milestone payments reserve project creation time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property & Commercial Usage</h2>
            <p>
              Unless explicitly agreed upon in writing, clients receive commercial rights to use the delivered graphics and assets for live streaming, digital content creation, personal branding, and channel promotion. NexoraArts retains artistic portfolio display rights to showcase commissioned work for self-promotion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Revisions & Approval</h2>
            <p>
              Revisions are provided at specified stages (e.g., initial sketch, line art, color blocking). Major structural revisions requested after a phase has been approved may incur additional asset revision fees.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Contact Information</h2>
            <p>
              Questions regarding these Terms of Service should be sent to <a href="mailto:syedmunsifali@nexoraglobal.agency" className="text-purple-400 font-mono underline">syedmunsifali@nexoraglobal.agency</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}