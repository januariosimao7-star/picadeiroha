'use client';

import { useState } from 'react';
import { Download, Mail, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function ReportsTab() {
  const [isExporting, setIsExporting] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/reports/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period: selectedPeriod }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar relatório');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    setEmailSent(false);
    try {
      const response = await fetch('/api/reports/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period: selectedPeriod, email: 'januariosimao8@gmail.com' }),
      });
      
      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao enviar relatório por email');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Relatórios e Análises</h2>

      {/* Export Controls */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Exportar Relatório</h3>
            <p className="text-sm text-gray-600 mb-4">Escolha o período e exporte em PDF ou por email</p>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <Download size={18} />
              {isExporting ? 'Exportando...' : 'Download PDF'}
            </button>
            <button
              onClick={handleSendEmail}
              disabled={isSendingEmail}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <Mail size={18} />
              {isSendingEmail ? 'Enviando...' : 'Enviar Email'}
            </button>
          </div>
        </div>
        {emailSent && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded">
            ✓ Relatório enviado com sucesso para januariosimao8@gmail.com
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-green-900">Vendas do Mês</h3>
            <DollarSign size={20} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900 mb-2">€3.450</p>
          <p className="text-xs text-green-700">↑ 15% vs mês anterior</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-blue-900">Reservas</h3>
            <BarChart3 size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-2">42</p>
          <p className="text-xs text-blue-700">12 iniciant. / 30 avançadas</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-purple-900">Clientes Ativos</h3>
            <Users size={20} className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-2">45</p>
          <p className="text-xs text-purple-700">+3 novo este mês</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-orange-900">Conversão</h3>
            <TrendingUp size={20} className="text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-900 mb-2">28%</p>
          <p className="text-xs text-orange-700">Visitantes → Clientes</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempenho Mensal (Últimos 6 Meses)</h3>
        <div className="space-y-3">
          {[
            { month: 'Junho', sales: 2100, reservations: 28 },
            { month: 'Julho', sales: 2450, reservations: 32 },
            { month: 'Agosto', sales: 2800, reservations: 35 },
            { month: 'Setembro', sales: 3000, reservations: 38 },
            { month: 'Outubro', sales: 3200, reservations: 40 },
            { month: 'Novembro', sales: 3450, reservations: 42 },
          ].map((item) => (
            <div key={item.month} className="flex items-center justify-between">
              <div className="w-24 font-medium text-gray-700">{item.month}</div>
              <div className="flex-1 mx-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="bg-green-200 rounded h-6 flex items-center justify-center text-xs font-semibold text-green-900"
                      style={{ width: `${(item.sales / 4000) * 100}%` }}>
                      €{item.sales}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-200 rounded h-6 flex items-center justify-center text-xs font-semibold text-blue-900"
                      style={{ width: `${(item.reservations / 50) * 100}%` }}>
                      {item.reservations} res.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Produtos Vendidos</h3>
        <div className="space-y-3">
          {[
            { name: 'Sela de Dressage', sales: 12, revenue: 5400 },
            { name: 'Freio Português', sales: 18, revenue: 5040 },
            { name: 'Colete de Proteção', sales: 8, revenue: 1592 },
            { name: 'Cabeção de Dressage', sales: 15, revenue: 1335 },
            { name: 'Sela de Salto', sales: 5, revenue: 2600 },
          ].map((product) => (
            <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} vendas</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{product.revenue}</p>
                <p className="text-sm text-gray-600">{((product.revenue / 15967) * 100).toFixed(1)}% do total</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
