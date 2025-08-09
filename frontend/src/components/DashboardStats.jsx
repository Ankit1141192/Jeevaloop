export default function DashboardStats() {
  const stats = [
    { title: "Total Patients", value: "1,247", change: "+12%", changeType: "positive", icon: "ri-user-heart-line" },
    { title: "Today's Appointments", value: "23", change: "+5%", changeType: "positive", icon: "ri-calendar-check-line" },
    { title: "Pending Reports", value: "8", change: "-15%", changeType: "negative", icon: "ri-file-text-line" },
    { title: "Available Beds", value: "45", change: "0%", changeType: "neutral", icon: "ri-hotel-bed-line" },
  ];

  const fetchPatients = async () => {
    try {
      const response = await fetch("https://jeevaloop.onrender.com/patients");
      // Handle data here if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
        >
          {/* Top Section */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <i className={`${stat.icon} text-xl text-blue-600 dark:text-blue-300`}></i>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "negative"
                  ? "text-red-600"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
