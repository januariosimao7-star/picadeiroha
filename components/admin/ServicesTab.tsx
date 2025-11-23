'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'lesson' | 'training' | 'care' | 'event';
}

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: 'lesson' as 'lesson' | 'training' | 'care' | 'event',
  });

  const handleAdd = () => {
    if (!formData.name || formData.price <= 0) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      setEditingId(null);
    } else {
      setServices([...services, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({ name: '', description: '', duration: 60, price: 0, category: 'lesson' });
    setShowForm(false);
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este serviço?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      lesson: '📚 Aula',
      training: '🏋️ Treino',
      care: '🏥 Cuidados',
      event: '🎉 Evento',
    };
    return labels[category] || category;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">🎯 Serviços</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: '', description: '', duration: 60, price: 0, category: 'lesson' });
          }}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition"
        >
          <Plus size={20} />
          Novo Serviço
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-black text-black mb-4">
            {editingId ? 'Editar Serviço' : 'Adicionar Serviço'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-black text-black mb-2">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="ex: Aula de Dressage"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black bg-white"
              >
                <option value="lesson">📚 Aula</option>
                <option value="training">🏋️ Treino</option>
                <option value="care">🏥 Cuidados</option>
                <option value="event">🎉 Evento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Duração (minutos)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Preço (€) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-black text-black mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                placeholder="Descrição do serviço..."
                rows={3}
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
                setFormData({ name: '', description: '', duration: 60, price: 0, category: 'lesson' });
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
        {services.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-bold">
            Nenhum serviço adicionado. Clique em "Novo Serviço" para começar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-3 text-left font-black">Nome</th>
                  <th className="px-6 py-3 text-left font-black">Categoria</th>
                  <th className="px-6 py-3 text-left font-black">Duração</th>
                  <th className="px-6 py-3 text-left font-black">Preço</th>
                  <th className="px-6 py-3 text-left font-black">Descrição</th>
                  <th className="px-6 py-3 text-left font-black">Ações</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-black">{service.name}</td>
                    <td className="px-6 py-4 text-sm font-bold text-black">{getCategoryLabel(service.category)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{service.duration} min</td>
                    <td className="px-6 py-4 font-bold text-black">€{service.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{service.description}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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
          <p className="text-black text-sm font-black mb-2">TOTAL DE SERVIÇOS</p>
          <p className="text-3xl font-black text-black">{services.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">RECEITA MÉDIA/SERVIÇO</p>
          <p className="text-3xl font-black text-black">€{services.length > 0 ? (services.reduce((sum, s) => sum + s.price, 0) / services.length).toFixed(2) : '0.00'}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">RECEITA TOTAL</p>
          <p className="text-3xl font-black text-black">€{services.reduce((sum, s) => sum + s.price, 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
