# 📧 Sistema de Email e Calendário com PDF

## Visão Geral

O sistema foi configurado para:
1. **Enviar relatórios por email** com dados em HTML formatado
2. **Gerar PDFs de calendário** com reservas diárias
3. **Automatizar envios diários** de calendário para `januariosimao8@gmail.com`

## Configuração de Email

### 1. Configurar Gmail com App Password

Para usar Gmail como servidor SMTP:

1. Aceda à sua conta Google: https://myaccount.google.com
2. Vá para **Segurança** (Security)
3. Ative **Autenticação em 2 passos** (2-Step Verification)
4. Vá para **Senhas de aplicação** (App passwords)
5. Selecione **Mail** e **Windows Computer** (ou o seu dispositivo)
6. Copie a senha gerada (16 caracteres)

### 2. Atualizar Variáveis de Ambiente

Adicione ao seu `.env.local` (desenvolvimento) ou Netlify (produção):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=senha-gerada-de-16-caracteres
EMAIL_FROM=noreply@picadeiroha.pt
EMAIL_REPLY_TO=admin@picadeiroha.pt
```

### 3. Verificar Configuração

Teste o envio de email:

```bash
curl -X POST http://localhost:3000/api/reports/send-email \
  -H "Content-Type: application/json" \
  -d '{"period":"month","email":"seu-email@gmail.com"}'
```

## API Endpoints

### GET `/api/reports/generate-pdf`
Gera um PDF com o relatório do período especificado.

**Parâmetros:**
- `period`: `week | month | quarter | year`

**Exemplo:**
```bash
curl "http://localhost:3000/api/reports/generate-pdf?period=month"
```

### POST `/api/reports/send-email`
Envia um email com o relatório em formato HTML.

**Body:**
```json
{
  "period": "month",
  "email": "januariosimao8@gmail.com"
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/api/reports/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "period": "month",
    "email": "januariosimao8@gmail.com"
  }'
```

## Interface Admin - ReportsTab

A aba de **Relatórios** no painel admin (`/dashboard`) oferece:

### 📊 Estatísticas em Tempo Real
- Vendas do Mês
- Total de Reservas
- Clientes Ativos
- Taxa de Conversão

### 📥 Controles de Exportação
- **Período selecionável:** Semana, Mês, Trimestre, Ano
- **Download PDF:** Descarrega o relatório em PDF
- **Enviar Email:** Envia o relatório para `januariosimao8@gmail.com`

### 📈 Análises Detalhadas
- **Desempenho Mensal:** Gráficos de vendas e reservas dos últimos 6 meses
- **Top Produtos:** Produtos mais vendidos com receita

## Automação Diária de Calendário

Para automatizar o envio do calendário PDF diariamente às 6 AM:

### Opção 1: Usar Netlify Functions (Recomendado)

Crie `/netlify/functions/send-daily-calendar.js`:

```javascript
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const response = await fetch(
      `${process.env.SITE_URL}/api/reports/send-email`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: 'week',
          email: 'januariosimao8@gmail.com',
        }),
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Erro ao enviar calendário:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

Configure o agendamento em `netlify.toml`:

```toml
[[scheduled_functions]]
function = "send-daily-calendar"
cron = "0 6 * * *"
```

### Opção 2: Usar Node-Cron (Local ou servidor próprio)

Instale:
```bash
npm install node-cron
```

Crie `/lib/schedule-calendar.ts`:

```typescript
import cron from 'node-cron';
import fetch from 'node-fetch';

export function startCalendarSchedule() {
  // Executar diariamente às 6 AM (0 6 * * *)
  cron.schedule('0 6 * * *', async () => {
    console.log('📅 Enviando calendário diário...');
    
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/reports/send-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            period: 'week',
            email: 'januariosimao8@gmail.com',
          }),
        }
      );

      if (response.ok) {
        console.log('✅ Calendário enviado com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao enviar calendário:', error);
    }
  });
}
```

### Opção 3: Usar Cron Job Externo

Use um serviço como **Cron-job.org** ou **IFTTT**:

```
POST http://seu-site.com/api/reports/send-email
Body: {"period":"week","email":"januariosimao8@gmail.com"}
Frequency: Daily at 6:00 AM
```

## Estrutura de Email

O email inclui:

```
✉️ Assunto: Relatório de Negócio - Período

📋 Conteúdo:
├─ Header com branding
├─ Resumo de Estatísticas (4 cards)
├─ Tabela de Desempenho Mensal
├─ Top 3 Produtos Mais Vendidos
└─ Footer com copyright
```

## Integração com CalendarTab

A aba **Calendário** (`CalendarTab.tsx`) inclui:

- ✅ Visualização mensal/semanal de reservas
- ✅ Filtros por professor e data
- ✅ Busca de eventos
- ✅ Edição inline de eventos
- ✅ Botão "Exportar PDF"
- ✅ Botão "Enviar Email"

**Próximas melhorias:**
- Integrar dados reais do banco de dados
- Adicionar cores por tipo de aula
- Gerar PDF do calendário específico (não só relatório)
- Sincronização com Google Calendar

## Troubleshooting

### "Erro: Cannot find module 'nodemailer'"
```bash
npm install nodemailer @types/nodemailer
```

### "Erro: Email inválido"
Certifique-se de que a variável de ambiente `EMAIL_USER` está configurada e válida.

### "Erro: Autenticação falhou"
1. Verifique se habilitou **Autenticação em 2 passos** no Google
2. Verifique se a **senha de app** está correcta
3. Certifique-se de que o `EMAIL_PORT` é `587` (TLS) ou `465` (SSL)

### "Emails não recebidos"
1. Verifique a pasta de **Spam** do destinatário
2. Confirme se o SPF/DKIM está configurado corretamente
3. Use um serviço como **SendGrid** em vez de Gmail para produção

## Próximas Funcionalidades

- [ ] Relatórios personalizados por período
- [ ] Gráficos interativos (Charts.js)
- [ ] Exportar para Excel (.xlsx)
- [ ] Envio de notificações de reserva
- [ ] Confirmação automática de aulas
- [ ] Integração com Google Calendar
- [ ] SMS de lembretes 24h antes

---

**Última atualização:** ${new Date().toLocaleDateString('pt-PT')}
