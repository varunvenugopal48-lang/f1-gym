// src/App.jsx
import React, { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', goal: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });

    try {
      // Sending data to our Node.js Backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', goal: '', message: '' }); // Clear form
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setSubmitStatus({ loading: false, success: false, error: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setSubmitStatus({ loading: false, success: false, error: 'Failed to connect to the server.' });
    }
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen font-sans selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-3xl font-black tracking-tighter text-white uppercase italic">F1<span className="text-red-600">GYM</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-neutral-300 hover:text-red-500 transition-colors font-medium">About</a>
              <a href="#services" className="text-neutral-300 hover:text-red-500 transition-colors font-medium">Services</a>
              <a href="#memberships" className="text-neutral-300 hover:text-red-500 transition-colors font-medium">Plans</a>
              <a href="#trainers" className="text-neutral-300 hover:text-red-500 transition-colors font-medium">Trainers</a>
              <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">
                Join Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:text-red-500">About</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:text-red-500">Services</a>
              <a href="#memberships" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white hover:text-red-500">Plans</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-red-500">Join Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex items-center min-h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym interior" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-tight mb-6">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Strength.</span><br/>
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Discipline.</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-10 font-light max-w-lg">
              Indirapuram's most spacious and fully equipped fitness facility. Expert trainers, state-of-the-art machines, and a community that pushes you further.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white text-center px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-red-600/30">
                Start Your Free Trial
              </a>
              <a href="#about" className="border border-neutral-600 hover:border-white text-white text-center px-8 py-4 rounded-full font-bold text-lg transition-all">
                Explore Facilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About & Stats */}
      <section id="about" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 border-l-4 border-red-600 pl-4">More Than Just A Gym</h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Located on the 2nd floor of Aditya Mall, F1 Gym offers a massive 2-floor layout dedicated to your transformation. The lower floor focuses on pure strength training with well-maintained, state-of-the-art machines.
              </p>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Head upstairs to our dedicated cardio and CrossFit section. With ample treadmills and cycles, you never have to wait. Post-workout, relax in our steam bath or grab a healthy bite at our in-house cafe.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-neutral-800 p-4 rounded-lg bg-neutral-900">
                  <h3 className="text-3xl font-black text-red-500 mb-1">2</h3>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider font-bold">Massive Floors</p>
                </div>
                <div className="border border-neutral-800 p-4 rounded-lg bg-neutral-900">
                  <h3 className="text-3xl font-black text-red-500 mb-1">10+</h3>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider font-bold">Certified Trainers</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" alt="Gym Equipment" className="rounded-xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-red-600 p-6 rounded-xl shadow-xl hidden sm:block">
                <p className="text-2xl font-black italic">"Top Rated in<br/>Indirapuram"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {['Strength Training', 'CrossFit & Functional', 'Personal Training', 'Cardio Fitness', 'Weight Loss Programs', 'Steam & Recovery'].map((service, index) => (
              <div key={index} className="bg-neutral-950 p-8 rounded-xl border border-neutral-800 hover:border-red-600 transition-colors group cursor-pointer">
                <div className="w-14 h-14 bg-red-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <div className="w-6 h-6 bg-red-600 rounded-sm group-hover:bg-white transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold mb-3">{service}</h3>
                <p className="text-neutral-400 text-sm">Professional equipment and guidance designed to help you excel in {service.toLowerCase()} safely and effectively.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section id="memberships" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Membership Plans</h2>
            <p className="text-neutral-400">Pocket-friendly pricing. Premium facilities.</p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-bold text-neutral-300 mb-2 uppercase">1 Month</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black">₹2,500</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Full Gym Access</li>
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Cardio & Strength Floors</li>
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> General Floor Guidance</li>
              </ul>
              <a href="#contact" className="w-full block text-center border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-3 rounded-lg font-bold transition-colors">Select Plan</a>
            </div>

            {/* Card 2 - Highlighted */}
            <div className="bg-gradient-to-b from-red-900/40 to-neutral-900 border-2 border-red-600 rounded-2xl p-8 flex flex-col transform md:-translate-y-4 shadow-2xl shadow-red-900/20 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">MOST POPULAR</div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">3 Months</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black">₹6,000</span>
                <span className="text-neutral-400 line-through">₹7,500</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-white"><span className="text-red-500 mr-2">✓</span> Full Gym Access</li>
                <li className="flex items-center text-white"><span className="text-red-500 mr-2">✓</span> Cardio & Strength Floors</li>
                <li className="flex items-center text-white"><span className="text-red-500 mr-2">✓</span> Steam Bath Access</li>
                <li className="flex items-center text-white"><span className="text-red-500 mr-2">✓</span> 1 Free PT Session</li>
              </ul>
              <a href="#contact" className="w-full block text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors shadow-lg">Select Plan</a>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col">
              <h3 className="text-xl font-bold text-neutral-300 mb-2 uppercase">1 Year</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black">₹18,000</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Full Gym Access</li>
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Unlimited Steam Bath</li>
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Diet Plan Consultation</li>
                <li className="flex items-center text-neutral-400"><span className="text-red-500 mr-2">✓</span> Freeze Option (30 Days)</li>
              </ul>
              <a href="#contact" className="w-full block text-center border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-3 rounded-lg font-bold transition-colors">Select Plan</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">What Our Members Say</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Shreya Rastogi", review: "F1 Gym feels like a second home to me. I find so much peace here, and the environment is extremely positive. My trainer, Mukesh Sharma, is truly one of the best." },
              { name: "Satvik Sharma", review: "Probably the best gym in the town. The trainers are great especially Vikas Nagar bhaiya. He has been very supportive throughout my journey." },
              { name: "Jaskaran Singh", review: "One of the most spacious and well equipped gyms in Indirapuram. Machines are well maintained. The cardio section is upstairs, so you don't have to wait." }
            ].map((t, i) => (
              <div key={i} className="bg-neutral-950 p-8 rounded-xl border border-neutral-800">
                <div className="flex text-red-500 mb-4">★★★★★</div>
                <p className="text-neutral-300 italic mb-6">"{t.review}"</p>
                <div className="font-bold text-white uppercase tracking-wider">{t.name}</div>
                <div className="text-xs text-neutral-500">Local Guide</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Free Trial Form */}
      <section id="contact" className="py-20 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col lg:flex-row">
            
            {/* Contact Info */}
            <div className="bg-red-600 p-10 lg:w-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-black uppercase mb-6 text-white">Visit F1 Gym</h2>
                <p className="text-red-100 mb-10 leading-relaxed">Ready to transform your life? Drop by for a tour, or book your free trial today to experience our premium equipment and expert guidance firsthand.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-red-500 p-2 rounded-full">📍</div>
                    <div>
                      <h4 className="font-bold text-white">Location</h4>
                      <p className="text-red-100 text-sm mt-1">2nd floor, Aditya Mall, Aditya Mega City, Vaibhav Khand, Indirapuram, Ghaziabad, UP 201014</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-red-500 p-2 rounded-full">📞</div>
                    <div>
                      <h4 className="font-bold text-white">Phone</h4>
                      <p className="text-red-100 text-sm mt-1">096677 55485</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-red-500 p-2 rounded-full">🕒</div>
                    <div>
                      <h4 className="font-bold text-white">Hours</h4>
                      <p className="text-red-100 text-sm mt-1">Open Daily: Closes at 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-10 lg:p-14 lg:w-3/5">
              <h2 className="text-2xl font-bold uppercase mb-2">Claim Your Free Trial</h2>
              <p className="text-neutral-400 mb-8">Fill out the details below and our trainers will get back to you.</p>
              
              {submitStatus.success && (
                <div className="mb-6 bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg flex items-center">
                  <span className="mr-2">✓</span> {submitStatus.message || "Request sent successfully! We'll contact you soon."}
                </div>
              )}

              {submitStatus.error && (
                <div className="mb-6 bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
                  <span className="mr-2">⚠</span> {submitStatus.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Fitness Goal</label>
                  <select name="goal" value={formData.goal} onChange={handleInputChange} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors">
                    <option value="">Select a goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="general_fitness">General Fitness</option>
                    <option value="crossfit">CrossFit</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={submitStatus.loading}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors uppercase tracking-wider ${submitStatus.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {submitStatus.loading ? 'Sending Request...' : 'Book Free Trial'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">F1<span className="text-red-600">GYM</span></span>
            <p className="text-neutral-500 text-sm mt-2">© {new Date().getFullYear()} F1 Gym Indirapuram. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
             <a href="#" className="text-neutral-500 hover:text-red-500">Instagram</a>
             <a href="#" className="text-neutral-500 hover:text-red-500">Facebook</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919667755485?text=Hi,%20I'm%20interested%20in%20joining%20F1%20Gym!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.003-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </div>
  );
}