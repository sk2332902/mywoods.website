import React from 'react';
import { Users, Code, Award, Smile } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 flex-grow py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 uppercase tracking-wider mb-4">
            Who We Are
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cyan-600 mb-6">
            Building Digital Experiences That Matter
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl">
            MyWoods is an industry-leading provider of raw and processed timber, utilizing cutting-edge digital inventory systems to serve clients worldwide.
          </p>
        </div>

        {/* Core Layout: Left Image, Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md lg:max-w-full">
              {/* Decorative Background Blob */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-400 to-teal-400 opacity-20 blur-xl group-hover:opacity-30 transition-all duration-300"></div>
              
              {/* Main Image with Teal/Cyan Border */}
              <img
                src="/team_at_work.png"
                alt="MyWoods Team at work"
                className="relative rounded-2xl border-4 border-cyan-400/80 shadow-lg object-cover w-full h-[400px] object-center transform hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Column: Paragraph + Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Pioneering Sustainable Forestry & Inventory Management
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                We believe that managing inventory shouldn't be an afterthought. Our team has built MyWoods to bridge the gap between traditional timber trading and modern software solutions. By keeping track of timber availability, moisture density profiles, and exact price-per-unit configurations, we help organizations streamline their supply lines.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                With a focus on accountability, precision, and sustainability, we coordinate with domestic and international suppliers to maintain a pristine, real-time catalog.
              </p>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200">
              
              {/* Stat 1 */}
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 tracking-tight">
                  150+
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Projects
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 tracking-tight">
                  80+
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Clients
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 tracking-tight">
                  5+
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Years Exp
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Wood Species Showcase with Prices */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-3">Our Collection</h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Premium Woods Pricing Directory</p>
            <p className="mt-4 text-slate-600">
              Compare our standard pricing and biological specifications for custom project planning. Contact us for bulk volume quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Teak Wood */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden relative">
                <img src="/teak_wood.png" alt="Teak Wood" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-cyan-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md">
                  ₹3,500 - ₹5,000 / CFT
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Burmese Teak</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-full font-bold">Hardwood</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">Density: 650 kg/m³</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    A luxurious, highly durable timber known for its natural weatherproofing oils. Ideal for high-exposure settings like yachts, poolsides, and outdoor landscaping.
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Standard Grade: A+</span>
                  <span className="text-cyan-600">FSC Certified</span>
                </div>
              </div>
            </div>

            {/* American Walnut */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden relative">
                <img src="/walnut_wood.png" alt="Walnut Wood" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-cyan-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md">
                  ₹2,800 - ₹3,800 / CFT
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">American Walnut</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-full font-bold">Hardwood</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">Density: 640 kg/m³</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Deep rich chocolate tones with high resistance to shock and warping. Prized by master carpenters for high-end furniture, fine cabinets, and luxury accents.
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Standard Grade: Premium</span>
                  <span className="text-cyan-600">Sustainably Harvested</span>
                </div>
              </div>
            </div>

            {/* African Mahogany */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="h-60 overflow-hidden relative">
                <img src="/mahogany_wood.png" alt="Mahogany Wood" className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-cyan-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md">
                  ₹2,200 - ₹3,000 / CFT
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">African Mahogany</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-full font-bold">Hardwood</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">Density: 530 kg/m³</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Exhibits a beautiful, interlocking grain pattern that gives a beautiful luster when polished. Ideal for doors, panelling, and musical instruments.
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Standard Grade: Select</span>
                  <span className="text-cyan-600">Import Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
