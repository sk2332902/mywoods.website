import React, { useState, useEffect } from 'react';
import api from '../api';
import { Loader2, Trees, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

const Woods = () => {
  const [woods, setWoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWoods = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/woods');
      setWoods(response.data);
    } catch (err) {
      console.error(err);
      setError('Could not retrieve catalog. Make sure the database is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWoods();
  }, []);

  // Helper to resolve gradients depending on Wood type or color
  const getCardBackground = (color) => {
    const normColor = color.toLowerCase();
    if (normColor.includes('purple') || normColor.includes('rose')) {
      return 'from-purple-900 to-indigo-950 text-purple-200';
    }
    if (normColor.includes('red') || normColor.includes('mahogany')) {
      return 'from-rose-800 to-red-950 text-red-150';
    }
    if (normColor.includes('dark') || normColor.includes('brown')) {
      return 'from-amber-900 to-amber-950 text-amber-100';
    }
    if (normColor.includes('golden') || normColor.includes('yellow') || normColor.includes('teak')) {
      return 'from-yellow-700 to-amber-900 text-yellow-50';
    }
    // Default pale/soft wood representation
    return 'from-orange-700 to-amber-800 text-orange-50';
  };

  return (
    <div className="bg-slate-50 flex-grow py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 uppercase tracking-wider mb-4">
            <Sparkles className="h-3 w-3" /> Public Catalog
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Explore Premium Timber Varieties
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Browse our global directory of premium woods, complete with official specifications, dimensions, and sourcing profiles.
          </p>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 text-cyan-500 animate-spin" />
            <p className="text-slate-500 text-sm font-semibold">Reading catalog records...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center flex flex-col items-center gap-3">
            <ShieldAlert className="h-12 w-12 text-red-500 mb-2" />
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchWoods}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
            >
              Retry Connection
            </button>
          </div>
        ) : woods.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto">
            <Trees className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Catalog is currently empty</h3>
            <p className="text-slate-500 text-sm mt-1">Please seed or add woods in the CMS.</p>
          </div>
        ) : (
          /* Grid Gallery Matrix */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {woods.map((wood) => (
              <div 
                key={wood._id} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                
                {/* Visual Representation Block (Acting as the Wood Image/Block) */}
                <div className={`relative h-48 bg-gradient-to-br ${getCardBackground(wood.color || wood.name)} flex items-center justify-center p-6 text-center select-none overflow-hidden`}>
                  {/* Subtle Wood Rings Pattern Overlay */}
                  <div className="absolute inset-0 opacity-15 mix-blend-overlay flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full border-8 border-white"></div>
                    <div className="absolute w-60 h-60 rounded-full border-8 border-white"></div>
                    <div className="absolute w-40 h-40 rounded-full border-8 border-white"></div>
                    <div className="absolute w-20 h-20 rounded-full border border-white"></div>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {wood.typewood}
                    </span>
                    <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">
                      {wood.name}
                    </h3>
                    <p className="text-xs opacity-90 italic">
                      {wood.color} &bull; {wood.density}
                    </p>
                  </div>

                  {/* Price Tag badge on image (in Rupees) */}
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400">
                    ₹{Number(wood.pricePerUnit).toLocaleString('en-IN')} / Unit
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Origin & Grade row */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-slate-400 mr-1 flex-shrink-0" />
                        Origin: <span className="ml-1 text-slate-700">{wood.origin}</span>
                      </div>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                        {wood.grade || 'Premium Grade'}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {wood.description || 'No description provided for this timber catalog entry.'}
                    </p>

                    {/* Advanced Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Moisture</span>
                        <span className="font-semibold text-slate-700">{wood.moistureContent || '12% (Kiln-Dried)'}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase">Stock Count</span>
                        <span className="font-semibold text-slate-700">{wood.stockQuantity !== undefined ? wood.stockQuantity : 100} Units</span>
                      </div>
                    </div>

                    {/* Usage specifications */}
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-600">Ideal for: </span>
                      <span>{wood.usage || 'Furniture, premium carpentry, paneling'}</span>
                    </div>
                  </div>

                  {/* Stock Availability Badge */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Stock Availability
                    </span>
                    {wood.completed ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                        Pre-Order
                      </span>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Woods;
