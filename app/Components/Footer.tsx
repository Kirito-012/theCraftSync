'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Send, ArrowRight, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setTimeout(() => {
          setIsDialogOpen(false);
          setNewsletterEmail('');
          setSubscriptionStatus('idle');
        }, 2000);
      } else {
        setSubscriptionStatus('error');
      }
    } catch (error) {
      setSubscriptionStatus('error');
    }
  };

  const services = [
    'Custom Software Development',
    'AI & Machine Learning Solutions',
    'Enterprise Platforms',
    'Business Intelligence & Analytics',
    'Technology Consulting'
  ];

  const footerLinks = [
    { name: 'Contact', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'How We Work', href: '/how-we-work' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Bluesky', icon: Send, href: '#' }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section - Logo and Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-white/10"
        >
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <img 
              src="/logo.png" 
              alt="TheCraftsync Logo" 
              className="h-16 w-16"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2">TheCraftsync</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Custom software, AI & enterprise digital solutions
              </p>
            </div>
          </div>

          {/* Email */}
          <a
            href="mailto:connect@thecraftsync.com"
            className="text-[clamp(1rem,8vw,3.5rem)] font-light hover:text-gray-400 transition-colors duration-300 break-all leading-tight"
          >
            connect@thecraftsync.com
          </a>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Connect</h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={social.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="text-base">{social.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Explore</h3>
            <div className="space-y-4">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="text-base">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Our Services</h3>
            <div className="flex flex-wrap gap-3">
              {services.map((service, index) => (
                <motion.button
                  key={service}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="px-4 py-2 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300 bg-white/5"
                >
                  {service}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-start md:justify-end h-full md:items-start lg:items-center">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                Sign up to our newsletter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10 border-t border-white/10"
        >
          {/* Copyright */}
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} TheCraftsync · Custom Solutions for Custom Visions
          </p>

          {/* Status/Badge */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              All systems operational
            </div>
          </div>
        </motion.div>
      </div>

      {/* Newsletter Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDialogOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50"
            >
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-400 text-sm">
                  Get the latest updates, articles, and resources sent straight to your inbox.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={subscriptionStatus === 'submitting' || subscriptionStatus === 'success'}
                    className="w-full px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {subscriptionStatus === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : subscriptionStatus === 'success' ? (
                      'Subscribed!'
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {subscriptionStatus === 'error' && (
                    <p className="text-red-400 text-xs text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  {subscriptionStatus === 'success' && (
                    <p className="text-emerald-400 text-xs text-center">
                      Successfully subscribed! Check your inbox soon.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </footer>
  );
}
