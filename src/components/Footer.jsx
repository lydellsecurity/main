import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-16 border-t ${theme === 'dark' ? 'bg-obsidian border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 border flex items-center justify-center ${theme === 'dark' ? 'border-cobalt-500/50' : 'border-cobalt-600/50'}`}>
                <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-cobalt-500' : 'bg-cobalt-600'}`} />
              </div>
              <span className={`font-mono text-lg tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                LYDELL<span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>SECURITY</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-md ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Elite incident response for organizations that refuse to be the next headline.
              Twenty years defending the institutions that move markets.
            </p>
            <div className="flex gap-4 mt-6">
              {['linkedin', 'twitter'].map((social) => (
                <a key={social} href="#" className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-200 text-slate-600 hover:text-slate-900'}`}>
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'linkedin' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>}
                    {social === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`font-mono text-xs uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Services</h4>
            <ul className="space-y-3 text-sm">
              {['AI Ransomware Response', 'Identity Breach Containment', 'Digital Sovereignty Restoration', 'IR Retainer Programs'].map((item) => (
                <li key={item}><Link to="/response" className={`transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`font-mono text-xs uppercase tracking-wider mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Emergency</h4>
            <div className="space-y-3 text-sm">
              <p className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>24/7 Hotline</span><br />
                <span className={`font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>+1 (888) IR-RAPID</span>
              </p>
              <p className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>
                <span className={theme === 'dark' ? 'text-cobalt-400' : 'text-cobalt-600'}>Secure Email</span><br />
                <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>response@lydellsecurity.com</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
            © {new Date().getFullYear()} Lydell Security. All rights reserved.
          </p>
          <div className={`flex gap-6 text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>
            <Link to="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/security" className="hover:text-slate-400">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
