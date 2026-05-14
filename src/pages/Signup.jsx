import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    login({ name: formData.name, email: formData.email });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Veritas.AI
          </h1>
          <p className="mt-2 text-sm text-gray-500">Create an account to get started</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Create Account
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
