import React from "react";

export default function Feature() {
  const features = [
    {
      icon: "ri-user-heart-line",
      title: "Patient Record Management",
      description:
        "Comprehensive digital patient records with secure access, medical history tracking, and real-time updates for healthcare professionals.",
      image:
        "https://media.istockphoto.com/id/1480239219/photo/an-analyst-uses-a-computer-and-dashboard-for-data-business-analysis-and-data-management.jpg?s=612x612&w=0&k=20&c=URv6HYZ8L3NCQnxT8-ITvInMW7mlsTE6EjnXHaqF-H4=",
    },
    {
      icon: "ri-calendar-check-line",
      title: "Appointment Scheduling",
      description:
        "Smart appointment booking system with automated reminders, doctor availability tracking, and seamless patient-doctor coordination.",
      image:
        "https://media.istockphoto.com/id/1658546576/photo/2024-calendar-event-planning-timetable-agenda-plan-on-organize-schedule-event-planner-agenda.jpg?s=612x612&w=0&k=20&c=pZ5YYUxHO6FsXMtV8D3v_5k5Yfhx6xu_eLub7rXqxjc=",
    },
    {
      icon: "ri-shield-cross-line",
      title: "Secure & HIPAA Compliant",
      description:
        "Enterprise-grade security with role-based access control, encrypted data storage, and full compliance with healthcare regulations.",
      image:
        "https://readdy.ai/api/search-image?query=Medical%20data%20security%20shield%20with%20lock%20symbols%2C%20encrypted%20patient%20information%20protection%2C%20and%20healthcare%20compliance%20icons%20in%20professional%20blue%20design&width=300&height=200&seq=security-001&orientation=landscape",
    },
    {
      icon: "ri-line-chart-line",
      title: "Analytics & Reporting",
      description:
        "Advanced data visualization tools for patient statistics, treatment outcomes, and hospital performance metrics with interactive dashboards.",
      image:
        "https://readdy.ai/api/search-image?query=Medical%20analytics%20dashboard%20with%20health%20statistics%20charts%2C%20patient%20data%20visualization%2C%20and%20hospital%20performance%20metrics%20in%20modern%20interface%20design&width=300&height=200&seq=analytics-001&orientation=landscape",
    },
    {
      icon: "ri-file-text-line",
      title: "Medical Documentation",
      description:
        "Digital document management for test results, medical reports, imaging studies with secure upload and organized storage systems.",
      image:
        "https://readdy.ai/api/search-image?query=Medical%20documents%20and%20reports%20organized%20in%20digital%20filing%20system%20with%20patient%20test%20results%2C%20medical%20charts%2C%20and%20healthcare%20documentation%20interface&width=300&height=200&seq=documents-001&orientation=landscape",
    },
    {
      icon: "ri-smartphone-line",
      title: "Mobile Access",
      description:
        "Mobile-responsive design allowing doctors and patients to access critical information anytime, anywhere with secure authentication.",
      image:
        "https://media.istockphoto.com/id/1793429641/photo/doctor-nurses-and-team-cellphone-night-or-online-communication-medical-solution-group.jpg?s=612x612&w=0&k=20&c=07l7o7zpYTVZcGlOf-v7zwnb-PZ44eAOcp6sh0AZ6Eg=",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful features designed to transform your healthcare facility's operations and enhance patient care delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="mb-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className={`${feature.icon} text-2xl text-blue-600`}></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
