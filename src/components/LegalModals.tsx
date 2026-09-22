import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white text-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            {type === 'terms' ? (
              <FileText className="w-5 h-5 text-[#9e1102]" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#9e1102]" />
            )}
            <h2 className="font-bold text-lg text-gray-900">
              {type === 'terms' ? 'Terms of Use' : 'Privacy Policy'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed text-gray-700">
          {type === 'terms' ? (
            <>
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">1. Terms</h3>
                <p>
                  By accessing the website, you agree to be bound by these terms of service, all applicable laws and regulations, and you agree that you are responsible for compliance with all applicable local laws. If you don't agree with any of these terms, you are prohibited from using or accessing this website. The materials contained on this site are protected by applicable copyright and trademark laws.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">2. License Usage</h3>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on the website for personal, non-commercial transitory viewing only. This is the granting of a license, not a transfer of title and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for public display; attempt to decompile or reverse engineer any software; or remove any copyright or other proprietary notations.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">3. Disclaimer</h3>
                <p>
                  The materials on the website are provided 'as is'. Neurodyne Protocol makes no warranties, expressed or implied, and hereby disclaims all other warranties including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">4. Limitations</h3>
                <p>
                  In no event will Neurodyne Protocol or its suppliers be liable for any damages arising out of the use of, or inability to use, the materials, even if an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">5. Precision of Materials</h3>
                <p>
                  The materials appearing on the website could include technical, typographical, or photographic errors. Neurodyne Protocol does not warrant that any material on its website is accurate, complete, or current.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">6. Applicable Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with applicable laws and regulations.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Privacy Policy</h3>
                <p>
                  All of your personal information collected will be used to help make your visit to our site as productive and enjoyable as possible. The guarantee of the confidentiality of personal data of our users is important for Neurodyne Protocol.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Information We Collect</h3>
                <p>
                  The personal information collected may include your name, email, telephone number, address, date of birth, and payment confirmation details processed via secure encryption.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Advertising & Analytics</h3>
                <p>
                  Like other websites, we collect standard browsing metadata including IP address, ISP, browser type, and timestamps to ensure website security, load speed optimization, and delivery.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Cookies and Web Beacons</h3>
                <p>
                  We use cookies to store information such as your personal preferences when you visit our website, video progress state, and session settings.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Third Party Links</h3>
                <p>
                  Neurodyne Protocol has links to trusted payment gateways and partners. Our privacy policy does not apply to third-party sites once you navigate away from our domain.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
