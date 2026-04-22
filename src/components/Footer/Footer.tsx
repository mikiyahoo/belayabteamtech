// src/components/Footer/Footer.tsx
import { 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

const solutions = [
  { name: 'Digital Transformation', href: '/solutions/digital-transformation' },
  { name: 'Infrastructure', href: '/solutions/infrastructure' },
  { name: 'Cybersecurity', href: '/solutions/cybersecurity' },
  { name: 'Smart Systems', href: '/solutions/smart-systems' },
];

const company = [
  { name: 'Our Story', href: '/our-story' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Partner Ecosystem', href: '/partners' },
  { name: 'Process', href: '/process' },
  { name: 'Careers', href: '/careers' },
  { name: 'Newsroom', href: '/newsroom' },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Increased vertical padding here */}
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative w-48 h-12 mb-6">
                <Image
                  src="/assets/images/logos/BelayAbTeam Tech Logo.svg"
                  alt="BelayAb Team Technologies"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-body text-white/70 text-lg leading-relaxed">
                Leading the future of digital transformation in East Africa as a proud member of the BelayAb Group.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-heading text-xl text-primary font-bold mb-6">Solutions</h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-body text-white/70 hover:text-primary transition-colors duration-300 text-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-xl text-primary font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-body text-white/70 hover:text-primary transition-colors duration-300 text-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-primary font-bold mb-6">Get in touch</h4>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <span className="font-body text-white/70 text-lg">
                Unic-Ethiopia Bole Bldg. 5th Flr, Addis Ababa
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <a
                  href="tel:+251912677848"
                  className="font-body text-white/70 hover:text-primary transition-colors duration-300 text-lg"
                >
                  +251 91 267 7848
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@belayabteamtech.com"
                  className="font-body text-white/70 hover:text-primary transition-colors duration-300 text-lg"
                >
                  hello@belayabteamtech.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Increased spacing */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-white/50 text-base mb-4 md:mb-0">
            © 2026 BelayAb Team Technologies PLC. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-body font-semibold text-white/70 text-base">
              Platinum Taxpayer Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}