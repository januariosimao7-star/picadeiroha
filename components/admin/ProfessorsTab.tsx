'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Professor {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  specialties: string;
  status: 'active' | 'inactive';
}

export default function ProfessorsTab() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hourlyRate: 0,
    specialties: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleAdd = () => {
    if (!formData.name || !formData.email) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (editingId) {
      setProfessors(professors.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      setEditingId(null);
    } else {
      setProfessors([...professors, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({ name: '', email: '', hourlyRate: 0, specialties: '', status: 'active' });
    setShowForm(false);
  };

  const handleEdit = (professor: Professor) => {
    setFormData(professor);
    setEditingId(professor.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este professor?')) {
      setProfessors(professors.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">👨‍🏫 Professores</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', email: '', hourlyRate: 0, specialties: '', status: 'active' });
          }}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition"
        >
          <Plus size={20} />
          Novo Professor
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-black text-black mb-4">
            {editingId ? 'Editar Professor' : 'Adicionar Professor'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-black text-black mb-2">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Taxa Horária (€)</label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black bg-white"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-black text-black mb-2">Especialidades</label>
              <input
                type="text"
                value={formData.specialties}
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="ex: Dressage, Salto, Clássica"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition flex-1"
            >
              <Save size={18} />
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ name: '', email: '', hourlyRate: 0, specialties: '', status: 'active' });
              }}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition flex-1"
            >
              <X size={18} />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
        {professors.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-bold">
            Nenhum professor adicionado. Clique em "Novo Professor" para começar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-3 text-left font-black">Nome</th>
                  <th className="px-6 py-3 text-left font-black">Email</th>
                  <th className="px-6 py-3 text-left font-black">Taxa/Hora</th>
                  <th className="px-6 py-3 text-left font-black">Especialidades</th>
                  <th className="px-6 py-3 text-left font-black">Status</th>
                  <th className="px-6 py-3 text-left font-black">Ações</th>
                </tr>
              </thead>
              <tbody>
                {professors.map((professor) => (
                  <tr key={professor.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-black">{professor.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{professor.email}</td>
                    <td className="px-6 py-4 font-bold text-black">€{professor.hourlyRate.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{professor.specialties}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        professor.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {professor.status === 'active' ? '✓ Ativo' : '✗ Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(professor)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(professor.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TOTAL</p>
          <p className="text-3xl font-black text-black">{professors.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">ATIVOS</p>
          <p className="text-3xl font-black text-black">{professors.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TAXA MÉDIA</p>
          <p className="text-3xl font-black text-black">€{professors.length > 0 ? (professors.reduce((sum, p) => sum + p.hourlyRate, 0) / professors.length).toFixed(2) : '0.00'}</p>
        </div>
      </div>
    </div>
  );
}
