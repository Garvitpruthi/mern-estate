import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation(); // Get the location object to access the URL query parameters
    const queryParams = new URLSearchParams(location.search); // Parse the query parameters from the URL
    const email = queryParams.get('email');
    
    if (!email) {
        setError("Email is missing from the URL query parameters.");
    }
    
    console.log(`email from the signup page is ${email}`);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const toggleShowOtp = () => {
        setShowOtp(!showOtp);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email is missing. Please ensure you're redirected with the correct email.");
            return;
        }

        try {
            setLoading(true);
            console.log(`Verifying OTP for email: ${email} with OTP: ${otp}`);

            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            console.log();

            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                console.log("error aa rhaa h ", error);
                return;
            }

            setError(null); // Clear error if successful
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Verify OTP</h1>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                <div className="relative">
                    <input
                        type={showOtp ? 'text' : 'password'}
                        placeholder="Enter OTP"
                        className="border p-3 rounded-lg w-full"
                        id="otp"
                        required
                        value={otp}
                        onChange={handleOtpChange}
                    />
                    <button
                        type="button"
                        onClick={toggleShowOtp}
                        className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                    >
                        {showOtp ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <button
                    type="submit" // This will trigger form submission
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Verify OTP'}
                </button>
            </form>

            {error && <div className="text-red-500 mt-5">{error}</div>}
        </div>
    );
}
