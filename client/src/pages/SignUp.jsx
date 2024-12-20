import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setFormData({
      ...formData,
      otp: e.target.value,  // Store OTP in formData
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isOtpSent) {
      // When OTP is sent, navigate to the OTP verification page
      navigate(`/verify-otp?email=${formData.email}`);
    } else {
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);

        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }

        setLoading(false);
        setError(null);
        setIsOtpSent(true);
        navigate(`/verify-otp?email=${formData.email}`);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        {isOtpSent ? 'Verify OTP' : 'Sign Up'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isOtpSent ? (
          <>
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg"
              id="username"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
              id="email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              id="password"
              required
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-3 rounded-lg"
              id="otp"
              required
              onChange={handleOtpChange}
            />
          </>
        )}

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : isOtpSent ? 'Verify OTP' : 'Sign Up'}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      <div className="text-red-500 mt-5">{error}</div>
    </div>
  );
}
