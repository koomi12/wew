import { useState } from "react";
import { supabase } from '../supabase';


export default function Login({ onClose, onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    onLoginSuccess({ user: email, role: "user" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-[900px] h-[90vh] max-h-[600px] bg-white flex overflow-hidden shadow-2xl rounded-lg">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
          <img 
            src="/pic/model.png"  
            className="w-full h-full object-cover"
            alt="Login Model"
          />
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-tl from-orange-600 via-orange-400 to-amber-300 px-10 py-10">

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">

            {/* LOGIN TITLE */}
            <h2 className="text-3xl font-bold text-black text-center mb-4">
              Login
            </h2>

            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Email:</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white rounded-full px-4 py-3 pr-12 outline-none text-sm text-gray-800 shadow-md"
                />
                <img
                  src="/icons/user.png"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black rounded-full p-1.5"
                  alt=""
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Password:</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white rounded-full px-4 py-3 pr-12 outline-none text-sm text-gray-800 shadow-md"
                />
                <img
                  src="/icons/lock.png"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black rounded-full p-1.5"
                  alt=""
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
            >
              Log in
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-white/40"></div>
              <span className="text-xs text-white">Or</span>
              <div className="flex-1 h-px bg-white/40"></div>
            </div>

           

            {/* SIGNUP LINK */}
            <p className="text-xs text-white/90 text-center pt-2">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold underline text-white"
              >
                Sign Up
              </button>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}
