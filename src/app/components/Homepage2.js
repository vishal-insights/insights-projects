import React from 'react';
import styles from './Homepage2.module.css';
import SplashCursor from '@/components/SplashCursor';

const services = [
  { title: "Secretarial & Legal Compliance", icon: "bi-shield-check" },
  { title: "Audit & Due Diligence", icon: "bi-search" },
  { title: "Corporate Restructuring", icon: "bi-diagram-3" },
  { title: "SEBI & Listed Entity Compliances", icon: "bi-bank" },
  { title: "Insolvency & Bankruptcy", icon: "bi-exclamation-triangle" },
  { title: "Corporate Social Responsibility", icon: "bi-people" },
  { title: "Governance Risk & Compliance", icon: "bi-clipboard-check" },
  { title: "Startup & Business Advisory", icon: "bi-lightbulb" },
  { title: "ESG Reporting & Sustainability", icon: "bi-bar-chart-line" },
  { title: "Intellectual Property Rights", icon: "bi-file-earmark-lock" },
  { title: "FEMA & RBI Compliances", icon: "bi-currency-exchange" },
  { title: "Mergers & Acquisitions", icon: "bi-link-45deg" },
  { title: "Board Meeting Management", icon: "bi-people-fill" },
  { title: "Labour Law Compliance", icon: "bi-briefcase" },
  { title: "Contract Drafting & Vetting", icon: "bi-journal-text" },
];

const Homepage2 = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.animatedBg}></div>

      <div className={styles.overlay}>
        <h1 className="text-white text-center mb-4 text-2xl">Expertise-Driven Segments</h1>

        <div className={styles.bigCard}>
          <div className={styles.grid}>
            {services.map((service, index) => (
              <div key={index} className={styles.card}>
                <i className={`bi ${service.icon} ${styles.icon}`}></i>
                <h5>{service.title}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <SplashCursor />
    </>
  );
};

export default Homepage2;
