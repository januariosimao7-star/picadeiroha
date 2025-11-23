'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  color: string;
  status: 'available' | 'injured' | 'rest';
}

export default function HorsesTab() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: 0,
    color: '',
    status: 'available' as 'available' | 'injured' | 'rest',
  });

  const handleAdd = () => {
    if (!formData.name || !formData.breed) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (editingId) {
      setHorses(horses.map(h => h.id === editingId ? { ...formData, id: editingId } : h));
      setEditingId(null);
    } else {
      setHorses([...horses, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({ name: '', breed: '', age: 0, color: '', status: 'available' });
    setShowForm(false);
  };

  const handleEdit = (horse: Horse) => {
    setFormData(horse);
    setEditingId(horse.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este cavalo?')) {
      setHorses(horses.filter(h => h.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">🐴 Cavalos</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', breed: '', age: 0, color: '', status: 'available' });
          }}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition"
        >
          <Plus size={20} />
          Novo Cavalo
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-black text-black mb-4">
            {editingId ? 'Editar Cavalo' : 'Adicionar Cavalo'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-black text-black mb-2">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="ex: Thunderbolt"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Raça *</label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="ex: Lusitano, Árabe"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Idade (anos)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Cor</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="ex: Castanho, Preto"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-black text-black mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'injured' | 'rest' })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black bg-white"
              >
                <option value="available">✓ Disponível</option>
                <option value="rest">💤 Em Repouso</option>
                <option value="injured">🏥 Lesionado</option>
              </select>
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
                setFormData({ name: '', breed: '', age: 0, color: '', status: 'available' });
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
        {horses.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-bold">
            Nenhum cavalo adicionado. Clique em "Novo Cavalo" para começar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-3 text-left font-black">Nome</th>
                  <th className="px-6 py-3 text-left font-black">Raça</th>
                  <th className="px-6 py-3 text-left font-black">Idade</th>
                  <th className="px-6 py-3 text-left font-black">Cor</th>
                  <th className="px-6 py-3 text-left font-black">Status</th>
                  <th className="px-6 py-3 text-left font-black">Ações</th>
                </tr>
              </thead>
              <tbody>
                {horses.map((horse) => (
                  <tr key={horse.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-black">{horse.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{horse.breed}</td>
                    <td className="px-6 py-4 font-bold text-black">{horse.age} anos</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{horse.color}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        horse.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : horse.status === 'rest'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {horse.status === 'available' ? '✓ Disponível' : horse.status === 'rest' ? '💤 Repouso' : '🏥 Lesionado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(horse)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(horse.id)}
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
          <p className="text-3xl font-black text-black">{horses.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">DISPONÍVEIS</p>
          <p className="text-3xl font-black text-black">{horses.filter(h => h.status === 'available').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">IDADE MÉDIA</p>
          <p className="text-3xl font-black text-black">{horses.length > 0 ? Math.round(horses.reduce((sum, h) => sum + h.age, 0) / horses.length) : 0} anos</p>
        </div>
      </div>
    </div>
  );
}
