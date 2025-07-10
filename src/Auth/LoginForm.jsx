import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://prescription-tracker-backend.onrender.com";

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    aadhar: '',
    bloodGroup: 'A+',
    dob: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const navigate = useNavigate();

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateSignup = () => {
    const { name, email, password, confirmPassword, phone, aadhar, dob } = signupData;
    if (!name || !email || !password || !confirmPassword || !phone || !aadhar || !dob) {
      toast.error('Please fill all required fields');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!/^\d{12}$/.test(aadhar)) {
      toast.error('Invalid Aadhaar number');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error('Invalid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? `${BASE_URL}/api/auth/login`
      : `${BASE_URL}/api/auth/signup`;
    const payload = isLogin ? loginData : { ...signupData };

    if (!isLogin && !validateSignup()) {
      setLoading(false);
      return;
    }
    if (!isLogin) delete payload.confirmPassword;

    try {
      const res = await fetch(url, {
      method: 'POST',
      credentials: 'include', // Required!
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        toast.error(data.message || `${isLogin ? 'Login' : 'Signup'} failed`);
        setLoading(false);
        return;
      }

      toast.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
      // Redirect to dashboard after successful login/signup
      navigate('/prescription-tracker/dashboard');
    } catch (err) {
      console.error(`${isLogin ? 'Login' : 'Signup'} error:`, err);
      toast.error('Server error. Try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={signupData.name}
              onChange={e => handleChange(e, 'signup')}
              className="input"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={isLogin ? loginData.email : signupData.email}
            onChange={e => handleChange(e, isLogin ? 'login' : 'signup')}
            className="input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={isLogin ? loginData.password : signupData.password}
            onChange={e => handleChange(e, isLogin ? 'login' : 'signup')}
            className="input"
            required
          />
          {!isLogin && (
            <>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={e => handleChange(e, 'signup')}
                className="input"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={signupData.phone}
                onChange={e => handleChange(e, 'signup')}
                className="input"
                required
              />
              <input
                name="aadhar"
                type="text"
                placeholder="Aadhaar Number"
                maxLength="12"
                value={signupData.aadhar}
                onChange={e => handleChange(e, 'signup')}
                className="input"
                required
              />
              <select
                name="bloodGroup"
                value={signupData.bloodGroup}
                onChange={e => handleChange(e, 'signup')}
                className="input"
              >
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              <input
                name="dob"
                type="date"
                value={signupData.dob}
                onChange={e => handleChange(e, 'signup')}
                className="input"
                required
              />
            </>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-blue-300"
          >
            {loading
              ? isLogin
                ? 'Signing in...'
                : 'Signing up...'
              : isLogin
              ? 'Sign In'
              : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
