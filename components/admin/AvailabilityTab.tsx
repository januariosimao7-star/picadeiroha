'use client';

import { useState } from 'react';

interface Professor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  available: boolean;
  hourlyRate: number;
}

interface Horse {
  id: string;
  name: string;
  breed: string;
  available: boolean;
  lastCheckup: string;
}

interface TimeSlot {
  time: string;
  professorId: string;
  horseId: string;
  booked: boolean;
}

export default function AvailabilityTab() {
  const [professors, setProfessors] = useState<Professor[]>([
    {
      id: '1',
      name: 'Prof. João Silva',
      email: 'joao@picadeiroha.pt',
      phone: '+351910000000',
      specialties: ['Dressage', 'Saltos'],
      available: true,
      hourlyRate: 50,
    },
    {
      id: '2',
      name: 'Prof. Maria Santos',
      email: 'maria@picadeiroha.pt',
      phone: '+351910000001',
      specialties: ['Equitação Clássica'],
      available: true,
      hourlyRate: 45,
    },
  ]);

  const [horses, setHorses] = useState<Horse[]>([
    {
      id: '1',
      name: 'Tempest',
      breed: 'Lusitano',
      available: true,
      lastCheckup: '2024-12-01',
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Puro Sangue Árabe',
      available: true,
      lastCheckup: '2024-12-05',
    },
    {
      id: '3',
      name: 'Shadow',
      breed: 'Meia Sangue',
      available: false,
      lastCheckup: '2024-11-15',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'professors' | 'horses'>('professors');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hourlyRate: '',
  });

  const handleAddProfessor = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const newProfessor: Professor = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialties: [],
      available: true,
      hourlyRate: parseInt(formData.hourlyRate) || 0,
    };

    setProfessors([...professors, newProfessor]);
    setFormData({ name: '', email: '', phone: '', hourlyRate: '' });
    setShowForm(false);
  };

  const toggleProfessorAvailability = (id: string) => {
    setProfessors(
      professors.map(p => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  const toggleHorseAvailability = (id: string) => {
    setHorses(horses.map(h => (h.id === id ? { ...h, available: !h.available } : h)));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">🏆 Centro de Disponibilidade</h2>
      </div>

      {/* Informações */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
        <p className="text-sm font-black text-black">ℹ️ Gestão de Recursos</p>
        <ul className="text-xs font-bold text-black mt-2 space-y-1">
          <li>✓ Gerencie a disponibilidade de professores</li>
          <li>✓ Acompanhe o status dos cavalos</li>
          <li>✓ Consulte histórico de check-ups</li>
        </ul>
      </div>

      {/* Abas */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('professors')}
          className={`px-6 py-3 rounded-lg font-black transition ${
            activeTab === 'professors'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          👨‍🏫 Professores ({professors.length})
        </button>
        <button
          onClick={() => setActiveTab('horses')}
          className={`px-6 py-3 rounded-lg font-black transition ${
            activeTab === 'horses'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          🐴 Cavalos ({horses.length})
        </button>
      </div>

      {/* Professores */}
      {activeTab === 'professors' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-black mb-4"
          >
            {showForm ? '✕ Cancelar' : '+ Novo Professor'}
          </button>

          {showForm && (
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-black text-black mb-4">Adicionar Novo Professor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                />
                <input
                  type="number"
                  placeholder="Taxa horária (€)"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
                />
              </div>
              <button
                onClick={handleAddProfessor}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-black"
              >
                ✓ Adicionar Professor
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professors.map((prof) => (
              <div
                key={prof.id}
                className={`border-2 rounded-lg p-4 ${
                  prof.available
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-black text-lg">{prof.name}</p>
                    <p className="text-xs font-bold text-black">📧 {prof.email}</p>
                    <p className="text-xs font-bold text-black">📱 {prof.phone}</p>
                  </div>
                  <button
                    onClick={() => toggleProfessorAvailability(prof.id)}
                    className={`px-3 py-1 rounded font-black text-white text-sm ${
                      prof.available ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {prof.available ? '✓ Disponível' : '✗ Indisponível'}
                  </button>
                </div>
                <p className="text-sm font-bold text-black mb-2">💰 €{prof.hourlyRate}/hora</p>
                <div className="flex gap-1 flex-wrap">
                  {prof.specialties.length === 0 ? (
                    <span className="text-xs bg-gray-300 text-black px-2 py-1 rounded font-bold">
                      Sem especialidades configuradas
                    </span>
                  ) : (
                    prof.specialties.map((spec, i) => (
                      <span key={i} className="text-xs bg-amber-300 text-black px-2 py-1 rounded font-bold">
                        {spec}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cavalos */}
      {activeTab === 'horses' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {horses.map((horse) => (
              <div
                key={horse.id}
                className={`border-2 rounded-lg p-4 ${
                  horse.available
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-black text-black text-lg">🐴 {horse.name}</p>
                    <p className="text-xs font-bold text-black">{horse.breed}</p>
                  </div>
                  <button
                    onClick={() => toggleHorseAvailability(horse.id)}
                    className={`px-3 py-1 rounded font-black text-white text-sm ${
                      horse.available ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {horse.available ? '✓ Disponível' : '✗ Indisponível'}
                  </button>
                </div>
                <p className="text-sm font-bold text-black">
                  🏥 Último check-up: {new Date(horse.lastCheckup).toLocaleDateString('pt-PT')}
                </p>
                <p className="text-xs font-bold text-gray-600 mt-2">
                  {horse.available ? '✓ Pronto para aulas' : '⚠️ Necessita descanso'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">PROFESSORES DISPONÍVEIS</p>
          <p className="text-3xl font-black text-black">
            {professors.filter(p => p.available).length}/{professors.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">CAVALOS DISPONÍVEIS</p>
          <p className="text-3xl font-black text-black">
            {horses.filter(h => h.available).length}/{horses.length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">RECEITA POTENCIAL/HORA</p>
          <p className="text-3xl font-black text-black">
            €{professors.filter(p => p.available).reduce((sum, p) => sum + p.hourlyRate, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TAXA DE OCUPAÇÃO</p>
          <p className="text-3xl font-black text-black">0%</p>
        </div>
      </div>
    </div>
  );
}
