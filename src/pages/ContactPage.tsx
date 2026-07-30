import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  Send, 
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { businessInfo, addInquiry } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Bulk / Wholesale');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addInquiry({
      name,
      phone,
      email,
      interest,
      message,
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Reach Sri Krishna Nursery
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          Contact & Location
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Have a plant inquiry or planning a wholesale bulk order? Visit us in Huskur or submit the online form below.
        </p>
      </div>

      {/* Main Grid: Form + Address Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Demo Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-xl font-bold text-stone-900">Send an Inquiry</h2>
            <p className="text-xs text-stone-500">Fill in your requirement and our team will get back to you promptly.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Thank You for Reaching Out!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Your message has been submitted. Sri Krishna Nursery & Farm team will contact you on your provided phone number shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Gowda"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 099003 87803"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Interested In</label>
                  <select
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white font-medium"
                  >
                    <option value="Indoor">Indoor Plants</option>
                    <option value="Outdoor">Outdoor Plants</option>
                    <option value="Fruit Plants">Fruit Plants</option>
                    <option value="Garden Supplies">Garden Soil & Supplies</option>
                    <option value="Bulk / Wholesale">Bulk / Wholesale Project</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Message / Plant List</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what plants or quantities you need..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Address, Phone, Plus Code */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-stone-900">{businessInfo.name}</h2>
              <p className="text-xs font-bold text-emerald-800">{businessInfo.kannadaName}</p>
            </div>

            <div className="space-y-3.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">Nursery Address:</p>
                  <p className="leading-relaxed text-stone-600">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-stone-900">Google Maps Plus Code:</p>
                  <p className="font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-900 inline-block mt-0.5">
                    {businessInfo.plusCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-stone-900">Phone Contact:</p>
                  <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="text-amber-800 font-bold hover:underline">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-stone-900">Opening Hours:</p>
                  <p className="text-stone-600">{businessInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 space-y-2 border-t border-stone-200">
              <a
                href={businessInfo.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-stone-900" />
                <span>Call {businessInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* FULL MAP EMBED */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 text-center">Interactive Location Map</h2>
        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md h-96 bg-stone-100">
          <iframe
            title="Sri Krishna Nursery Google Map Location Full"
            src={businessInfo.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

    </div>
  );
};
