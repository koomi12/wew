import { useState } from "react";
import { supabase } from '../supabase';

export default function Signup({ onClose, onSwitchToLogin, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    onLoginSuccess({
      user: email,
      role: "user"
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[420px] h-[500px] md:w-[800px] md:h-[600px] lg:w-[900px] lg:h-[650px] 
              bg-white
              flex overflow-hidden shadow-2xl rounded-lg">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 text-2xl font-bold"
        >
          ×
        </button>

        {/* Left side with image */}
        <div
          className="hidden md:block w-1/2"
          style={{
            backgroundImage: "url('/pic/model.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-tl from-orange-600 via-orange-400 to-amber-300 relative px-8">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h2>

          <form onSubmit={handleSubmit} className="w-64 md:w-72">
            {/* Email */}
            <div className="bg-white rounded-lg px-4 py-3 mb-3 shadow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                placeholder="Email"
              />
            </div>

            {/* First and Last Name */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1 bg-white rounded-lg px-4 py-3 shadow">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-700"
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1 bg-white rounded-lg px-4 py-3 shadow">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-sm text-gray-700"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-lg px-4 py-3 mb-3 shadow">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                placeholder="Password"
              />
            </div>

            {/* Confirm Password */}
            <div className="bg-white rounded-lg px-4 py-3 mb-6 shadow">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
                placeholder="Confirm Password"
              />
            </div>

            {/* Signup button */}
            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold py-3 rounded-lg shadow mb-6 transition"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px bg-orange-600"></div>
              <span className="mx-3 text-sm text-gray-800">Or</span>
              <div className="flex-1 h-px bg-orange-600"></div>
            </div>

         
            {/* Bottom text */}
            <p className="text-xs text-gray-800 text-center">
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={onSwitchToLogin} 
                className="underline font-semibold"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
