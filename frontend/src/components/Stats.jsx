import React from "react";
export default function Stats() {
  const stats = [
    {
      number: '5,000+',
      label: 'Patients Managed',
      icon: 'ri-user-heart-line'
    },
    {
      number: '99.9%',
      label: 'System Uptime',
      icon: 'ri-shield-check-line'
    },
    {
      number: '150+',
      label: 'Healthcare Facilities',
      icon: 'ri-hospital-line'
    },
    {
      number: '24/7',
      label: 'Technical Support',
      icon: 'ri-customer-service-line'
    }
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Trusted Healthcare Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of healthcare facilities that trust our platform to deliver exceptional patient care and streamlined operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-3xl text-gray-600`}></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2">{stat.number}</div>
              <div className="text-xl text-gray-160">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}