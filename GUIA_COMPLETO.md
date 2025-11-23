# 📖 Guia Completo - PH Centro Equestre

## 🚀 Quick Start

### Acesso Admin (Desenvolvimento)
- **URL:** http://localhost:3000/auth/login
- **Utilizador:** `picadeiroquintadahorta`
- **Senha:** `picadeiro2026`

### Criar Nova Conta
- **URL:** http://localhost:3000/auth/register
- Preencha nome, email e senha
- Faça login com suas credenciais

## 🎯 Funcionalidades Principais

### 1️⃣ **Página Inicial (Home)**
- Hero section com branding
- Estatísticas: 20+ anos, 500+ clientes, 100% qualidade
- Secção "Sobre Nós" com história
- Serviços principais
- Contactos

### 2️⃣ **História (Historia)**
- Timeline com marcos importantes (2003-2024)
- Filosofia do centro
- Instalações profissionais
- Equipa de especialistas
- Prémios e reconhecimentos

### 3️⃣ **Serviços (Servicos)**
- 6 serviços principais com detalhes expansíveis
- Aulas particulares €60/h
- Aulas em grupo €30/pessoa
- Treino avançado €100/h
- Alojamento de cavalos
- Venda de equipamentos
- Eventos corporativos
- Descontos para pacotes mensais

### 4️⃣ **Loja (Products)**
- Catálogo de 12 produtos
- Filtro por categoria
- Stock status
- Botão "Adicionar ao Carrinho"
- Notificações em tempo real

### 5️⃣ **Carrinho (Cart)**
- Visualizar itens
- Ajustar quantidades (+/-)
- Calcular subtotal, IVA e total
- Checkout com PayPal
- Limpar carrinho

### 6️⃣ **Reservas (Reservations)**
- Selecionar tipo de serviço
- Escolher data e hora
- Informações do instrutor e cavalo
- Modal de confirmação
- Preço e duração

### 7️⃣ **Área do Cliente**
- **Perfil:** Editar dados pessoais
- **Compras:** Histórico de pedidos com status
- **Reservas:** Lista de reservas (confirmar/cancelar)
- **Favoritos:** Produtos salvos
- **Downloads:** Documentos disponíveis
- **Configurações:** Notificações e privacidade

### 8️⃣ **Painel Admin**

#### Resumo (Overview)
- KPIs: Vendas, Reservas, Produtos, Utilizadores
- Atividade recente
- Ações rápidas

#### Analytics 📈
- Gráficos de receita
- Estatísticas por período
- Produtos mais vendidos
- Margens de lucro

#### CMS (Gestor de Conteúdo) ✏️
- Editar Hero Section
- Editar "Sobre Nós"
- Editar Contactos
- Guardar alterações

#### Gestão de Produtos 🛍️
- Listar produtos
- Adicionar novos produtos
- Editar preços
- Gerir stock

#### Gestão de Reservas 📅
- Visualizar todas as reservas
- Confirmar reservas
- Cancelar reservas
- Relatórios

#### Gestão de Utilizadores 👥
- Listar utilizadores
- Editar roles
- Desativar contas
- Relatórios de atividade

#### Relatórios 📊
- Vendas mensais
- Clientes ativos
- Performance por produto
- Tendências

#### Configurações ⚙️
- Informações do centro
- Horários
- Política de preços
- Backup de dados

## 💳 PayPal Integration

### Configuração (Vercel)
1. Adicionar variável: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
2. Adicionar variável: `PAYPAL_SECRET`
3. Deploy automático

### Teste (Desenvolvimento)
- Client ID fornecido: `AfdaaB-AlwGPE5MYpZ-fqSs0AymqEbAto3Fr4jrUmOXpCHzvi1uAf2elkggC1cjLHx4qJJV2kjU3rleK`

## 🔐 Segurança

✅ Senhas hasheadas com bcryptjs
✅ Autenticação JWT
✅ Validação de inputs
✅ Rate limiting
✅ HTTPS em produção

## 📱 Responsividade

- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-767px)

## 🎨 Design

- **Cores:** Âmbar/Ouro (#F59E0B) + Preto + Branco
- **Fonte:** Sistema padrão (sans-serif)
- **Ícones:** Emojis para clareza
- **Estilo:** Moderno e profissional

## 📚 Estrutura de Dados

### Utilizador
- ID
- Nome
- Email
- Senha (hasheada)
- Role (admin/user)
- Criado em
- Atualizado em

### Produto
- ID
- Nome
- Preço
- Categoria
- Descrição
- Imagem
- Stock
- Ativo

### Pedido
- ID
- Utilizador ID
- Items
- Total
- Status (pendente/confirmado/enviado)
- Data

### Reserva
- ID
- Utilizador ID
- Serviço
- Data
- Hora
- Instrutor
- Cavalo
- Status
- Preço

## 🔄 Fluxos de Utilizador

### Novo Cliente
1. Clica "Registe-se aqui"
2. Preenche formulário em /auth/register
3. Faz login em /auth/login
4. Acede /client/area
5. Pode navegar para loja, reservas, etc

### Admin
1. Acede /auth/login
2. Credenciais de admin
3. Redireciona para /dashboard
4. Acesso a todos os 9 tabs

### Compra
1. Navega para /products
2. Clica "Adicionar ao Carrinho"
3. Vai para /cart
4. Checkout com PayPal
5. Confirmação de pedido

### Reserva
1. Clica no menu "Reservas"
2. Seleciona serviço
3. Escolhe data/hora
4. Confirma
5. Receção via email

## 🐛 Troubleshooting

### Carrinho não atualiza
- Limpar localStorage: F12 → Application → Clear all
- Recarregar página

### Login não funciona
- Verificar email/senha
- Limpar cookies
- Tentar outra conta

### Imagens não carregam
- Verificar URLs
- Recarregar página
- Verificar cache

## 📞 Suporte

- **Email:** picadeiro@phcentroequestre.pt
- **Telefone:** +351 234 567 890
- **Horário:** Seg-Sábado 09:00-18:00

## 🚀 Deploy

### Vercel (Recomendado)



# Deploy automático em Vercel
```

### Variáveis Necessárias
- NEXTAUTH_SECRET
- DATABASE_URL (PostgreSQL recomendado)
- NEXT_PUBLIC_PAYPAL_CLIENT_ID
- PAYPAL_SECRET

---

**Versão:** 1.0.0
**Última Atualização:** 23 de Novembro de 2025
