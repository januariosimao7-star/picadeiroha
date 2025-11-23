'use client';

import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  professor: string;
  horses: string[];
  color: string;
}

export default function CalendarTab() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    // Exemplo vazio - sem dados fictícios
  ]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDayEvents = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
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
        <div className="flex items-center gap-4">
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
      </div>

      {/* Legenda */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
        <p className="text-sm font-black text-black">ℹ️ Instruções:</p>
        <ul className="text-xs font-bold text-black mt-2 space-y-1">
          <li>✓ Visualize eventos de agendamento por mês</li>
          <li>✓ Cores diferentes para cada professor</li>
          <li>✓ Clique nos eventos para detalhes</li>
        </ul>
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
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-24 p-2 border-2 rounded-lg ${
              day
                ? 'bg-white border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 border-gray-200'
            }`}
          >
            {day && (
              <div>
                <p className="font-black text-black text-lg mb-1">{day}</p>
                <div className="space-y-1">
                  {getDayEvents(day).map((event, i) => (
                    <div
                      key={i}
                      className={`${event.color} text-white text-xs p-1 rounded truncate font-bold cursor-pointer hover:opacity-80`}
                    >
                      {event.time} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">EVENTOS ESTE MÊS</p>
          <p className="text-3xl font-black text-black">{events.filter(e => {
            const eDate = new Date(e.date);
            return eDate.getMonth() === currentMonth.getMonth() && 
                   eDate.getFullYear() === currentMonth.getFullYear();
          }).length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">PROFESSORES ATIVOS</p>
          <p className="text-3xl font-black text-black">{new Set(events.map(e => e.professor)).size}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">CAVALOS UTILIZADOS</p>
          <p className="text-3xl font-black text-black">{new Set(events.flatMap(e => e.horses)).size}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TAXA DE OCUPAÇÃO</p>
          <p className="text-3xl font-black text-black">0%</p>
        </div>
      </div>
    </div>
  );
}
