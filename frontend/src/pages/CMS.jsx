import React, { useState, useEffect } from 'react';
import api from '../api';
import WoodModal from '../components/WoodModal';
import { Plus, Edit2, Trash2, Loader2, RefreshCw, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const CMS = () => {
  const [woods, setWoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWood, setSelectedWood] = useState(null);

  // Fetch woods list
  const fetchWoods = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/woods');
      setWoods(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch wood records. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWoods();
  }, []);

  // Quick message timeout helper
  const showToast = (message, isError = false) => {
    if (isError) {
      setError(message);
      setSuccessMsg('');
    } else {
      setSuccessMsg(message);
      setError('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Add Wood or Edit Wood handler
  const handleOpenAdd = () => {
    setSelectedWood(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (wood) => {
    setSelectedWood(wood);
    setIsModalOpen(true);
  };

  // Modal Submit (Create or Update)
  const handleModalSubmit = async (formData) => {
    try {
      if (selectedWood) {
        // Update wood
        const response = await api.put(`/api/woods/${selectedWood._id}`, formData);
        showToast('Wood entry updated successfully!');
        // Update in state
        setWoods(prev => prev.map(w => w._id === selectedWood._id ? response.data : w));
      } else {
        // Create wood
        const response = await api.post('/api/woods', formData);
        showToast('New wood type added to inventory!');
        // Prepend to state
        setWoods(prev => [response.data, ...prev]);
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || 'Failed to save wood. Verify input data.';
      showToast(errMsg, true);
      throw err; // Re-throw to let modal know it failed
    }
  };

  // Delete Handler
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}" from inventory?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/woods/${id}`);
      showToast(`Successfully deleted "${name}"`);
      setWoods(prev => prev.filter(w => w._id !== id));
    } catch (err) {
      console.error(err);
      showToast('Failed to delete wood entry. Try again.', true);
    }
  };

  return (
    <div className="bg-slate-50 flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Inventory Management (CMS)
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Add, update, or remove wood stock products from the system.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Refresh button */}
            <button
              onClick={fetchWoods}
              disabled={loading}
              className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 transition disabled:opacity-50"
              title="Refresh inventory"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {/* Add Wood Button - BLUE */}
            <button
              onClick={handleOpenAdd}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/15 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Plus className="mr-1.5 h-5 w-5" />
              Add Wood
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm font-medium">{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Inventory Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading && woods.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <p className="text-slate-500 text-sm font-medium">Loading inventory data...</p>
            </div>
          ) : woods.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
              <HelpCircle className="h-12 w-12 text-slate-300" />
              <div>
                <h3 className="text-base font-bold text-slate-800">No wood entries found</h3>
                <p className="text-slate-500 text-sm mt-1">Get started by creating a new entry above.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  {/* Table Header Row: Blue background with white text */}
                  <tr className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Origin</th>
                    <th className="px-6 py-4">Color</th>
                    <th className="px-6 py-4">Density</th>
                    <th className="px-6 py-4">Moisture</th>
                    <th className="px-6 py-4">Grade</th>
                    <th className="px-6 py-4 text-center">Stock</th>
                    <th className="px-6 py-4">Price per Unit</th>
                    <th className="px-6 py-4 text-center">Completed (Available)</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                {/* Rows alternate white and light-gray */}
                <tbody className="divide-y divide-slate-100 text-sm">
                  {woods.map((wood, idx) => (
                    <tr 
                      key={wood._id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                      }`}
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">{wood.name}</td>
                      <td className="px-6 py-4 text-slate-600">{wood.typewood}</td>
                      <td className="px-6 py-4 text-slate-600">{wood.origin}</td>
                      <td className="px-6 py-4 text-slate-600">{wood.color}</td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">{wood.density}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs">{wood.moistureContent || '12% (KD)'}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs font-semibold">{wood.grade || 'Premium'}</td>
                      <td className="px-6 py-4 text-center text-slate-700 font-bold">{wood.stockQuantity !== undefined ? wood.stockQuantity : 100}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">₹{Number(wood.pricePerUnit).toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-center">
                        {wood.completed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        {/* Edit Button - BLUE */}
                        <button
                          onClick={() => handleOpenEdit(wood)}
                          className="inline-flex p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition border border-transparent hover:border-blue-100"
                          title="Edit"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </button>
                        {/* Delete Button - RED */}
                        <button
                          onClick={() => handleDelete(wood._id, wood.name)}
                          className="inline-flex p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100"
                          title="Delete"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Wood Modal */}
      <WoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        woodData={selectedWood}
      />
    </div>
  );
};

export default CMS;
