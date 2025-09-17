'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "bootstrap-icons/font/bootstrap-icons.css";
import CircularText from './CircularText';

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);


  const navItems = [
    { name: 'Home', href: '/', icon: 'bi-house-door' },
    { name: 'About Us', href: '/about', dropdown: true, icon: 'bi-info-circle' },
    { name: 'My Services', href: '/my-services', dropdown: true, icon: 'bi-gear' },
    { name: 'Additional Services', href: '/additional-services', dropdown: true, icon: 'bi-layers' },
    { name: 'Help & FAQs', href: '/help-faqs', icon: 'bi-question-circle' },
    { name: 'sign in/sign up', href: '/sign-up-in', icon: 'bi-box-arrow-in-right' },
    { name: 'Contact Us', href: '/contact-us', icon: 'bi-telephone' },
  ];

  // About dropdown
  const aboutItems = [
    { name: 'Image Gallery', href: '/about/image-gallery', icon: 'bi-image' },
    { name: 'Video Gallery', href: '/about/video-gallery', icon: 'bi-camera-video' },
    { name: 'Achievements', href: '/about/achievements', icon: 'bi-trophy' },
  ];

  //  Services dropdown
  const services = [
    { name: 'Company Incorporation', href: '/my-services/incorporation', icon: 'bi-building' },
    { name: 'Annual Filings & ROC Compliance', href: '/my-services/annual-filings', icon: 'bi-journal-check' },
    { name: 'Secretarial Audit', href: '/my-services/secretarial-audit', icon: 'bi-search' },
    { name: 'Share Allotment & Transfer', href: '/my-services/share-transfer', icon: 'bi-people' },
    { name: 'Board Meetings & Resolutions', href: '/my-services/board-meetings', icon: 'bi-clipboard-check' },
    { name: 'Trademark Filing', href: '/my-services/trademark', icon: 'bi-patch-check' },
    { name: 'FEMA & RBI Compliances', href: '/my-services/fema-rbi', icon: 'bi-bank' },
    { name: 'GST & Regulatory Compliances', href: '/my-services/gst', icon: 'bi-receipt' },
    { name: 'Startup Advisory', href: '/my-services/startup-advisory', icon: 'bi-lightbulb' },
    { name: 'ROC Matters', href: '/my-services/roc', icon: 'bi-briefcase' },
    { name: 'BSE Compliances', href: '/my-services/bse', icon: 'bi-bar-chart' },
    { name: 'NSE Compliances', href: '/my-services/nse', icon: 'bi-graph-up' },
    { name: 'RBI Approvals & Filings', href: '/my-services/rbi', icon: 'bi-cash-stack' },
    { name: 'NCLT Representation', href: '/my-services/nclt', icon: 'bi-file-earmark-text' },
    { name: 'NCLAT Appeals', href: '/my-services/nclat', icon: 'bi-file-earmark-medical' },
  ];

  //  Additional dropdown
  const additional = [
    { name: 'Accounting & Bookkeeping', href: '/additional-services/accounting', icon: 'bi-calculator' },
    { name: 'Payroll Management', href: '/additional-services/payroll', icon: 'bi-wallet2' },
    { name: 'Tax Planning & Filing', href: '/additional-services/tax', icon: 'bi-percent' },
    { name: 'Business Advisory', href: '/additional-services/advisory', icon: 'bi-briefcase-fill' },
    { name: 'Legal Drafting', href: '/additional-services/legal', icon: 'bi-file-earmark-text' },
    { name: 'Investment Compliance', href: '/additional-services/investment', icon: 'bi-piggy-bank' },
  ];

  return (
    <>
      <nav className=" p-6 text-[16px] relative z-50 ">
        <div className="flex justify-between items-center max-w-8xl mx-auto px-2 text-[bold]">
          <CircularText
            text="SK*DWIVEDI*&*ASSOCIATES*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class mr-96"
          />
          {/* Left - Logo & Company Name */}
          <div className="text-white"></div>

          {/* Right - Nav Items */}
          <ul className="flex gap-1">
            {navItems.map(item => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

              //  Handle dropdown items
              if (item.dropdown) {
                let dropdownItems = [];
                if (item.name === 'My Services') dropdownItems = services;
                else if (item.name === 'Additional Services') dropdownItems = additional;
                else if (item.name === 'About Us') dropdownItems = aboutItems;

                return (
                  <li key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-2 py-1 rounded-md ${isActive ? 'text-shadow-cyan-950-600 font-bold' : 'text-white'
                        } hover:text-white`}
                    >
                      <i className={`bi ${item.icon} text-lg`}></i>
                      <span>{item.name}</span>
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 mt-0 hidden group-hover:block ${item.name === 'About Us' ? 'w-[200px]' : 'w-[400px]'
                        } bg-black/85 text-white  rounded-md shadow-lg z-50 `}
                    >
                      <ul
                        className={`p-2 ${item.name === 'About Us'
                          ? 'flex flex-col gap-1'
                          : 'grid grid-cols-2 gap-1'
                          }`}
                      >
                        {dropdownItems.map(service => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 hover:text-black"
                            >
                              <i className={`bi ${service.icon} text-base`}></i>
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              //  Normal Nav Items
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-300 ${isActive ? 'text-white font-bold' : 'text-white'
                      }`}
                  >
                    <i className={`bi ${item.icon} text-lg`}></i>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
export const metadata = {
  title: "skdassociates",
  description: "Generated by create next app",
};
