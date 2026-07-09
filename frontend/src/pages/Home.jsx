import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trees, ShieldCheck, Truck, Database, Award, ChevronRight, CheckCircle, Scale, Droplet } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-50 flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_45%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.08),transparent_40%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 animate-pulse">
              <Trees className="h-3.5 w-3.5" /> Premium Timber Inventory
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Manage Your Timber Supply Chain <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                With Ultimate Precision
              </span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              MyWoods provides high-quality timber inventories from across the globe. Seamlessly track stocks, wood specs, and sourcing data through our professional admin interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/woods"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent rounded-xl text-base font-bold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Browse Woods Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/cms"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-700 rounded-xl text-base font-bold text-slate-300 hover:text-white hover:bg-slate-800 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Launch CMS Panel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Core Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3">
            What We Offer
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Complete Wood Sourcing & Inventory Control
          </p>
          <p className="mt-4 text-slate-600 text-lg">
            Whether you are a developer, carpenter, architect, or industrial supplier, MyWoods ensures your data operations are fast, reliable, and clean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-300 flex flex-col items-start group">
            <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Certified Quality</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Every wood entry in our catalog holds details on origin, color, density, and specifications, ensuring compliance with global environmental guidelines.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-300 flex flex-col items-start group">
            <div className="p-3 bg-teal-50 rounded-xl text-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Sourcing</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              We compile data for timber sourced from different regions including Myanmar, North America, Central America, and local Indian environments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-300 flex flex-col items-start group">
            <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless CMS</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Easily update records, price listings, availability, and densities dynamically. Powered by a fully operational MERN stack framework.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Timber Showcase */}
      <section className="py-20 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-150 mb-3">
              <Award className="h-3.5 w-3.5" /> Signature Timbers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Curated Timber Selection
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Explore a preview of our premium raw and processed timber collections sourced under strict sustainability standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Teak */}
            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src="/teak_wood.png" 
                  alt="Burmese Teak Wood" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-400">
                  ₹3,500 / CFT
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                      Premium Grade
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Scale className="h-3 w-3" /> 650 kg/m³
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Burmese Teak</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Highly sought after for its gold-colored grain, high oil content, and incredible weather-proofing. Essential for high-end yachts and outdoor decks.
                  </p>
                </div>
                <Link to="/about" className="text-cyan-600 font-bold text-sm inline-flex items-center hover:text-cyan-700 transition group/link">
                  Learn Specifications <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Walnut */}
            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src="/walnut_wood.png" 
                  alt="American Walnut Wood" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-400">
                  ₹2,800 / CFT
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Cabinetry Grade
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Scale className="h-3 w-3" /> 640 kg/m³
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">American Walnut</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    A beautiful, dark hardwood with dense grains and rich chocolate tones. Extremely easy to machine, glue, and finish for high-end custom furniture.
                  </p>
                </div>
                <Link to="/about" className="text-cyan-600 font-bold text-sm inline-flex items-center hover:text-cyan-700 transition group/link">
                  Learn Specifications <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 3: Mahogany */}
            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:border-cyan-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src="/mahogany_wood.png" 
                  alt="African Mahogany Wood" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-400">
                  ₹2,200 / CFT
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Prime Hardwood
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Scale className="h-3 w-3" /> 530 kg/m³
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">African Mahogany</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    Offers a gorgeous reddish-brown luster with medium texture and impressive stability. Highly preferred for commercial doors, panelling, and musical instruments.
                  </p>
                </div>
                <Link to="/about" className="text-cyan-600 font-bold text-sm inline-flex items-center hover:text-cyan-700 transition group/link">
                  Learn Specifications <ChevronRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Quality Journey */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.05),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.03),transparent_35%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">
              Quality Assurance
            </h2>
            <p className="text-3xl font-extrabold sm:text-4xl">
              From Responsible Forestry to Verification
            </p>
            <p className="mt-4 text-slate-400">
              We monitor every log to guarantee that only prime, sustainable timber reaches your hands. Here is how we verify our wood supply.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition duration-300">
              <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">1. FSC Sourcing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All timber is harvested from FSC-certified forests, ensuring ecological balance and native biodiversity conservation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition duration-300">
              <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">2. Kiln Drying</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We dry the wood down to a uniform 10-12% moisture range in computerized kilns, preventing future warping or splitting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition duration-300">
              <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-4">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">3. Density Check</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each shipment is weighted and measured to verify density consistency, ensuring it matches design strength tolerances.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition duration-300">
              <div className="h-10 w-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">4. Digital Ledger</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sourcing parameters and prices are logged in our cloud CMS, giving carpenters and architects transparent project planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Banner (Teal Background Accent) */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Optimize Your Inventory?</h2>
          <p className="text-teal-50 text-lg mb-8 max-w-2xl mx-auto">
            Access our integrated CMS dashboard to immediately create, edit, update, or remove wood catalog data in real time.
          </p>
          <Link
            to="/cms"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-bold text-teal-900 bg-white hover:bg-teal-50 transition transform hover:-translate-y-0.5 duration-200 cursor-pointer"
          >
            Go to Admin Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
