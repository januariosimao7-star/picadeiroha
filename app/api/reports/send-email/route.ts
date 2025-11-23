import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurar transporter de email (usando variáveis de ambiente)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { period, email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email não fornecido' },
        { status: 400 }
      );
    }

    // Gerar HTML do relatório
    const reportData = {
      period,
      generatedAt: new Date().toLocaleDateString('pt-PT'),
      summary: {
        totalRevenue: '€3.450',
        totalReservations: 42,
        activeClients: 45,
        conversionRate: '28%'
      },
      monthlyBreakdown: [
        { month: 'Junho', sales: 2100, reservations: 28 },
        { month: 'Julho', sales: 2450, reservations: 32 },
        { month: 'Agosto', sales: 2800, reservations: 35 },
        { month: 'Setembro', sales: 3000, reservations: 38 },
        { month: 'Outubro', sales: 3200, reservations: 40 },
        { month: 'Novembro', sales: 3450, reservations: 42 },
      ],
      topProducts: [
        { name: 'Sela de Dressage', sales: 12, revenue: 5400 },
        { name: 'Freio Português', sales: 18, revenue: 5040 },
        { name: 'Colete de Proteção', sales: 8, revenue: 1592 },
      ]
    };

    const htmlContent = generateEmailHTML(reportData);

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Relatório de Negócio - ${getPeriodLabel(period)}`,
      html: htmlContent,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
    });

    return NextResponse.json(
      { success: true, message: 'Relatório enviado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar relatório por email' },
      { status: 500 }
    );
  }
}

function getPeriodLabel(period: string): string {
  const labels: Record<string, string> = {
    week: 'Última Semana',
    month: 'Último Mês',
    quarter: 'Último Trimestre',
    year: 'Último Ano',
  };
  return labels[period] || 'Personalizado';
}

function generateEmailHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }
        .content {
          padding: 40px 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #f59e0b;
          text-align: center;
        }
        .stat-label {
          color: #6b7280;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .stat-value {
          color: #1f2937;
          font-size: 24px;
          font-weight: bold;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #1f2937;
          font-size: 18px;
          margin: 0 0 15px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #f59e0b;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        table th {
          background: #f3f4f6;
          padding: 10px;
          text-align: left;
          font-weight: 600;
          color: #6b7280;
          border-bottom: 1px solid #e5e7eb;
        }
        table td {
          padding: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        .cta-button {
          display: inline-block;
          background: #f59e0b;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        .footer {
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Relatório de Negócio</h1>
          <p>${getPeriodLabel(data.period)}</p>
          <p>Gerado em ${data.generatedAt}</p>
        </div>

        <div class="content">
          <p>Olá,</p>
          <p>Segue em anexo o relatório de desempenho do negócio para ${getPeriodLabel(data.period).toLowerCase()}. Abaixo, um resumo dos principais indicadores:</p>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Vendas</div>
              <div class="stat-value">${data.summary.totalRevenue}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Reservas</div>
              <div class="stat-value">${data.summary.totalReservations}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Clientes</div>
              <div class="stat-value">${data.summary.activeClients}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Conversão</div>
              <div class="stat-value">${data.summary.conversionRate}</div>
            </div>
          </div>

          <div class="section">
            <h2>Desempenho Mensal</h2>
            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Vendas</th>
                  <th>Reservas</th>
                </tr>
              </thead>
              <tbody>
                ${data.monthlyBreakdown.map((item: any) => `
                  <tr>
                    <td>${item.month}</td>
                    <td>€${item.sales}</td>
                    <td>${item.reservations}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Top 3 Produtos</h2>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Vendas</th>
                  <th>Receita</th>
                </tr>
              </thead>
              <tbody>
                ${data.topProducts.map((product: any) => `
                  <tr>
                    <td>${product.name}</td>
                    <td>${product.sales}</td>
                    <td>€${product.revenue}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <p>Para ver o relatório completo com gráficos e análises detalhadas, acesse o painel de administração.</p>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} Centro Equestre Quinta da Horta. Todos os direitos reservados.</p>
          <p>Este é um relatório automatizado. Por favor, não responda este email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
