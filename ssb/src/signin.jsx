import { useState } from 'react'
import {FaUser, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa'
import {validatebarbers} from './barbers'
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [barbername, setBarberName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    
    const barber = validatebarbers(barbername, password);
    if (barber) {
      // alert(`Welcome, ${barbername}!`);
      navigate(`/barber?barbername=${barbername}`); // Redirect to dashboard
    } else {
      setError("Invalid Username or Password.");
      setBarberName("");
      setPassword("");
    }
  };

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

              <form onSubmit={handleSignin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="barbername"
                      name="barbername"
                      type="text"
                      placeholder="Barber's Name"
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={barbername}
                      onChange={(e) => setBarberName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-10 pr-10 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                {error && <p>{error}</p>}
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                  <button
                         onClick={() => navigate("/create-account")}
                         className="text-blue-600 hover:underline"
                   >
                    Create account
                    </button>
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

export default SignIn