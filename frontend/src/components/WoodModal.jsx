import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const WoodModal = ({ isOpen, onClose, onSubmit, woodData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    typewood: 'Hardwood',
    origin: '',
    color: '',
    density: '',
    pricePerUnit: '',
    moistureContent: '',
    usage: '',
    grade: '',
    stockQuantity: '',
    description: '',
    completed: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate data when editing
  useEffect(() => {
    if (woodData) {
      setFormData({
        name: woodData.name || '',
        typewood: woodData.typewood || 'Hardwood',
        origin: woodData.origin || '',
        color: woodData.color || '',
        density: woodData.density || '',
        pricePerUnit: woodData.pricePerUnit || '',
        moistureContent: woodData.moistureContent || '',
        usage: woodData.usage || '',
        grade: woodData.grade || '',
        stockQuantity: woodData.stockQuantity !== undefined ? woodData.stockQuantity : '',
        description: woodData.description || '',
        completed: woodData.completed || false
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        typewood: 'Hardwood',
        origin: '',
        color: '',
        density: '',
        pricePerUnit: '',
        moistureContent: '12% (Kiln-Dried)',
        usage: 'Furniture, Cabinetry',
        grade: 'Premium Grade',
        stockQuantity: '100',
        description: '',
        completed: false
      });
      setErrors({});
    }
  }, [woodData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Wood name is required';
    if (!formData.typewood.trim()) newErrors.typewood = 'Typewood is required';
    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.color.trim()) newErrors.color = 'Color is required';
    if (!formData.density.trim()) newErrors.density = 'Density description is required (e.g. 720 kg/m³)';
    
    if (formData.pricePerUnit === '' || formData.pricePerUnit === null) {
      newErrors.pricePerUnit = 'Price per unit is required';
    } else if (isNaN(formData.pricePerUnit) || Number(formData.pricePerUnit) < 0) {
      newErrors.pricePerUnit = 'Price must be a positive number';
    }

    if (formData.stockQuantity !== '' && formData.stockQuantity !== null) {
      if (isNaN(formData.stockQuantity) || Number(formData.stockQuantity) < 0) {
        newErrors.stockQuantity = 'Stock quantity must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        pricePerUnit: Number(formData.pricePerUnit),
        stockQuantity: formData.stockQuantity !== '' ? Number(formData.stockQuantity) : undefined
      });
      onClose();
    } catch (err) {
      console.error('Submission error:', err);
      // Backend error format mapping
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ global: 'Failed to save wood entry. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all flex flex-col max-h-[95vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">
            {woodData ? 'Edit Wood Entry' : 'Add New Wood Type'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errors.global && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {errors.global}
            </div>
          )}

          {/* Grid Layout for Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Wood Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Burmese Teak"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Typewood */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Type *
              </label>
              <select
                name="typewood"
                value={formData.typewood}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 focus:outline-none transition-all"
              >
                <option value="Hardwood">Hardwood</option>
                <option value="Softwood">Softwood</option>
                <option value="Engineered Wood">Engineered Wood</option>
                <option value="Composite Wood">Composite Wood</option>
              </select>
            </div>

            {/* Price (INR - ₹) */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Price per Unit (INR - ₹) *
              </label>
              <input
                type="number"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                placeholder="e.g. 35000"
                min="0"
                step="1"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.pricePerUnit ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.pricePerUnit && <p className="mt-1 text-xs text-red-500">{errors.pricePerUnit}</p>}
            </div>

            {/* Origin */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Origin *
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. Myanmar, India"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.origin ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.origin && <p className="mt-1 text-xs text-red-500">{errors.origin}</p>}
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Color *
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Golden Brown"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.color ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.color && <p className="mt-1 text-xs text-red-500">{errors.color}</p>}
            </div>

            {/* Density */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Density *
              </label>
              <input
                type="text"
                name="density"
                value={formData.density}
                onChange={handleChange}
                placeholder="e.g. 680 kg/m³"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.density ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.density && <p className="mt-1 text-xs text-red-500">{errors.density}</p>}
            </div>

            {/* Moisture Content */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Moisture Content
              </label>
              <input
                type="text"
                name="moistureContent"
                value={formData.moistureContent}
                onChange={handleChange}
                placeholder="e.g. 12% (Kiln-Dried)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Wood Grade
              </label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g. FAS Premium"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Stock Quantity (Units)
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="e.g. 250"
                min="0"
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.stockQuantity ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
              />
              {errors.stockQuantity && <p className="mt-1 text-xs text-red-500">{errors.stockQuantity}</p>}
            </div>

            {/* Recommended Usage */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Recommended Usage
              </label>
              <input
                type="text"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                placeholder="e.g. Flooring, Outdoor Decking"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Completed status */}
            <div className="flex items-center h-full pt-6 pl-1 sm:col-span-2">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 transition"
                />
                <span className="ml-2 text-sm font-semibold text-slate-700">Completed (Available in Stock)</span>
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write detailed specifications or notes..."
                rows="3"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-4 focus:ring-cyan-200 focus:border-cyan-500 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Entry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WoodModal;
