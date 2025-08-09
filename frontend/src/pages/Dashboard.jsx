import React, { useEffect, useState } from 'react'
import DashboardStats from '../components/DashboardStats'
import UpcomingAppointments from '../components/UpcomingAppoitments'
import RecentPatients from '../components/RecentPatients'



const Dashboard = () => {
  const [user,setUser] = useState();
  

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
      })
      const data = await response.json();
      setUser(data);
    }
    catch (error) {
      console.error(error);
    }

  useEffect(()=>{
   getUser()
  },[])
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Dr. Sarah. Here's your hospital overview.</p>
        </div>
        
        <DashboardStats/>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <RecentPatients/>
          </div>
          <div>
            <UpcomingAppointments/>
            <div className="mt-8">
              {/* <QuickActions /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
