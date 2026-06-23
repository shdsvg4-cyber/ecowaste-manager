import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-navy-900 dark:to-navy-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <Leaf className="text-cyan-400" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cyan-400">EcoWaste</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manager</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Transformando dados em redução de desperdício</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="input"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-navy-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-3">Credenciais de demonstração:</p>
            <div className="space-y-2 text-xs bg-gray-50 dark:bg-navy-700/50 p-3 rounded">
              <p><span className="font-medium">Email:</span> admin@ecowaste.com</p>
              <p><span className="font-medium">Senha:</span> qualquer senha</p>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <button className="text-cyan-400 hover:underline">Esqueceu a senha?</button>
            <span className="mx-2">•</span>
            <button className="text-cyan-400 hover:underline">Criar conta</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
