import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Download, Trash2 } from 'lucide-react';
import { mockWasteRecords } from '../data/mockData';
import { WasteCategories, WasteReasons } from '../types/index.js';

export function WasteRecords() {
  const [records, setRecords] = useState(mockWasteRecords);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    unit: 'Matriz',
    sector: '',
    category: 'Frutas',
    product: '',
    quantity: '',
    weight: '',
    value: '',
    reason: 'Vencimento',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: 'waste_' + Date.now(),
      ...formData,
      quantity: parseInt(formData.quantity),
      weight: parseFloat(formData.weight),
      value: parseFloat(formData.value),
      hasPhoto: false,
      createdAt: new Date().toISOString()
    };
    setRecords(prev => [newRecord, ...prev]);
    setFormData({
      date: '',
      time: '',
      unit: 'Matriz',
      sector: '',
      category: 'Frutas',
      product: '',
      quantity: '',
      weight: '',
      value: '',
      reason: 'Vencimento',
      observations: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white">Registros de Desperdício</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gerencie todos os registros de desperdício alimentar</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus size={20} /> Novo Registro
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-navy-900 dark:text-white">Novo Registro de Desperdício</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date */}
            <div className="form-group">
              <label className="label">Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Time */}
            <div className="form-group">
              <label className="label">Hora</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Unit */}
            <div className="form-group">
              <label className="label">Unidade</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Sector */}
            <div className="form-group">
              <label className="label">Setor</label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Ex: Cozinha"
                required
                className="input"
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="label">Categoria</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                {WasteCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Product */}
            <div className="form-group">
              <label className="label">Produto</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Nome do produto"
                required
                className="input"
              />
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="label">Quantidade (unidades)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Weight */}
            <div className="form-group">
              <label className="label">Peso (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.1"
                required
                className="input"
              />
            </div>

            {/* Value */}
            <div className="form-group">
              <label className="label">Valor (R$)</label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                step="0.01"
                required
                className="input"
              />
            </div>

            {/* Reason */}
            <div className="form-group">
              <label className="label">Motivo</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="input"
              >
                {WasteReasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {/* Observations */}
            <div className="form-group lg:col-span-2">
              <label className="label">Observações</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                placeholder="Adicione observações sobre o registro"
                className="input resize-none h-20"
              />
            </div>

            {/* Buttons */}
            <div className="lg:col-span-3 flex gap-4">
              <button type="submit" className="btn-primary">
                Salvar Registro
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Filters */}
      <div className="card p-4 mb-6 flex gap-4">
        <button className="btn-secondary flex gap-2">
          <Filter size={18} /> Filtrar
        </button>
        <button className="btn-secondary flex gap-2">
          <Download size={18} /> Exportar
        </button>
      </div>

      {/* Records Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-navy-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Data/Hora</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Unidade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Categoria</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Produto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Peso (kg)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Valor (R$)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-navy-900 dark:text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
              {records.map((record, idx) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {record.date} {record.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.unit}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="badge bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200">
                      {record.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.weight}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                    R$ {record.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="card p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Registros</p>
          <p className="text-3xl font-bold text-navy-900 dark:text-white">{records.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Peso Total (kg)</p>
          <p className="text-3xl font-bold text-cyan-400">
            {records.reduce((sum, r) => sum + r.weight, 0).toFixed(1)}
          </p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Valor Total (R$)</p>
          <p className="text-3xl font-bold text-green-500">
            {records.reduce((sum, r) => sum + r.value, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WasteRecords;
