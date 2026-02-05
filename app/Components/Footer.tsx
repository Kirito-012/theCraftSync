'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Send, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
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
              <Link
                href="/newsletter"
                className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                Sign up to our newsletter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </footer>
  );
}
