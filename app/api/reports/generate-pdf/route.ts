import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { period } = await request.json();

    // Mock data - em produção, buscar do banco de dados
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

    // Gerar HTML do PDF
    const htmlContent = generatePDFHTML(reportData);

    // Usar API externa para converter HTML para PDF
    // Por enquanto, retornar como HTML que pode ser impresso como PDF
    const response = new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="relatorio-${period}-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });

    return response;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar relatório' },
      { status: 500 }
    );
  }
}

function generatePDFHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Relatório de Negócio</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #f59e0b;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #1f2937;
          margin: 0;
          font-size: 28px;
        }
        .header p {
          color: #6b7280;
          margin: 5px 0;
        }
        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-box {
          background: #f3f4f6;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
        }
        .stat-box h3 {
          margin: 0 0 10px 0;
          color: #6b7280;
          font-size: 12px;
          text-transform: uppercase;
        }
        .stat-box .value {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #1f2937;
          border-bottom: 2px solid #f59e0b;
          padding-bottom: 10px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        table th {
          background: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          color: #6b7280;
          border-bottom: 1px solid #e5e7eb;
        }
        table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        table tr:hover {
          background: #f9fafb;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Relatório de Negócio</h1>
        <p>Período: ${data.period === 'week' ? 'Última Semana' : data.period === 'month' ? 'Último Mês' : 'Último Trimestre'}</p>
        <p>Gerado em: ${data.generatedAt}</p>
      </div>

      <div class="stats">
        <div class="stat-box">
          <h3>Vendas Totais</h3>
          <div class="value">${data.summary.totalRevenue}</div>
        </div>
        <div class="stat-box">
          <h3>Reservas</h3>
          <div class="value">${data.summary.totalReservations}</div>
        </div>
        <div class="stat-box">
          <h3>Clientes Ativos</h3>
          <div class="value">${data.summary.activeClients}</div>
        </div>
        <div class="stat-box">
          <h3>Taxa de Conversão</h3>
          <div class="value">${data.summary.conversionRate}</div>
        </div>
      </div>

      <div class="section">
        <h2>Desempenho Mensal</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Vendas (€)</th>
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
        <h2>Top Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Vendas</th>
              <th>Receita (€)</th>
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

      <div class="footer">
        <p>Este relatório foi gerado automaticamente pelo sistema de gestão.</p>
        <p>© ${new Date().getFullYear()} Centro Equestre. Todos os direitos reservados.</p>
      </div>
    </body>
    </html>
  `;
}
