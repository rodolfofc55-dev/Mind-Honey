import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  protocol: string;
  price: string;
  priceNum: number;
  perMonth: string;
  checkoutUrl: string;
  badgeSvgHash: string;
  isPopular?: boolean;
  savings?: string;
  supply: string;
}

const TIERS: PricingTier[] = [
  {
    id: '6-month',
    name: '6-Month Protocol',
    protocol: 'Neurodyne Protocol',
    price: '$97',
    priceNum: 97,
    perMonth: '$16.16/mo',
    checkoutUrl: 'https://checkout.kashpay.com.br/checkout/checkout-1775429309221',
    badgeSvgHash: '51674',
    isPopular: true,
    savings: 'Biggest Savings',
    supply: '180-Day Supply',
  },
  {
    id: '3-month',
    name: '3-Month Protocol',
    protocol: 'Neurodyne Protocol',
    price: '$85',
    priceNum: 85,
    perMonth: '$28.33/mo',
    checkoutUrl: 'https://checkout.kashpay.com.br/checkout/checkout-1775787843529',
    badgeSvgHash: '770605',
    savings: 'Most Selected',
    supply: '90-Day Supply',
  },
  {
    id: '1-month',
    name: '1-Month Protocol',
    protocol: 'Neurodyne Protocol',
    price: '$73',
    priceNum: 73,
    perMonth: '$73.00/mo',
    checkoutUrl: 'https://checkout.kashpay.com.br/checkout/checkout-1775788149071',
    badgeSvgHash: '334153',
    supply: '30-Day Starter',
  },
];

// Clean vector fallback for payment cards in case external SVG fails to load
const PaymentBadgesSvg: React.FC<{ hash: string }> = ({ hash }) => {
  return (
    <div className="w-full flex items-center justify-center my-3 px-2">
      <img
        loading="lazy"
        decoding="async"
        width="307"
        height="48"
        src={`https://media.atomicatmedia.net/u/A4LBDUG0Y0MaMBz2kRyap84HSVH2/Pictures/bbuebY5606374.svg?quality=88#${hash}`}
        alt="Secure Payment: Visa, Mastercard, PayPal, Amex"
        className="max-w-[280px] sm:max-w-[307px] h-auto object-contain"
        onError={(e) => {
          // Inline visual fallback if external CDN is blocked
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.nextElementSibling;
          if (fallback) (fallback as HTMLElement).style.display = 'flex';
        }}
      />
      <div 
        style={{ display: 'none' }}
        className="items-center justify-center gap-2 py-2 px-3 bg-white/70 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700"
      >
        <span className="text-[#1a1f71] font-bold">VISA</span>
        <span>•</span>
        <span className="text-[#eb001b] font-bold">MC</span>
        <span>•</span>
        <span className="text-[#003087] font-bold">PayPal</span>
        <span>•</span>
        <span className="text-[#2e77bc] font-bold">AMEX</span>
      </div>
    </div>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <section 
      id="pricing-packages"
      className="w-full max-w-5xl mx-auto px-4 py-8 transition-opacity duration-700 ease-in-out"
    >
      {/* Urgency / Stock header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 bg-[#b42d1f]/10 text-[#b42d1f] font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wide uppercase">
          <Clock className="w-4 h-4" /> Limited Special Launch Discount
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#392e1d] mt-2">
          Claim Your Neurodyne Protocol Today
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mt-1">
          Select your package below to begin restoring your mental clarity and memory with the Blueberry Shield breakthrough.
        </p>
      </div>

      {/* The 3 Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-[35px] border border-[#dfdfdf] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              tier.isPopular
                ? 'bg-[rgba(253,226,185,0.45)] ring-2 ring-[#00bf63]/40 shadow-lg'
                : 'bg-[rgba(253,226,185,0.35)]'
            }`}
          >
            {/* Best Value Badge if applicable */}
            {tier.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00bf63] text-white text-[11px] sm:text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Best Value • Most Popular
              </div>
            )}

            <div className="text-center pt-2">
              {/* Protocol Title */}
              <h3 className="text-xl sm:text-[22px] font-bold text-[#392e1d] tracking-tight">
                {tier.name}
              </h3>

              {/* Protocol Subtitle */}
              <p className="text-sm font-medium text-[#6b583e] mt-1 mb-3">
                {tier.protocol}
              </p>

              {/* Package Supply Indicator */}
              <span className="inline-block text-xs font-semibold px-3 py-1 bg-white/70 text-[#392e1d] rounded-full border border-[#e2d5c3] mb-4">
                {tier.supply}
              </span>

              {/* Big Price Display */}
              <div className="my-2">
                <span className="text-4xl sm:text-5xl font-black text-[#1c1e21] tracking-tight">
                  {tier.price}
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  One-time payment • No hidden fees
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="my-4 flex flex-col items-center w-full">
              <a
                href={tier.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[90%] bg-[#00bf63] hover:bg-[#7dedee] hover:text-[#267c7d] text-white font-['Montserrat',sans-serif] font-bold text-base tracking-wider py-4 px-6 rounded-full text-center transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center cursor-pointer uppercase"
              >
                <span>BUY NOW</span>
              </a>

              {/* Payment Card Badges */}
              <PaymentBadgesSvg hash={tier.badgeSvgHash} />
            </div>

            {/* Guarantees & Features */}
            <div className="border-t border-[#dfdfdf]/70 pt-4 mt-2 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00bf63] shrink-0" />
                <span>100% 60-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00bf63] shrink-0" />
                <span>Fast & Discreet Express Delivery</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 60-Day Guarantee Box */}
      <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-amber-50 border-4 border-amber-200 flex items-center justify-center p-3 text-amber-600">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-bold text-[#1f2937]">
            Our Ironclad 60-Day 100% Satisfaction Guarantee
          </h4>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Try the Neurodyne Protocol completely risk-free. If you don't experience noticeable improvements in your memory, mental focus, and cognitive vitality within 60 days, simply contact customer support for a prompt and courteous full refund. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};
