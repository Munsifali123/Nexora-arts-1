import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
        <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-2 mb-8">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        
        <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-xs mb-8">Last Updated: July 2026</p>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our intake form, we collect personal details provided directly by you, including your name, email address, phone number, estimated project budget, and project brief details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. How We Use Your Information</h2>
            <p>
              The information collected is strictly used to evaluate your creative project request, send custom pricing quotes, communicate project progress, and manage artwork commissions. We do not sell, rent, or lease your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Data Storage & Security</h2>
            <p>
              Your project inquiries are securely stored using Google Cloud Firebase services. We implement reasonable technical and organizational measures to safeguard your personal data against unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Contact & Inquiries</h2>
            <p>
              For any questions or data requests regarding this Privacy Policy, please contact us at <a href="mailto:syedmunsifali@nexoraglobal.agency" className="text-purple-400 font-mono underline">syedmunsifali@nexoraglobal.agency</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}