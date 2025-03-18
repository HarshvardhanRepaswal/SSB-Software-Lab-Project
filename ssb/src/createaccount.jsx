import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaStore, FaMapMarkerAlt, FaIdCard, FaCalendarAlt, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BarberRegistration() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shopName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    licenseNumber: '',
    experience: '',
    specialties: [],
    password: '',
    confirmPassword: ''
  })

  const specialtyOptions = [
    "Classic Cuts",
    "Modern Styles",
    "Fades",
    "Beard Trimming",
    "Hot Towel Shaves",
    "Hair Coloring",
    "Kids Haircuts",
    "Hair Design"
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSpecialtyChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, value]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(specialty => specialty !== value)
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    console.log('Registration data:', formData)
    // In a real app, you would send this data to your backend
    alert('Registration submitted! We will review your information and contact you soon.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            {/* <FaScissors className="h-6 w-6 text-blue-600" /> */}
            <span>CutNStyle</span>
          </div>
          <a href="/barber/login" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600">
            <FaArrowLeft className="h-4 w-4" />
            Back to Login
          </a>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Barber Registration</h1>
            <p className="mt-2 text-gray-600">Join our network of professional barbers</p>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-medium border-b pb-2">Personal Information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Smith"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Information */}
              <div>
                <h2 className="text-lg font-medium border-b pb-2">Shop Information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="shopName" className="block text-sm font-medium">Shop Name</label>
                    <div className="relative">
                      <FaStore className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="shopName"
                        name="shopName"
                        type="text"
                        placeholder="Smith's Barbershop"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium">Street Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="123 Main Street"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="New York"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium">State</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="NY"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="zipCode" className="block text-sm font-medium">ZIP Code</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder="10001"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="licenseNumber" className="block text-sm font-medium">Barber License Number</label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        placeholder="BL-123456"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-lg font-medium border-b pb-2">Professional Information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-sm font-medium">Years of Experience</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="experience"
                        name="experience"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select years of experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-sm font-medium">Specialties (select all that apply)</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {specialtyOptions.map(specialty => (
                        <div key={specialty} className="flex items-center">
                          <input
                            id={`specialty-${specialty}`}
                            name="specialties"
                            type="checkbox"
                            value={specialty}
                            checked={formData.specialties.includes(specialty)}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm text-gray-700">
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h2 className="text-lg font-medium border-b pb-2">Account Information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Must be at least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            {/* <a href="/barber/login" className="text-blue-600 hover:underline"> */}
              <button
               onClick={() => navigate("/barberSignIn")}
               className="text-blue-600 hover:underline"
              >
                Sign in
              </button>

            {/* </a> */}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-6 text-gray-300 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CutNStyle Barber Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default BarberRegistration