import React, { useState } from 'react';
import api from '../api';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Your email is required';
    } else if (!/.+\@.+\..+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post('/api/contact', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get in touch soon.'
      });
      // Reset Form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.error || 'Failed to deliver message. Check backend connection.';
      setSubmitStatus({
        type: 'error',
        message: errMsg
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 flex-grow py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Get In Touch */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 uppercase tracking-wider mb-4">
                Contact Us
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Get in Touch
              </h1>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Have questions about our timber varieties, density, pricing, or custom freight orders? Send us a message and our support team will respond within 24 hours.
              </p>
            </div>

            {/* Info Cards with Teal Left Border */}
            <div className="space-y-4">
              
              {/* Address */}
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-cyan-400 border border-y-slate-200 border-r-slate-200 flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Registered Office</h3>
                  <p className="text-slate-500 text-sm mt-1">📍 Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-cyan-400 border border-y-slate-200 border-r-slate-200 flex items-start space-x-4">
                <Mail className="h-6 w-6 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email Address</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    <a href="mailto:hello@example.com" className="hover:text-cyan-600 transition-colors">
                      hello@example.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-cyan-400 border border-y-slate-200 border-r-slate-200 flex items-start space-x-4">
                <Phone className="h-6 w-6 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Phone Support</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    <a href="tel:+919876543210" className="hover:text-cyan-600 transition-colors">
                      +91 9876543210
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Send Message Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Message</h2>

              {/* Feedback Alert */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {submitStatus.type === 'success' 
                    ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    : <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <span className="text-sm font-medium">{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-3 py-2.5 rounded-lg border ${
                        errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                      } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Your Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-3 py-2.5 rounded-lg border ${
                        errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                      } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Timber pricing inquiry"
                    className={`w-full px-3 py-2.5 rounded-lg border ${
                      errors.subject ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                    } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all`}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your wood specifications or general requirements..."
                    rows="5"
                    className={`w-full px-3 py-2.5 rounded-lg border ${
                      errors.message ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-cyan-200'
                    } focus:outline-none focus:ring-4 focus:border-cyan-500 transition-all resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 rounded-xl text-sm font-bold shadow-md shadow-cyan-500/15 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4.5 w-4.5" />
                      Send Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
