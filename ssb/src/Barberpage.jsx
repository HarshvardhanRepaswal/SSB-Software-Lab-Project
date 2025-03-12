import { useState } from 'react'
import {  FaUser, FaLock, FaEye, FaEyeSlash, FaCalendar, FaClock, FaCheck, FaTimes, FaUserCircle } from 'react-icons/fa'

function BarberPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [activeTab, setActiveTab] = useState('pending')
  
  // Mock data for demonstration
  const pendingAppointments = [
    {
      id: '1',
      customerName: 'Michael Brown',
      service: 'Classic Haircut',
      date: '2025-03-15',
      time: '10:00 AM',
      phone: '(555) 123-4567',
      notes: 'First time customer'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      service: 'Haircut & Beard Trim',
      date: '2025-03-15',
      time: '11:30 AM',
      phone: '(555) 987-6543',
      notes: ''
    },
    {
      id: '3',
      customerName: 'Robert Davis',
      service: 'Hot Towel Shave',
      date: '2025-03-16',
      time: '2:00 PM',
      phone: '(555) 456-7890',
      notes: 'Prefers hot towel extra hot'
    }
  ]
  
  const confirmedAppointments = [
    {
      id: '4',
      customerName: 'Jennifer Wilson',
      service: 'Classic Haircut',
      date: '2025-03-15',
      time: '9:30 AM',
      phone: '(555) 234-5678',
      notes: ''
    },
    {
      id: '5',
      customerName: 'David Martinez',
      service: 'Beard Trim',
      date: '2025-03-16',
      time: '11:00 AM',
      phone: '(555) 876-5432',
      notes: 'Regular customer'
    }
  ]

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt with:', loginData)
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll just set isLoggedIn to true
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleAccept = (id) => {
    // In a real app, you would update the appointment status in your backend
    console.log(`Accepting appointment ${id}`)
    alert(`Appointment ${id} accepted successfully!`)
  }

  const handleReject = (id) => {
    // In a real app, you would update the appointment status in your backend
    console.log(`Rejecting appointment ${id}`)
    alert(`Appointment ${id} rejected.`)
  }

  // If not logged in, show login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              {/* <FaScissors className="h-6 w-6 text-blue-600" /> */}
              <span>CutNStyle</span>
            </div>
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Back to Home
            </a>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Barber Login</h1>
                <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <a href="#" className="text-xs text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Contact management
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 py-6 text-gray-300">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} CutNStyle Barber Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  // If logged in, show dashboard
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-xl">
              {/* <FaScissors className="h-6 w-6 text-blue-600" /> */}
              <span>CutNStyle</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <FaUserCircle className="h-5 w-5 text-gray-600" />
                <span className="font-medium">John Smith</span>
              </div>
              <button 
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop only */}
        <div className="hidden md:flex w-64 flex-col border-r bg-white">
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 rounded-md bg-blue-50 text-blue-700">
              <FaCalendar className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="mt-2 flex items-center gap-3 p-3 rounded-md hover:bg-gray-100">
              <FaClock className="h-5 w-5 text-gray-500" />
              <span>My Schedule</span>
            </div>
            <div className="mt-2 flex items-center gap-3 p-3 rounded-md hover:bg-gray-100">
              <FaUserCircle className="h-5 w-5 text-gray-500" />
              <span>Profile</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Barber Dashboard</h1>
              <p className="text-gray-600">Welcome back, John Smith</p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Today:</span> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Today's Appointments</div>
              <div className="mt-1 text-2xl font-bold">3</div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Pending Requests</div>
              <div className="mt-1 text-2xl font-bold">{pendingAppointments.length}</div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="text-sm font-medium text-gray-500">Total Appointments</div>
              <div className="mt-1 text-2xl font-bold">{pendingAppointments.length + confirmedAppointments.length}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Requests ({pendingAppointments.length})
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'confirmed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('confirmed')}
              >
                Confirmed Appointments ({confirmedAppointments.length})
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'pending' ? (
                pendingAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No pending appointment requests</div>
                ) : (
                  <div className="space-y-4">
                    {pendingAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <h3 className="font-medium">{appointment.customerName}</h3>
                            <p className="text-sm text-gray-500">{appointment.phone}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <FaCalendar className="h-4 w-4 text-gray-400" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <FaClock className="h-4 w-4 text-gray-400" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{appointment.service}</p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-1">Note: {appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            onClick={() => handleReject(appointment.id)}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-md hover:bg-red-50"
                          >
                            <FaTimes className="inline-block mr-1 h-3 w-3" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleAccept(appointment.id)}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                          >
                            <FaCheck className="inline-block mr-1 h-3 w-3" />
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                confirmedAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No confirmed appointments</div>
                ) : (
                  <div className="space-y-4">
                    {confirmedAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <h3 className="font-medium">{appointment.customerName}</h3>
                            <p className="text-sm text-gray-500">{appointment.phone}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <FaCalendar className="h-4 w-4 text-gray-400" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <FaClock className="h-4 w-4 text-gray-400" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{appointment.service}</p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-1">Note: {appointment.notes}</p>
                            )}
                            <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Confirmed
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarberPage