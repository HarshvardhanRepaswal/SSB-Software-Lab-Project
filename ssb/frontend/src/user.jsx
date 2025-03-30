"use client"

import { useState, useEffect } from "react"
import { FaPhone, FaCalendarAlt, FaUser, FaEnvelope, FaClock } from "react-icons/fa"
import { GiScissors } from "react-icons/gi"

function CustomerPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [selectedBarber, setSelectedBarber] = useState("")
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    barber: "", // Added barber field
    date: "",
    time: "",
    notes: "",
  })

  // Fetch barbers from the API
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:4000/barbers")

        if (!response.ok) {
          throw new Error("Failed to fetch barbers")
        }

        const data = await response.json()
        setBarbers(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching barbers:", err)
        setError("Failed to load barbers. Please try again later.")
        setLoading(false)
      }
    }

    fetchBarbers()
  }, [])

  // Calculate min and max dates for booking (today to 10 days ahead)
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 10)
    return maxDate.toISOString().split("T")[0]
  }

  // Update form when a service is selected
  useEffect(() => {
    if (activeService) {
      setFormData((prev) => ({ ...prev, service: activeService.id }))
      // Scroll to booking section
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" })
    }
  }, [activeService])

  // Update form when a barber is selected
  useEffect(() => {
    if (selectedBarber) {
      setFormData((prev) => ({ ...prev, barber: selectedBarber }))
      // Scroll to booking section
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedBarber])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setBookingSuccess(false)

    try {
      // Get the service name instead of just the ID
      const serviceName = services.find((s) => s.id === formData.service)?.name || formData.service

      // Send appointment data to the server
      const response = await fetch("http://localhost:4000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: serviceName, // Use the service name instead of ID
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book appointment")
      }

      // Show success message
      setBookingSuccess(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        barber: "",
        date: "",
        time: "",
        notes: "",
      })
      setActiveService(null)
      setSelectedBarber("")

      // Scroll to the top of the booking form
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" })
    } catch (err) {
      console.error("Error booking appointment:", err)
      setError("Failed to book appointment. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBookWithBarber = (barberName) => {
    setSelectedBarber(barberName)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl">
              <GiScissors className="h-6 w-6 text-blue-600" />
              <span>CutNStyle</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="font-medium hover:text-blue-600">
                Home
              </a>
              <a href="#services" className="font-medium hover:text-blue-600">
                Services
              </a>
              <a href="#barbers" className="font-medium hover:text-blue-600">
                Our Barbers
              </a>
              <a href="#contact" className="font-medium hover:text-blue-600">
                Contact
              </a>
            </nav>

            {/* Book Now Button */}
            <a
              href="#booking"
              className="hidden md:block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Book Now
            </a>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="font-medium hover:text-blue-600">
                  Home
                </a>
                <a href="#services" className="font-medium hover:text-blue-600">
                  Services
                </a>
                <a href="#barbers" className="font-medium hover:text-blue-600">
                  Our Barbers
                </a>
                <a href="#contact" className="font-medium hover:text-blue-600">
                  Contact
                </a>
                <a
                  href="#booking"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 w-full text-center"
                >
                  Book Now
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Professional Haircuts & Styling</h1>
                <p className="text-lg text-gray-600">
                  Experience the best haircut and grooming services in town. Our skilled barbers are ready to give you a
                  fresh new look.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#booking"
                    className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Book Appointment
                  </a>
                  <a
                    href="#services"
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50"
                  >
                    View Services
                  </a>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/600x400/e2e8f0/475569?text=Barber+Shop"
                  alt="Barber Shop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="mt-2 text-gray-600">Quality haircuts and grooming services for everyone</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="rounded-lg border p-6 transition-shadow hover:shadow-md cursor-pointer"
                  onClick={() => setActiveService(service)}
                >
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <p className="mt-4 font-bold text-blue-600">${service.price}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: {service.duration}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveService(service)
                      }}
                      className="text-sm font-medium text-blue-600 hover:underline flex items-center"
                    >
                      Book Now
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Barbers Section */}
        <section id="barbers" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Meet Our Barbers</h2>
              <p className="mt-2 text-gray-600">Skilled professionals ready to serve you</p>
            </div>

            {loading ? (
              // Loading state
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              // Error state
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : barbers.length === 0 ? (
              // No barbers found
              <div className="text-center py-12">
                <p className="text-gray-500">No barbers available at the moment.</p>
              </div>
            ) : (
              // Display barbers from database
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {barbers.map((barber) => (
                  <div key={barber.id} className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="relative h-64 w-full">
                      <img
                        src={barber.image || "/placeholder.svg"}
                        alt={barber.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{barber.name}</h3>
                      <p className="text-blue-600">{barber.role}</p>
                      <p className="mt-2 text-sm text-gray-600">{barber.experience}</p>
                      <div className="mt-4">
                        <h4 className="font-medium">Specialties:</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {barber.specialties &&
                            barber.specialties.map((specialty) => (
                              <span key={specialty} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                {specialty}
                              </span>
                            ))}
                        </div>
                      </div>
                      {/* Book with this barber button */}
                      <button
                        onClick={() => handleBookWithBarber(barber.name)}
                        className="mt-6 w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Book with {barber.name.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Booking CTA Section */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">Ready for a Fresh Look?</h2>
            <p className="mt-4 text-lg">Book your appointment today and experience the best haircut in town.</p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#booking"
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-gray-100"
              >
                Book Now
              </a>
              <a
                href="#contact"
                className="rounded-md border border-white px-6 py-3 text-sm font-medium text-white hover:bg-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">Book Your Appointment</h2>
                <p className="mt-2 text-gray-600">Fill out the form below to schedule your visit</p>
              </div>

              {bookingSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-600">
                  <p className="font-medium">Booking request submitted successfully!</p>
                  <p className="mt-1">We'll contact you to confirm your appointment.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Phone Number
                    </label>
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

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium">
                      Select Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} (${service.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Barber Selection Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="barber" className="block text-sm font-medium">
                      Select Barber
                    </label>
                    <select
                      id="barber"
                      name="barber"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.barber}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a barber</option>
                      {barbers.map((barber) => (
                        <option key={barber.id} value={barber.name}>
                          {barber.name}
                        </option>
                      ))}
                      <option value="Any">Any Available Barber</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium">
                      Appointment Date
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        max={getMaxDate()}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="time" className="block text-sm font-medium">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="time"
                        name="time"
                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select time</option>
                        <option value="9:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-sm font-medium">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special requests or information for your barber"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Show selected service and barber summary if available */}
                {(formData.service || formData.barber) && (
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h3 className="font-medium text-blue-800">Booking Summary</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      {formData.service && (
                        <p>Service: {services.find((s) => s.id === formData.service)?.name || formData.service}</p>
                      )}
                      {formData.barber && <p>Barber: {formData.barber}</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Book Appointment"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  We'll confirm your appointment via email or phone call.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-2 text-gray-600">Have questions? Get in touch with us</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FaPhone />
                </div>
                <h3 className="mt-4 text-lg font-medium">Phone</h3>
                <p className="mt-2 text-gray-600">(123) 456-7890</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FaEnvelope />
                </div>
                <h3 className="mt-4 text-lg font-medium">Email</h3>
                <p className="mt-2 text-gray-600">info@cutnstyle.com</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FaClock />
                </div>
                <h3 className="mt-4 text-lg font-medium">Working Hours</h3>
                <p className="mt-2 text-gray-600">Mon-Fri: 9am - 8pm</p>
                <p className="text-gray-600">Sat: 10am - 6pm</p>
                <p className="text-gray-600">Sun: Closed</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl text-white">
                <GiScissors className="h-6 w-6" />
                <span>CutNStyle</span>
              </div>
              <p className="mt-4">Professional barber services with a focus on customer satisfaction.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contact Info</h3>
              <address className="mt-4 not-italic">
                <p>123 Main Street, City</p>
                <p className="mt-2 flex items-center gap-2">
                  <FaPhone className="h-4 w-4" />
                  <span>(123) 456-7890</span>
                </p>
              </address>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Opening Hours</h3>
              <ul className="mt-4 space-y-2">
                <li>Monday - Friday: 9am - 8pm</li>
                <li>Saturday: 10am - 6pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} CutNStyle Barber Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data for services
const services = [
  {
    id: "haircut",
    name: "Classic Haircut",
    description: "Traditional haircut with clippers and scissors, includes a wash and style.",
    price: 25,
    duration: "30 min",
  },
  {
    id: "beard",
    name: "Beard Trim",
    description: "Professional beard shaping and trimming for a clean, polished look.",
    price: 15,
    duration: "15 min",
  },
  {
    id: "shave",
    name: "Hot Towel Shave",
    description: "Luxurious straight razor shave with hot towel treatment.",
    price: 30,
    duration: "30 min",
  },
  {
    id: "haircut-beard",
    name: "Haircut & Beard Trim",
    description: "Complete package including haircut and beard trimming.",
    price: 35,
    duration: "45 min",
  },
  {
    id: "kids",
    name: "Kids Haircut",
    description: "Haircuts for children under 12 years old.",
    price: 20,
    duration: "20 min",
  },
  {
    id: "styling",
    name: "Hair Styling",
    description: "Professional styling to achieve your desired look.",
    price: 20,
    duration: "20 min",
  },
]

export default CustomerPage

