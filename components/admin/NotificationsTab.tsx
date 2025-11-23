'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  type: 'email' | 'sms' | 'push';
  recipient: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  scheduledFor?: string;
}

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'email' as const,
    recipient: '',
    message: '',
    scheduledFor: '',
  });

  const handleAddNotification = () => {
    if (!formData.recipient || !formData.message) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: formData.type,
      recipient: formData.recipient,
      message: formData.message,
      status: formData.scheduledFor ? 'pending' : 'sent',
      createdAt: new Date().toISOString(),
      scheduledFor: formData.scheduledFor,
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({ type: 'email', recipient: '', message: '', scheduledFor: '' });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'sms':
        return '📱';
      case 'push':
        return '🔔';
      default:
        return '💬';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">🔔 Centro de Notificações</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition font-black"
        >
          {showForm ? '✕ Cancelar' : '+ Nova Notificação'}
        </button>
      </div>

      {/* Informações de Uso */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
        <p className="text-sm font-black text-black">ℹ️ Sistema de Notificações</p>
        <ul className="text-xs font-bold text-black mt-2 space-y-1">
          <li>✓ Envie notificações por Email, SMS ou Push</li>
          <li>✓ Agende notificações para mais tarde</li>
          <li>✓ Acompanhe o status de entrega</li>
        </ul>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-black text-black mb-4">Enviar Nova Notificação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-black text-black mb-2">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black bg-white"
              >
                <option value="email">📧 Email</option>
                <option value="sms">📱 SMS</option>
                <option value="push">🔔 Push Notification</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-black mb-2">Destinatário</label>
              <input
                type="text"
                placeholder={
                  formData.type === 'email'
                    ? 'exemplo@email.com'
                    : formData.type === 'sms'
                    ? '+351910000000'
                    : 'Nome do utilizador'
                }
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-black text-black mb-2">Mensagem</label>
            <textarea
              placeholder="Escreva a mensagem..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-black text-black mb-2">Agendar Para (Opcional)</label>
            <input
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
              className="w-full border-2 border-gray-300 rounded px-3 py-2 font-bold text-black"
            />
          </div>

          <button
            onClick={handleAddNotification}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-black"
          >
            ✓ Enviar Notificação
          </button>
        </div>
      )}

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-600 font-black">📭 Nenhuma notificação enviada ainda</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`border-2 rounded-lg p-4 ${getStatusColor(notif.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-2xl">{getTypeIcon(notif.type)}</span>
                  <div className="flex-1">
                    <p className="font-black text-sm mb-1">
                      {notif.type === 'email' ? 'Email' : notif.type === 'sms' ? 'SMS' : 'Push'} - {notif.recipient}
                    </p>
                    <p className="text-sm font-bold">{notif.message}</p>
                    <div className="mt-2 flex gap-4">
                      <span className="text-xs font-bold">
                        📅 {new Date(notif.createdAt).toLocaleString('pt-PT')}
                      </span>
                      {notif.scheduledFor && (
                        <span className="text-xs font-bold">
                          ⏰ Agendada para: {new Date(notif.scheduledFor).toLocaleString('pt-PT')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="font-black text-sm px-3 py-1 bg-white rounded">
                  {notif.status === 'sent' ? '✓ Enviada' : notif.status === 'pending' ? '⏳ Pendente' : '✗ Falhou'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">ENVIADAS</p>
          <p className="text-3xl font-black text-black">
            {notifications.filter(n => n.status === 'sent').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">PENDENTES</p>
          <p className="text-3xl font-black text-black">
            {notifications.filter(n => n.status === 'pending').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">FALHADAS</p>
          <p className="text-3xl font-black text-black">
            {notifications.filter(n => n.status === 'failed').length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6">
          <p className="text-black text-sm font-black mb-2">TOTAL</p>
          <p className="text-3xl font-black text-black">{notifications.length}</p>
        </div>
      </div>
    </div>
  );
}
