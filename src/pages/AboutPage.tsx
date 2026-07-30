import React from 'react';
import { useApp } from '../context/AppContext';
import { PlantImage } from '../components/PlantImage';
import { 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  HeartHandshake, 
  Sprout, 
  TreeDeciduous, 
  ArrowRight,
  Phone
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { businessInfo, gallery, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 space-y-4 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="inline-block px-3 py-1 rounded-md bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            About Our Nursery
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {businessInfo.name}
          </h1>
          <p className="text-lg font-bold text-emerald-300">
            {businessInfo.kannadaName}
          </p>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed pt-2">
            Established as a dedicated wholesale plant nursery in Sanjeevinagar, Huskur Village, Bengaluru. We bridge local horticulture with sustainable landscaping for homes, offices, and large residential townships.
          </p>
        </div>
      </div>

      {/* STORY & MISSION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Horticulture Excellence in Bengaluru
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Sri Krishna Nursery & Farm is located in Sanjeevinagar, Huskur Village near Madduramma Temple (Phase II, Bengaluru). Our sprawling nursery facility houses over 100+ species of indoor air-purifying foliage, outdoor flowering shrubs, hybrid fruit trees, and organic potting media.
          </p>
          <p className="text-stone-600 text-sm leading-relaxed">
            We proudly serve retail plant lovers alongside commercial landscape developers, apartment welfare associations (RWA), corporate tech parks, and resort managers across Bengaluru.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <Award className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900">High Quality Standards</h3>
              <p className="text-xs text-stone-600">All plants are propagated using disease-free soil mixes and acclimated to local tropical weather.</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <HeartHandshake className="w-6 h-6 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900">Fair Wholesale Rates</h3>
              <p className="text-xs text-stone-600">Honest pricing without retail inflated margins. Direct farm quotes for bulk orders.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-stone-100">
            <PlantImage 
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80" 
              alt="Sri Krishna Nursery Shade Canopy" 
              fallbackCategory="Nursery Shade Canopy"
              className="w-full h-80"
            />
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-stone-50 rounded-3xl p-8 border border-stone-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-stone-900">Coverage & Delivery Areas</h2>
          <p className="text-xs text-stone-600">We primarily serve customers and commercial projects in these Bengaluru locations:</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs font-semibold text-stone-800 text-center">
          {[
            'Huskur Village & Sanjeevinagar',
            'Electronic City Phase 1 & 2',
            'Sarjapur Road & Carmelaram',
            'Whitefield & Varthur',
            'Chandapura & Anekal',
            'Bommasandra Industrial Area',
            'Attibele & Hosur Border',
            'Kudlu Gate & HSR Layout'
          ].map((location) => (
            <div key={location} className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{location}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NURSERY GALLERY PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Our Nursery Facilities</h2>
            <p className="text-xs text-stone-600">Sneak peek into our shade house, potting area, and fruit plant rows.</p>
          </div>
          <button
            onClick={() => navigateTo('gallery')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {gallery.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs">
              <PlantImage 
                src={item.image} 
                alt={item.title} 
                fallbackCategory={item.category}
                className="w-full h-48"
              />
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-amber-400 rounded-3xl p-8 text-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold">Have Questions or Planning a Garden Project?</h3>
          <p className="text-xs font-medium text-stone-800">Call our nursery team directly for plant recommendations and wholesale availability.</p>
        </div>

        <a
          href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
          className="px-6 py-3 bg-stone-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-stone-800 transition-colors flex items-center gap-2 shrink-0"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call {businessInfo.phone}</span>
        </a>
      </section>

    </div>
  );
};
