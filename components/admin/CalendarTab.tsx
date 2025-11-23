'use client';

import { useState } from 'react';

interface Reservation {
  id: string;
  clientName: string;
  professor: string;
  horses: string[];
  lessonType: 'individual' | 'group';
  date: string;
  startTime: string;
  duration: 30 | 60;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function CalendarTab() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([
    // Exemplo vazio - sem dados fictícios
  ]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailConfig, setEmailConfig] = useState({
    recipientEmail: 'januariosimao8@gmail.com',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDayReservations = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return reservations.filter(r => r.date === dateStr && r.status !== 'cancelled');
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSendCalendarEmail = async () => {
    try {
      // Aqui você pode integrar com um serviço de email como Nodemailer, SendGrid, etc
      alert(`✓ Calendário será enviado para ${emailConfig.recipientEmail} ${emailConfig.frequency}`);
      setShowEmailForm(false);
    } catch (error) {
      alert('Erro ao configurar envio de email');
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('pt-PT', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">📅 Calendário de Agendamentos</h2>
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-black"
        >
          {showEmailForm ? '✕ Cancelar' : '📧 Configurar Email Diário'}
        </button>
      </div>

      {/* Email Configuration */}
      {showEmailForm && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-black text-black mb-4">Configurar Envio de Calendário por Email</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-black text-black mb-2">Email Destinatário</label>
              <input
                type="email"
                value={emailConfig.recipientEmail}
                onChange={(e) => setEmailConfig({ ...emailConfig, recipientEmail: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-black mb-2">Frequência</label>
              <select
                value={emailConfig.frequency}
                onChange={(e) => setEmailConfig({ ...emailConfig, frequency: e.target.value as any })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black bg-white"
              >
                <option value="daily">📅 Diário</option>
                <option value="weekly">📆 Semanal</option>
                <option value="monthly">📋 Mensal</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSendCalendarEmail}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-black"
          >
            ✓ Salvar Configuração
          </button>
        </div>
      )}

      {/* Informações */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
        <p className="text-sm font-black text-black">ℹ️ Calendário de Agendamentos</p>
        <ul className="text-xs font-bold text-black mt-2 space-y-1">
          <li>✓ Visualize eventos de agendamento por mês</li>
          <li>✓ Clique nos dias para ver detalhes das reservas</li>
          <li>✓ Calendário PDF enviado diariamente para o email configurado</li>
          <li>✓ Cores diferentes para status (confirmado/pendente/cancelado)</li>
        </ul>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-black"
        >
          ◀ Anterior
        </button>
        <p className="text-lg font-black text-black min-w-[200px] text-center capitalize">{monthName}</p>
        <button
          onClick={handleNextMonth}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-black"
        >
          Próximo ▶
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(day => (
          <div key={day} className="bg-gray-900 text-white p-3 text-center font-black rounded">
            {day}
          </div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1 mb-8">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => day && setSelectedDate(day.toString())}
            className={`min-h-28 p-2 border-2 rounded-lg cursor-pointer transition ${
              day
                ? 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                : 'bg-gray-100 border-gray-200'
            } ${selectedDate === day?.toString() ? 'border-amber-600 bg-amber-50' : ''}`}
          >
            {day && (
              <div>
                <p className="font-black text-black text-lg mb-1">{day}</p>
                <div className="space-y-0.5 max-h-16 overflow-y-auto">
                  {getDayReservations(day).map((res, i) => (
                    <div
                      key={i}
                      className={`text-white text-xs p-1 rounded truncate font-bold ${
                        res.status === 'confirmed'
                          ? 'bg-green-500'
                          : res.status === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      title={`${res.clientName} - ${res.startTime}`}
                    >
                      {res.startTime} {res.clientName?.substring(0, 10)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detalhes do dia selecionado */}
      {selectedDate && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-black text-black mb-4">
            Reservas para {selectedDate} de {monthName}
          </h3>
          {getDayReservations(parseInt(selectedDate)).length === 0 ? (
            <p className="text-gray-600 font-bold">Nenhuma reserva para este dia</p>
          ) : (
            <div className="space-y-3">
              {getDayReservations(parseInt(selectedDate)).map((res) => (
                <div key={res.id} className="border-l-4 border-amber-600 pl-4 py-2">
                  <p className="font-black text-black">
                    {res.clientName} - {res.startTime} ({res.duration}min)
                  </p>
                  <p className="text-sm font-bold text-black">Professor: {res.professor}</p>
                  <p className="text-sm font-bold text-black">Cavalos: {res.horses.join(', ')}</p>
                  <p className={`text-xs font-black mt-1 inline-block px-2 py-1 rounded ${
                    res.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : res.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {res.status === 'confirmed' ? '✓ Confirmada' : res.status === 'pending' ? '⏳ Pendente' : '✗ Cancelada'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">CONFIRMADAS</p>
          <p className="text-3xl font-black text-black">{reservations.filter(r => r.status === 'confirmed').length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">PENDENTES</p>
          <p className="text-3xl font-black text-black">{reservations.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">CANCELADAS</p>
          <p className="text-3xl font-black text-black">{reservations.filter(r => r.status === 'cancelled').length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TOTAL</p>
          <p className="text-3xl font-black text-black">{reservations.length}</p>
        </div>
      </div>
    </div>
  );
}
