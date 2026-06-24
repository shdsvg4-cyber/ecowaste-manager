import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Users, Settings, LogOut, ClipboardList, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function AdminPanel() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('registrations');
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [studentGoals, setStudentGoals] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [goalInput, setGoalInput] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  const loadData = () => {
    // Load registration requests
    const requests = JSON.parse(localStorage.getItem('ecowaste_registration_requests') || '[]');
    setRegistrationRequests(requests.filter(r => r.status === 'pending'));

    // Load approved students
    const students = JSON.parse(localStorage.getItem('ecowaste_students') || '[]');
    setApprovedStudents(students.filter(s => s.status === 'approved'));

    // Load student goals
    const goals = JSON.parse(localStorage.getItem('ecowaste_student_goals') || '{}');
    setStudentGoals(goals);
  };

  const approveStudent = (requestId) => {
    const requests = JSON.parse(localStorage.getItem('ecowaste_registration_requests') || '[]');
    const students = JSON.parse(localStorage.getItem('ecowaste_students') || '[]');
    
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    // Create student record
    const newStudent = {
      id: 'student_' + Date.now(),
      email: request.email,
      name: request.name,
      classroom: request.classroom,
      passwordHash: btoa(request.tempPassword),
      status: 'approved',
      approvedAt: new Date().toISOString(),
      totalWaste: 0,
      registrationDate: request.createdAt
    };

    // Update request status
    const updatedRequests = requests.map(r =>
      r.id === requestId ? { ...r, status: 'approved', approvedAt: new Date().toISOString() } : r
    );

    students.push(newStudent);
    localStorage.setItem('ecowaste_registration_requests', JSON.stringify(updatedRequests));
    localStorage.setItem('ecowaste_students', JSON.stringify(students));
    
    loadData();
  };

  const rejectStudent = (requestId) => {
    const requests = JSON.parse(localStorage.getItem('ecowaste_registration_requests') || '[]');
    const updatedRequests = requests.map(r =>
      r.id === requestId ? { ...r, status: 'rejected' } : r
    );
    localStorage.setItem('ecowaste_registration_requests', JSON.stringify(updatedRequests));
    loadData();
  };

  const setStudentGoal = (studentId, goal) => {
    if (!goal || isNaN(goal)) return;

    const goals = JSON.parse(localStorage.getItem('ecowaste_student_goals') || '{}');
    goals[studentId] = {
      goal: parseFloat(goal),
      setAt: new Date().toISOString()
    };
    localStorage.setItem('ecowaste_student_goals', JSON.stringify(goals));
    setStudentGoals(goals);
    setSelectedStudent(null);
    setGoalInput('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900">
      {/* Header */}
      <nav className="bg-navy-950 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Painel Administrativo</h1>
            <p className="text-sm text-gray-400">Bem-vindo, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'registrations'
                ? 'bg-cyan-500 text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <ClipboardList size={20} />
            Solicitações ({registrationRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'students'
                ? 'bg-cyan-500 text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <Users size={20} />
            Alunos ({approvedStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'goals'
                ? 'bg-cyan-500 text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <Target size={20} />
            Metas
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <Settings size={20} />
            Configurações
          </button>
        </div>

        {/* Registration Requests */}
        {activeTab === 'registrations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Solicitações de Registro Pendentes</h2>
            {registrationRequests.length === 0 ? (
              <div className="p-8 bg-navy-800 rounded-lg border border-cyan-500/20 text-center">
                <p className="text-gray-400">Nenhuma solicitação pendente</p>
              </div>
            ) : (
              registrationRequests.map(request => (
                <div
                  key={request.id}
                  className="p-6 bg-navy-800 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Nome</p>
                      <p className="text-white font-semibold">{request.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{request.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Classe</p>
                      <p className="text-white">{request.classroom}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Data da Solicitação</p>
                      <p className="text-white">
                        {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30 mb-4">
                    <p className="text-gray-400 text-sm mb-1">Senha Temporária:</p>
                    <p className="font-mono text-cyan-400 font-bold text-lg">{request.tempPassword}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      O aluno deve usar esta senha para fazer login após aprovação
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => approveStudent(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                    >
                      <CheckCircle size={18} />
                      Aprovar
                    </button>
                    <button
                      onClick={() => rejectStudent(request.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                    >
                      <XCircle size={18} />
                      Rejeitar
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Students */}
        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Alunos Aprovados</h2>
            {approvedStudents.length === 0 ? (
              <div className="p-8 bg-navy-800 rounded-lg border border-cyan-500/20 text-center">
                <p className="text-gray-400">Nenhum aluno aprovado ainda</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="px-4 py-3 text-cyan-400">Nome</th>
                      <th className="px-4 py-3 text-cyan-400">Email</th>
                      <th className="px-4 py-3 text-cyan-400">Classe</th>
                      <th className="px-4 py-3 text-cyan-400">Total Desperdiçado (g)</th>
                      <th className="px-4 py-3 text-cyan-400">Meta (g)</th>
                      <th className="px-4 py-3 text-cyan-400">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedStudents.map(student => (
                      <tr key={student.id} className="border-b border-navy-700 hover:bg-navy-800/50">
                        <td className="px-4 py-3 text-white">{student.name}</td>
                        <td className="px-4 py-3 text-gray-400">{student.email}</td>
                        <td className="px-4 py-3 text-white">{student.classroom}</td>
                        <td className="px-4 py-3 text-white">{student.totalWaste || 0}</td>
                        <td className="px-4 py-3 text-cyan-400">
                          {studentGoals[student.id]?.goal || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-sm transition-all"
                          >
                            Editar Meta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Goals */}
        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Definir Metas de Desperdício</h2>
            
            {selectedStudent && (
              <div className="p-6 bg-navy-800 rounded-lg border border-cyan-500/20 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Editando meta de: {selectedStudent.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Meta de desperdício máximo (em gramas):
                    </label>
                    <input
                      type="number"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      placeholder="Ex: 1000"
                      className="w-full px-4 py-2 bg-navy-700 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStudentGoal(selectedStudent.id, goalInput)}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                    >
                      Salvar Meta
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(null);
                        setGoalInput('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedStudents.map(student => (
                <div
                  key={student.id}
                  className="p-4 bg-navy-800 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                >
                  <p className="text-white font-semibold">{student.name}</p>
                  <p className="text-gray-400 text-sm">{student.classroom}</p>
                  <p className="text-cyan-400 mt-2">
                    Meta: <span className="font-bold">{studentGoals[student.id]?.goal || 'Não definida'} g</span>
                  </p>
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="mt-3 w-full px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-all text-sm"
                  >
                    Definir/Atualizar Meta
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-navy-800 rounded-lg border border-cyan-500/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Configurações do Sistema</h2>
            <div className="space-y-4 text-gray-400">
              <p>🔐 Versão Beta - Mais configurações em breve</p>
              <p>✅ Sistema de aprovação de alunos ativo</p>
              <p>✅ Sincronização com Google Sheets configurada</p>
              <p>📊 Dashboard de metas funcionando</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
