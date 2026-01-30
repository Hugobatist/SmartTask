/**
 * Dashboard Franqueados - Pipeline de Vendas
 * Gestão comercial com Kanban e Drag & Drop
 */

// ===================================
// Configuração das Fases do Pipeline
// ===================================
const FASES_PIPELINE = {
    prospect: {
        nome: "Prospect",
        icon: "🎯",
        descricao: "Leads identificados"
    },
    contato: {
        nome: "Em Contato",
        icon: "📞",
        descricao: "Aguardando retorno"
    },
    reuniao: {
        nome: "Reunião Agendada",
        icon: "📅",
        descricao: "Reuniões marcadas"
    },
    negociacao: {
        nome: "Em Negociação",
        icon: "💼",
        descricao: "Proposta enviada"
    },
    standby: {
        nome: "Em Espera",
        icon: "⏸️",
        descricao: "Aguardando momento certo"
    },
    fechado: {
        nome: "Fechado",
        icon: "✅",
        descricao: "Negócio concluído"
    },
    pendente_pagamento: {
        nome: "Pendente Pagamento",
        icon: "💳",
        descricao: "Aguardando pagamento"
    },
    perdido: {
        nome: "Perdido/Inativo",
        icon: "❌",
        descricao: "Sem interesse"
    }
};

const TIPOS_TAREFA = {
    LIGAR: { label: "Ligar", icon: "📞" },
    REUNIAO: { label: "Reunião", icon: "📅" },
    EMAIL: { label: "E-mail", icon: "📧" },
    WHATSAPP: { label: "WhatsApp", icon: "💬" },
    PROPOSTA: { label: "Proposta", icon: "📄" },
    FOLLOWUP: { label: "Follow-up", icon: "🔄" },
    CONTRATO: { label: "Contrato", icon: "📝" },
    AGUARDANDO: { label: "Aguardando", icon: "⏳" }
};

const PRIORIDADES = {
    alta: { label: "Alta", class: "priority-high" },
    media: { label: "Média", class: "priority-medium" },
    baixa: { label: "Baixa", class: "priority-low" }
};

// ===================================
// Colaboradores do Sistema
// ===================================
const COLABORADORES = [
    { id: 'eu', nome: 'Eu', cor: '#3182ce' },
    { id: 'leo', nome: 'Leo', cor: '#38a169' }
];

// ===================================
// Dados Iniciais
// ===================================
const dadosPadrao = [
    { id: 1, nome: "Ricardo Smukler", fase: "reuniao", tarefa: "REUNIAO", quando: "Hoje 13h15", valor: 0, prioridade: "alta", notas: "" },
    { id: 2, nome: "Bianca", fase: "reuniao", tarefa: "REUNIAO", quando: "Hoje 15h00", valor: 500, prioridade: "alta", notas: "" },
    { id: 3, nome: "Sheila", fase: "reuniao", tarefa: "REUNIAO", quando: "Hoje 17h00", valor: 2500, prioridade: "alta", notas: "" },
    { id: 4, nome: "Debora Chadda", fase: "contato", tarefa: "LIGAR", quando: "Hoje - Almoço", valor: 0, prioridade: "alta", notas: "" },
    { id: 5, nome: "Felipe Nippes", fase: "contato", tarefa: "LIGAR", quando: "Hoje - Tarde", valor: 0, prioridade: "media", notas: "" },
    { id: 6, nome: "Jun Hasegawa", fase: "contato", tarefa: "LIGAR", quando: "Hoje", valor: 0, prioridade: "media", notas: "" },
    { id: 7, nome: "Adriana Dutra", fase: "contato", tarefa: "LIGAR", quando: "Hoje - Tarde", valor: 0, prioridade: "media", notas: "" },
    { id: 8, nome: "Renata Araxá", fase: "contato", tarefa: "LIGAR", quando: "Hoje - Tarde", valor: 0, prioridade: "media", notas: "" },
    { id: 9, nome: "Erica Mazer", fase: "contato", tarefa: "LIGAR", quando: "Hoje - Tarde", valor: 0, prioridade: "media", notas: "" },
    { id: 10, nome: "Rodolfo Gobbi", fase: "contato", tarefa: "LIGAR", quando: "Hoje", valor: 0, prioridade: "media", notas: "" },
    { id: 11, nome: "Marcelo Motta", fase: "contato", tarefa: "LIGAR", quando: "Hoje", valor: 0, prioridade: "media", notas: "" },
    { id: 12, nome: "Jose Luis S Guimaraes", fase: "prospect", tarefa: "LIGAR", quando: "Amanhã cedo", valor: 0, prioridade: "media", notas: "" },
    { id: 13, nome: "Maninha", fase: "prospect", tarefa: "LIGAR", quando: "Amanhã", valor: 0, prioridade: "baixa", notas: "" },
    { id: 14, nome: "Patricia", fase: "reuniao", tarefa: "REUNIAO", quando: "Sexta 10h00", valor: 0, prioridade: "media", notas: "" },
    { id: 15, nome: "Jose Roberto Alves", fase: "prospect", tarefa: "LIGAR", quando: "Em breve", valor: 0, prioridade: "baixa", notas: "" },
    { id: 16, nome: "Eduardo Lasevitch", fase: "perdido", tarefa: "FOLLOWUP", quando: "Sem resposta", valor: 0, prioridade: "baixa", notas: "" },
    { id: 17, nome: "Renato Vieira", fase: "perdido", tarefa: "FOLLOWUP", quando: "Sem resposta", valor: 0, prioridade: "baixa", notas: "" },
    { id: 18, nome: "Cristiano Vix", fase: "perdido", tarefa: "FOLLOWUP", quando: "Sem resposta", valor: 0, prioridade: "baixa", notas: "" },
    { id: 19, nome: "Leonardo Sobral", fase: "perdido", tarefa: "FOLLOWUP", quando: "Sem resposta", valor: 0, prioridade: "baixa", notas: "" },
    { id: 20, nome: "Marcelo Amaral", fase: "perdido", tarefa: "FOLLOWUP", quando: "Sem resposta", valor: 0, prioridade: "baixa", notas: "" },
    { id: 21, nome: "Tais Santieri", fase: "fechado", tarefa: "CONTRATO", quando: "Concluído", valor: 2000, prioridade: "baixa", notas: "" },
    { id: 22, nome: "Carol", fase: "fechado", tarefa: "CONTRATO", quando: "Concluído", valor: 1250, prioridade: "baixa", notas: "" },
    { id: 23, nome: "Fabinho", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 24, nome: "Izabia", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 25, nome: "Luiz Carlos", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 26, nome: "Carlinhos", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 27, nome: "Zé Eduardo", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 28, nome: "Renata Vieira", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
    { id: 29, nome: "Robson Mato Grosso", fase: "prospect", tarefa: "AGUARDANDO", quando: "Definir", valor: 0, prioridade: "baixa", notas: "" },
];

// ===================================
// Estado da Aplicação
// ===================================
let franqueados = [];
let editandoId = null;
let filtroAtual = '';
let draggedCard = null;
let sidebarAberta = false;
let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let dataSelecionada = null;

// Estado da TO-DO List
let tarefas = [];
let abaAtiva = 'pipeline'; // 'pipeline', 'calendario', 'tarefas' ou 'pagamentos'
let filtroTarefas = 'todas'; // 'todas', 'pendentes', 'concluidas'
let filtroResponsavel = 'todos'; // 'todos', 'eu', 'leo'
let editandoTarefaId = null;

// Estado de Pagamentos
let pagamentos = [];
let editandoPagamentoId = null;
let filtroPagamentos = 'todos'; // 'todos', 'pendentes', 'pagos', 'atrasados'

// Estado do Extrato Bancário
let extrato = {
    saldoAtual: 0,
    transacoes: [],
    contasRecorrentes: [],
    boletosFuturos: []
};
let filtroExtrato = 'todos'; // 'todos', 'entradas', 'saidas'
let subAbaExtrato = 'transacoes'; // 'transacoes', 'recorrentes', 'boletos'
let editandoTransacaoId = null;
let editandoContaRecorrenteId = null;
let editandoBoletoId = null;

// ===================================
// Nomes dos meses e dias
// ===================================
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
               'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// ===================================
// Funções de Persistência (API Backend)
// ===================================
async function carregarDados() {
    try {
        const response = await fetch('/api/franqueados');
        if (response.ok) {
            franqueados = await response.json();
        } else {
            console.error('Erro ao carregar dados do servidor');
            franqueados = [...dadosPadrao];
        }
    } catch (error) {
        console.error('Servidor não disponível:', error);
        franqueados = [...dadosPadrao];
        mostrarToast('Servidor offline - dados temporários', 'error');
    }
}

async function salvarDados() {
    try {
        const response = await fetch('/api/franqueados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(franqueados)
        });
        if (!response.ok) {
            mostrarToast('Erro ao salvar dados', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);
        mostrarToast('Erro ao salvar - servidor offline', 'error');
    }
}

async function resetarDados() {
    if (confirm('Restaurar lista original? Todas as alterações serão perdidas.')) {
        try {
            const response = await fetch('/api/reset', { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                franqueados = data.data;
                renderizar();
                mostrarToast('Lista restaurada com sucesso!', 'info');
            }
        } catch (error) {
            console.error('Erro ao resetar:', error);
            mostrarToast('Erro ao resetar dados', 'error');
        }
    }
}

// ===================================
// Funções de Persistência - Tarefas (TO-DO List)
// ===================================
async function carregarTarefas() {
    try {
        const response = await fetch('/api/tarefas');
        if (response.ok) {
            tarefas = await response.json();
        } else {
            console.error('Erro ao carregar tarefas do servidor');
            tarefas = [];
        }
    } catch (error) {
        console.error('Servidor não disponível para tarefas:', error);
        tarefas = [];
    }
}

async function salvarTarefas() {
    try {
        const response = await fetch('/api/tarefas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefas)
        });
        if (!response.ok) {
            mostrarToast('Erro ao salvar tarefas', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        mostrarToast('Erro ao salvar tarefas - servidor offline', 'error');
    }
}

// ===================================
// Funções de Persistência - Pagamentos
// ===================================
async function carregarPagamentos() {
    try {
        const response = await fetch('/api/pagamentos');
        if (response.ok) {
            pagamentos = await response.json();
        } else {
            console.error('Erro ao carregar pagamentos do servidor');
            pagamentos = [];
        }
    } catch (error) {
        console.error('Servidor não disponível para pagamentos:', error);
        pagamentos = [];
    }
}

async function salvarPagamentos() {
    try {
        const response = await fetch('/api/pagamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pagamentos)
        });
        if (!response.ok) {
            mostrarToast('Erro ao salvar pagamentos', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar pagamentos:', error);
        mostrarToast('Erro ao salvar pagamentos - servidor offline', 'error');
    }
}

// ===================================
// Funções de Persistência - Extrato Bancário
// ===================================
async function carregarExtrato() {
    try {
        const response = await fetch('/api/extrato');
        if (response.ok) {
            extrato = await response.json();
        } else {
            console.error('Erro ao carregar extrato do servidor');
            extrato = { saldoAtual: 0, transacoes: [], contasRecorrentes: [], boletosFuturos: [] };
        }
    } catch (error) {
        console.error('Servidor não disponível para extrato:', error);
        extrato = { saldoAtual: 0, transacoes: [], contasRecorrentes: [], boletosFuturos: [] };
    }
}

async function salvarExtrato() {
    try {
        const response = await fetch('/api/extrato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(extrato)
        });
        if (!response.ok) {
            mostrarToast('Erro ao salvar extrato', 'error');
        }
    } catch (error) {
        console.error('Erro ao salvar extrato:', error);
        mostrarToast('Erro ao salvar extrato - servidor offline', 'error');
    }
}

// ===================================
// Funções de Cálculo
// ===================================
function calcularEstatisticas() {
    const total = franqueados.length;
    const porFase = {};
    let valorTotal = 0;
    let tarefasHoje = 0;

    Object.keys(FASES_PIPELINE).forEach(fase => {
        porFase[fase] = franqueados.filter(f => f.fase === fase).length;
    });

    franqueados.forEach(f => {
        valorTotal += f.valor || 0;
        if (f.quando && f.quando.toLowerCase().includes('hoje')) {
            tarefasHoje++;
        }
    });

    return { total, porFase, valorTotal, tarefasHoje, fechados: porFase.fechado || 0 };
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ===================================
// Funções de Renderização
// ===================================
function renderizar() {
    const app = document.getElementById('app');
    const stats = calcularEstatisticas();

    let conteudoAba = '';
    if (abaAtiva === 'pipeline') {
        conteudoAba = `
            <div class="main-content-wrapper">
                <div class="main-content">
                    ${renderizarFiltros()}
                    ${renderizarPipeline()}
                </div>
                ${renderizarSidebar()}
            </div>
        `;
    } else if (abaAtiva === 'calendario') {
        conteudoAba = renderizarAbaCalendario();
    } else if (abaAtiva === 'pagamentos') {
        conteudoAba = renderizarAbaPagamentos();
    } else if (abaAtiva === 'extrato') {
        conteudoAba = renderizarAbaExtrato();
    } else {
        conteudoAba = renderizarAbaTarefas();
    }

    app.innerHTML = `
        ${renderizarHeader(stats)}
        ${conteudoAba}
        ${renderizarModal()}
        ${renderizarDatePicker()}
        ${renderizarModalTarefa()}
        ${renderizarModalPagamento()}
        ${abaAtiva === 'extrato' ? renderizarModalTransacao() : ''}
        ${abaAtiva === 'extrato' ? renderizarModalContaRecorrente() : ''}
        ${abaAtiva === 'extrato' ? renderizarModalBoleto() : ''}
        ${abaAtiva === 'extrato' ? renderizarModalSaldo() : ''}
    `;

    if (abaAtiva === 'pipeline') {
        configurarDragDrop();
    }
    configurarEventos();
}

function trocarAba(aba) {
    abaAtiva = aba;
    renderizar();
}

function renderizarHeader(stats) {
    const tarefasPendentes = tarefas.filter(t => !t.concluida).length;
    const pagamentosPendentes = pagamentos.filter(p => p.status === 'pendente').length;
    const pagamentosAtrasados = pagamentos.filter(p => {
        if (p.status !== 'pendente') return false;
        const vencimento = new Date(p.dataVencimento);
        return vencimento < new Date();
    }).length;

    return `
        <header class="header">
            <div class="header-top">
                <h1>📊 Pipeline de Vendas - Franqueados</h1>
                <div class="header-actions">
                    ${abaAtiva === 'pipeline' ? `
                        <button class="btn btn-primary" onclick="abrirModal()">
                            ➕ Novo Franqueado
                        </button>
                        <button class="btn btn-secondary" onclick="exportarDados()">
                            📥 Exportar
                        </button>
                        <button class="btn btn-secondary" onclick="resetarDados()">
                            🔄 Resetar
                        </button>
                    ` : abaAtiva === 'tarefas' ? `
                        <button class="btn btn-primary" onclick="abrirModalTarefa()">
                            ➕ Nova Tarefa
                        </button>
                        <button class="btn btn-secondary" onclick="limparTarefasConcluidas()">
                            🧹 Limpar Concluídas
                        </button>
                    ` : abaAtiva === 'pagamentos' ? `
                        <button class="btn btn-primary" onclick="abrirModalPagamento()">
                            ➕ Novo Pagamento
                        </button>
                    ` : abaAtiva === 'extrato' ? `
                        <button class="btn btn-primary" onclick="abrirModalTransacao()">
                            ➕ Nova Transação
                        </button>
                        <button class="btn btn-secondary" onclick="atualizarSaldo()">
                            💰 Atualizar Saldo
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="tabs-nav">
                <button class="tab-btn ${abaAtiva === 'pipeline' ? 'active' : ''}" onclick="trocarAba('pipeline')">
                    📊 Pipeline
                </button>
                <button class="tab-btn ${abaAtiva === 'calendario' ? 'active' : ''}" onclick="trocarAba('calendario')">
                    📅 Calendário
                </button>
                <button class="tab-btn ${abaAtiva === 'pagamentos' ? 'active' : ''}" onclick="trocarAba('pagamentos')">
                    💰 Pagamentos
                    ${pagamentosAtrasados > 0 ? `<span class="tab-badge tab-badge-danger">${pagamentosAtrasados}</span>` :
                      pagamentosPendentes > 0 ? `<span class="tab-badge tab-badge-warning">${pagamentosPendentes}</span>` : ''}
                </button>
                <button class="tab-btn ${abaAtiva === 'tarefas' ? 'active' : ''}" onclick="trocarAba('tarefas')">
                    ✅ Tarefas
                    ${tarefasPendentes > 0 ? `<span class="tab-badge">${tarefasPendentes}</span>` : ''}
                </button>
                <button class="tab-btn ${abaAtiva === 'extrato' ? 'active' : ''}" onclick="trocarAba('extrato')">
                    🏦 Extrato
                </button>
            </div>
            ${abaAtiva === 'pipeline' ? `
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-value">${stats.total}</div>
                        <div class="stat-label">Total Prospects</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📅</div>
                        <div class="stat-value">${stats.tarefasHoje}</div>
                        <div class="stat-label">Tarefas Hoje</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-value">${stats.fechados}</div>
                        <div class="stat-label">Negócios Fechados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-value">${formatarMoeda(stats.valorTotal)}</div>
                        <div class="stat-label">Valor Total</div>
                    </div>
                </div>
            ` : ''}
        </header>
    `;
}

function renderizarFiltros() {
    return `
        <div class="filters-bar">
            <div class="search-box">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Buscar franqueado..."
                    value="${filtroAtual}"
                    oninput="filtrarFranqueados(this.value)"
                >
            </div>
            <div class="filter-group">
                <label>Prioridade:</label>
                <select class="form-select" style="width: auto;" onchange="filtrarPorPrioridade(this.value)">
                    <option value="">Todas</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                </select>
            </div>
        </div>
    `;
}

function renderizarPipeline() {
    const franqueadosFiltrados = filtrarLista();

    let html = '<div class="pipeline-container">';

    Object.entries(FASES_PIPELINE).forEach(([faseKey, faseConfig]) => {
        const itens = franqueadosFiltrados.filter(f => f.fase === faseKey);

        html += `
            <div class="pipeline-column column-${faseKey}">
                <div class="column-header">
                    <span>${faseConfig.icon} ${faseConfig.nome}</span>
                    <span class="count">${itens.length}</span>
                </div>
                <div class="column-content" data-fase="${faseKey}">
                    ${itens.length === 0 ? renderizarEstadoVazio() : ''}
                    ${itens.map(f => renderizarCard(f)).join('')}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function renderizarCard(f) {
    const prioridadeClass = PRIORIDADES[f.prioridade]?.class || '';
    const tarefaInfo = TIPOS_TAREFA[f.tarefa] || { label: f.tarefa, icon: '📋' };

    return `
        <div class="franqueado-card ${prioridadeClass}"
             draggable="true"
             data-id="${f.id}"
             ondragstart="iniciarDrag(event)"
             ondragend="finalizarDrag(event)">
            <div class="card-header">
                <div class="card-name">${f.nome}</div>
                <div class="card-actions">
                    <button class="btn-icon" onclick="editarFranqueado(${f.id})" title="Editar">✏️</button>
                    <button class="btn-icon" onclick="excluirFranqueado(${f.id})" title="Excluir">🗑️</button>
                </div>
            </div>
            <div class="card-meta">
                <span class="tag tag-task">${tarefaInfo.icon} ${tarefaInfo.label}</span>
                <span class="tag tag-date">📆 ${f.quando}</span>
            </div>
            ${f.valor > 0 ? `<div class="card-value">💰 ${formatarMoeda(f.valor)}</div>` : ''}
            ${f.notas ? `<div class="card-notes">📝 ${f.notas}</div>` : ''}
        </div>
    `;
}

function renderizarEstadoVazio() {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <div class="empty-state-text">Arraste cards para cá</div>
        </div>
    `;
}

function renderizarModal() {
    const tarefasOptions = Object.entries(TIPOS_TAREFA)
        .map(([key, val]) => `<option value="${key}">${val.icon} ${val.label}</option>`)
        .join('');

    const fasesOptions = Object.entries(FASES_PIPELINE)
        .map(([key, val]) => `<option value="${key}">${val.icon} ${val.nome}</option>`)
        .join('');

    const prioridadesOptions = Object.entries(PRIORIDADES)
        .map(([key, val]) => `<option value="${key}">${val.label}</option>`)
        .join('');

    return `
        <div id="modalOverlay" class="modal-overlay" onclick="fecharModalOverlay(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 id="modalTitulo">Novo Franqueado</h2>
                    <button class="modal-close" onclick="fecharModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Nome *</label>
                        <input type="text" id="inputNome" class="form-input" placeholder="Nome do franqueado">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Fase</label>
                            <select id="inputFase" class="form-select">
                                ${fasesOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tarefa</label>
                            <select id="inputTarefa" class="form-select">
                                ${tarefasOptions}
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Quando</label>
                            <div class="input-with-button">
                                <input type="text" id="inputQuando" class="form-input" placeholder="Clique para selecionar" readonly>
                                <button type="button" class="btn-calendar-input" onclick="abrirDatePicker()">📅</button>
                            </div>
                            <input type="hidden" id="inputDataAgendada">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Prioridade</label>
                            <select id="inputPrioridade" class="form-select">
                                ${prioridadesOptions}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Valor (R$)</label>
                        <input type="number" id="inputValor" class="form-input" placeholder="0" value="0">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notas</label>
                        <textarea id="inputNotas" class="form-textarea" placeholder="Observações sobre o contato..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button>
                    <button class="btn btn-success" onclick="salvarFranqueado()">💾 Salvar</button>
                </div>
            </div>
        </div>
        <div id="toastContainer" class="toast-container"></div>
    `;
}

// ===================================
// Funções do Calendário
// ===================================
function renderizarCalendario() {
    const hoje = new Date();
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    // Obter tarefas agendadas por data
    const tarefasPorData = obterTarefasPorData();

    let diasHTML = '';

    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < diaSemanaInicio; i++) {
        diasHTML += '<div class="calendar-day empty"></div>';
    }

    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const ehHoje = dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear();
        const temTarefa = tarefasPorData[dataStr] && tarefasPorData[dataStr].length > 0;
        const qtdTarefas = tarefasPorData[dataStr]?.length || 0;

        diasHTML += `
            <div class="calendar-day ${ehHoje ? 'today' : ''} ${temTarefa ? 'has-task' : ''}"
                 onclick="selecionarDiaCalendario('${dataStr}')"
                 title="${qtdTarefas > 0 ? qtdTarefas + ' tarefa(s)' : ''}">
                <span class="day-number">${dia}</span>
                ${temTarefa ? `<span class="task-dot">${qtdTarefas}</span>` : ''}
            </div>
        `;
    }

    return `
        <div class="calendar-container">
            <div class="calendar-header">
                <button class="btn-calendar-nav" onclick="navegarMes(-1)">&#9664;</button>
                <h3>${MESES[mesAtual]} ${anoAtual}</h3>
                <button class="btn-calendar-nav" onclick="navegarMes(1)">&#9654;</button>
            </div>
            <div class="calendar-weekdays">
                ${DIAS_SEMANA.map(d => `<div class="weekday">${d}</div>`).join('')}
            </div>
            <div class="calendar-days">
                ${diasHTML}
            </div>
        </div>
    `;
}

function renderizarAbaCalendario() {
    const tarefasPorData = obterTarefasPorData();
    const tarefasDoDia = dataSelecionada ? (tarefasPorData[dataSelecionada] || []) : [];

    const hoje = new Date();
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    let diasHTML = '';

    for (let i = 0; i < diaSemanaInicio; i++) {
        diasHTML += '<div class="calendar-day-large empty"></div>';
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dataStr = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const ehHoje = dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear();
        const temTarefa = tarefasPorData[dataStr] && tarefasPorData[dataStr].length > 0;
        const qtdTarefas = tarefasPorData[dataStr]?.length || 0;
        const selecionado = dataSelecionada === dataStr;

        diasHTML += `
            <div class="calendar-day-large ${ehHoje ? 'today' : ''} ${temTarefa ? 'has-task' : ''} ${selecionado ? 'selected' : ''}"
                 onclick="selecionarDiaCalendarioAba('${dataStr}')">
                <span class="day-number">${dia}</span>
                ${temTarefa ? `<span class="task-count">${qtdTarefas}</span>` : ''}
            </div>
        `;
    }

    let dataFormatada = '';
    if (dataSelecionada) {
        const parts = dataSelecionada.split('-');
        dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    return `
        <div class="calendario-aba-container">
            <div class="calendario-principal">
                <div class="calendario-large">
                    <div class="calendario-large-header">
                        <button class="btn-calendar-nav-large" onclick="navegarMes(-1)">◀</button>
                        <h2>${MESES[mesAtual]} ${anoAtual}</h2>
                        <button class="btn-calendar-nav-large" onclick="navegarMes(1)">▶</button>
                    </div>
                    <div class="calendario-weekdays-large">
                        ${DIAS_SEMANA.map(d => `<div class="weekday-large">${d}</div>`).join('')}
                    </div>
                    <div class="calendario-days-large">
                        ${diasHTML}
                    </div>
                </div>
            </div>
            <div class="calendario-sidebar">
                <div class="calendario-sidebar-header">
                    <h3>${dataSelecionada ? `📅 ${dataFormatada}` : '📅 Selecione um dia'}</h3>
                    ${dataSelecionada ? `<button class="btn btn-small btn-secondary" onclick="limparSelecaoCalendario()">Limpar</button>` : ''}
                </div>
                <div class="calendario-tarefas-lista">
                    ${tarefasDoDia.length === 0 ? `
                        <div class="calendario-empty">
                            <div class="empty-icon">📭</div>
                            <p>${dataSelecionada ? 'Nenhuma tarefa neste dia' : 'Clique em um dia para ver as tarefas'}</p>
                        </div>
                    ` : tarefasDoDia.map(t => renderizarTarefaCalendario(t)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderizarTarefaCalendario(tarefa) {
    const tarefaInfo = TIPOS_TAREFA[tarefa.tarefa] || { label: tarefa.tarefa, icon: '📋' };
    const prioridadeClass = PRIORIDADES[tarefa.prioridade]?.class || '';
    const faseInfo = FASES_PIPELINE[tarefa.fase] || { nome: tarefa.fase, icon: '📋' };

    return `
        <div class="calendario-tarefa-item ${prioridadeClass}" onclick="editarFranqueado(${tarefa.id})">
            <div class="calendario-tarefa-icon">${tarefaInfo.icon}</div>
            <div class="calendario-tarefa-content">
                <div class="calendario-tarefa-nome">${tarefa.nome}</div>
                <div class="calendario-tarefa-meta">
                    <span>${tarefaInfo.label}</span>
                    <span>•</span>
                    <span>${tarefa.quando}</span>
                </div>
                <div class="calendario-tarefa-fase">
                    ${faseInfo.icon} ${faseInfo.nome}
                </div>
            </div>
        </div>
    `;
}

function selecionarDiaCalendarioAba(dataStr) {
    dataSelecionada = dataSelecionada === dataStr ? null : dataStr;
    renderizar();
}

function limparSelecaoCalendario() {
    dataSelecionada = null;
    renderizar();
}

function obterTarefasPorData() {
    const tarefasPorData = {};
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    franqueados.forEach(f => {
        if (!f.quando || f.quando === '-' || f.quando === 'Definir' || f.quando === 'Sem resposta' || f.quando === 'Concluído') {
            return;
        }

        let data = null;
        const quandoLower = f.quando.toLowerCase();

        // Parse diferentes formatos
        if (quandoLower.includes('hoje')) {
            data = new Date(hoje);
        } else if (quandoLower.includes('amanhã') || quandoLower.includes('amanha')) {
            data = new Date(hoje);
            data.setDate(data.getDate() + 1);
        } else if (quandoLower.includes('sexta')) {
            data = getProximoDiaSemana(5);
        } else if (quandoLower.includes('segunda')) {
            data = getProximoDiaSemana(1);
        } else if (quandoLower.includes('terça') || quandoLower.includes('terca')) {
            data = getProximoDiaSemana(2);
        } else if (quandoLower.includes('quarta')) {
            data = getProximoDiaSemana(3);
        } else if (quandoLower.includes('quinta')) {
            data = getProximoDiaSemana(4);
        } else if (quandoLower.includes('sábado') || quandoLower.includes('sabado')) {
            data = getProximoDiaSemana(6);
        } else if (quandoLower.includes('domingo')) {
            data = getProximoDiaSemana(0);
        } else if (f.dataAgendada) {
            data = new Date(f.dataAgendada);
        }

        if (data) {
            const dataStr = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
            if (!tarefasPorData[dataStr]) {
                tarefasPorData[dataStr] = [];
            }
            tarefasPorData[dataStr].push(f);
        }
    });

    return tarefasPorData;
}

function getProximoDiaSemana(diaSemana) {
    const hoje = new Date();
    const diaAtual = hoje.getDay();
    let diasAteProximo = diaSemana - diaAtual;
    if (diasAteProximo <= 0) diasAteProximo += 7;
    const proximaData = new Date(hoje);
    proximaData.setDate(hoje.getDate() + diasAteProximo);
    return proximaData;
}

function navegarMes(direcao) {
    mesAtual += direcao;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    } else if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    renderizar();
}

function selecionarDiaCalendario(dataStr) {
    const tarefasPorData = obterTarefasPorData();
    const tarefas = tarefasPorData[dataStr] || [];

    if (tarefas.length > 0) {
        // Abre sidebar e mostra tarefas do dia
        sidebarAberta = true;
        dataSelecionada = dataStr;
        renderizar();
    }
}

// ===================================
// Funções da Sidebar (Timeline)
// ===================================
function renderizarSidebar() {
    const tarefasTimeline = obterTarefasTimeline();

    return `
        <div class="sidebar-toggle ${sidebarAberta ? 'active' : ''}" onclick="toggleSidebar()">
            <span class="toggle-icon">${sidebarAberta ? '▶' : '◀'}</span>
            <span class="toggle-text">Tarefas</span>
            <span class="toggle-badge">${tarefasTimeline.length}</span>
        </div>
        <aside class="sidebar ${sidebarAberta ? 'open' : ''}">
            <div class="sidebar-header">
                <h3>📋 Minhas Tarefas</h3>
                <button class="sidebar-close" onclick="toggleSidebar()">✕</button>
            </div>
            ${tarefasTimeline.length > 0 ? `
                <div class="sidebar-actions">
                    <button class="btn btn-danger btn-small" onclick="limparTodasTarefas()">
                        🗑️ Limpar Todas
                    </button>
                </div>
            ` : ''}
            <div class="sidebar-content">
                ${renderizarTimeline(tarefasTimeline)}
            </div>
        </aside>
    `;
}

function obterTarefasTimeline() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Filtra tarefas que precisam de ação (não são perdidos, fechados, standby ou aguardando)
    let tarefas = franqueados.filter(f => {
        if (f.fase === 'perdido' || f.fase === 'fechado' || f.fase === 'standby') return false;
        if (!f.quando || f.quando === '-' || f.quando === 'Definir' || f.quando === 'Sem resposta' || f.quando === 'Concluído') return false;
        return true;
    });

    // Se há uma data selecionada, filtra por ela
    if (dataSelecionada) {
        const tarefasPorData = obterTarefasPorData();
        tarefas = tarefasPorData[dataSelecionada] || [];
    }

    // Ordena por prioridade e horário
    tarefas.sort((a, b) => {
        const prioridadeOrdem = { alta: 0, media: 1, baixa: 2 };
        return (prioridadeOrdem[a.prioridade] || 1) - (prioridadeOrdem[b.prioridade] || 1);
    });

    return tarefas;
}

function renderizarTimeline(tarefas) {
    if (tarefas.length === 0) {
        return `
            <div class="timeline-empty">
                <div class="empty-icon">📭</div>
                <p>Nenhuma tarefa agendada</p>
            </div>
        `;
    }

    // Agrupa por período
    const grupos = {
        hoje: [],
        amanha: [],
        semana: [],
        outros: []
    };

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    tarefas.forEach(t => {
        const quandoLower = (t.quando || '').toLowerCase();
        if (quandoLower.includes('hoje')) {
            grupos.hoje.push(t);
        } else if (quandoLower.includes('amanhã') || quandoLower.includes('amanha')) {
            grupos.amanha.push(t);
        } else if (quandoLower.match(/(segunda|terça|terca|quarta|quinta|sexta|sábado|sabado|domingo)/)) {
            grupos.semana.push(t);
        } else {
            grupos.outros.push(t);
        }
    });

    let html = '';

    if (dataSelecionada) {
        const dataParts = dataSelecionada.split('-');
        const dataFormatada = `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}`;
        html += `
            <div class="timeline-date-header">
                <span>📅 ${dataFormatada}</span>
                <button class="btn-limpar-filtro" onclick="limparFiltroData()">Limpar</button>
            </div>
        `;
        html += tarefas.map(t => renderizarItemTimeline(t)).join('');
    } else {
        if (grupos.hoje.length > 0) {
            html += `<div class="timeline-section"><h4>🔴 Hoje</h4>${grupos.hoje.map(t => renderizarItemTimeline(t)).join('')}</div>`;
        }
        if (grupos.amanha.length > 0) {
            html += `<div class="timeline-section"><h4>🟠 Amanhã</h4>${grupos.amanha.map(t => renderizarItemTimeline(t)).join('')}</div>`;
        }
        if (grupos.semana.length > 0) {
            html += `<div class="timeline-section"><h4>🟡 Esta Semana</h4>${grupos.semana.map(t => renderizarItemTimeline(t)).join('')}</div>`;
        }
        if (grupos.outros.length > 0) {
            html += `<div class="timeline-section"><h4>🔵 Outras</h4>${grupos.outros.map(t => renderizarItemTimeline(t)).join('')}</div>`;
        }
    }

    return html;
}

function renderizarItemTimeline(tarefa) {
    const tarefaInfo = TIPOS_TAREFA[tarefa.tarefa] || { label: tarefa.tarefa, icon: '📋' };
    const prioridadeClass = PRIORIDADES[tarefa.prioridade]?.class || '';

    return `
        <div class="timeline-item ${prioridadeClass}" onclick="editarFranqueado(${tarefa.id})">
            <div class="timeline-icon">${tarefaInfo.icon}</div>
            <div class="timeline-content">
                <div class="timeline-title">${tarefa.nome}</div>
                <div class="timeline-meta">
                    <span>${tarefaInfo.label}</span>
                    <span>•</span>
                    <span>${tarefa.quando}</span>
                </div>
            </div>
        </div>
    `;
}

function toggleSidebar() {
    sidebarAberta = !sidebarAberta;
    if (!sidebarAberta) {
        dataSelecionada = null;
    }
    renderizar();
}

function limparFiltroData() {
    dataSelecionada = null;
    renderizar();
}

async function limparTodasTarefas() {
    const tarefasTimeline = obterTarefasTimeline();

    if (tarefasTimeline.length === 0) {
        mostrarToast('Não há tarefas para limpar.', 'info');
        return;
    }

    if (!confirm(`Limpar ${tarefasTimeline.length} tarefa(s)? As datas serão marcadas como "Concluído".`)) {
        return;
    }

    // Marca todas as tarefas da timeline como concluídas
    tarefasTimeline.forEach(tarefa => {
        const franqueado = franqueados.find(f => f.id === tarefa.id);
        if (franqueado) {
            franqueado.quando = 'Concluído';
            franqueado.dataAgendada = null;
        }
    });

    await salvarDados();
    dataSelecionada = null;
    renderizar();
    mostrarToast(`${tarefasTimeline.length} tarefa(s) limpa(s) com sucesso!`, 'success');
}

// ===================================
// Funções do Date Picker
// ===================================
function renderizarDatePicker() {
    const hoje = new Date();
    const mesPicker = mesAtual;
    const anoPicker = anoAtual;
    const primeiroDia = new Date(anoPicker, mesPicker, 1);
    const ultimoDia = new Date(anoPicker, mesPicker + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    let diasHTML = '';

    for (let i = 0; i < diaSemanaInicio; i++) {
        diasHTML += '<div class="picker-day empty"></div>';
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const ehHoje = dia === hoje.getDate() && mesPicker === hoje.getMonth() && anoPicker === hoje.getFullYear();
        diasHTML += `
            <div class="picker-day ${ehHoje ? 'today' : ''}" onclick="selecionarDataPicker(${dia})">
                ${dia}
            </div>
        `;
    }

    return `
        <div id="datePickerOverlay" class="datepicker-overlay" onclick="fecharDatePicker(event)">
            <div class="datepicker-container" onclick="event.stopPropagation()">
                <div class="datepicker-header">
                    <button class="btn-picker-nav" onclick="navegarMesPicker(-1)">&#9664;</button>
                    <span>${MESES[mesPicker]} ${anoPicker}</span>
                    <button class="btn-picker-nav" onclick="navegarMesPicker(1)">&#9654;</button>
                </div>
                <div class="datepicker-weekdays">
                    ${DIAS_SEMANA.map(d => `<div>${d}</div>`).join('')}
                </div>
                <div class="datepicker-days">
                    ${diasHTML}
                </div>
                <div class="datepicker-time">
                    <label>Horário:</label>
                    <input type="time" id="pickerHora" value="09:00">
                </div>
                <div class="datepicker-actions">
                    <button class="btn btn-secondary btn-small" onclick="fecharDatePickerBtn()">Cancelar</button>
                    <button class="btn btn-primary btn-small" onclick="aplicarDataRapida('hoje')">Hoje</button>
                    <button class="btn btn-primary btn-small" onclick="aplicarDataRapida('amanha')">Amanhã</button>
                </div>
            </div>
        </div>
    `;
}

function abrirDatePicker() {
    document.getElementById('datePickerOverlay').classList.add('active');
}

function fecharDatePicker(event) {
    if (event.target.id === 'datePickerOverlay') {
        document.getElementById('datePickerOverlay').classList.remove('active');
    }
}

function fecharDatePickerBtn() {
    document.getElementById('datePickerOverlay').classList.remove('active');
}

function navegarMesPicker(direcao) {
    mesAtual += direcao;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    } else if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    // Re-renderiza apenas o date picker
    const overlay = document.getElementById('datePickerOverlay');
    const wasActive = overlay.classList.contains('active');
    renderizar();
    if (wasActive) {
        document.getElementById('datePickerOverlay').classList.add('active');
    }
}

function selecionarDataPicker(dia) {
    const hora = document.getElementById('pickerHora').value || '09:00';
    const dataFormatada = `${String(dia).padStart(2, '0')}/${String(mesAtual + 1).padStart(2, '0')}/${anoAtual} ${hora}`;

    document.getElementById('inputQuando').value = dataFormatada;
    document.getElementById('inputDataAgendada').value = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}T${hora}`;

    fecharDatePickerBtn();
}

function aplicarDataRapida(tipo) {
    const hora = document.getElementById('pickerHora').value || '09:00';
    const hoje = new Date();
    let dataTexto = '';
    let dataISO = '';

    if (tipo === 'hoje') {
        dataTexto = `Hoje ${hora}`;
        dataISO = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}T${hora}`;
    } else if (tipo === 'amanha') {
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        dataTexto = `Amanhã ${hora}`;
        dataISO = `${amanha.getFullYear()}-${String(amanha.getMonth() + 1).padStart(2, '0')}-${String(amanha.getDate()).padStart(2, '0')}T${hora}`;
    }

    document.getElementById('inputQuando').value = dataTexto;
    document.getElementById('inputDataAgendada').value = dataISO;

    fecharDatePickerBtn();
}

// ===================================
// Funções de Drag & Drop
// ===================================
function configurarDragDrop() {
    const colunas = document.querySelectorAll('.column-content');

    colunas.forEach(coluna => {
        coluna.addEventListener('dragover', handleDragOver);
        coluna.addEventListener('dragleave', handleDragLeave);
        coluna.addEventListener('drop', handleDrop);
    });
}

function iniciarDrag(event) {
    draggedCard = event.target;
    draggedCard.classList.add('dragging');
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    event.dataTransfer.effectAllowed = 'move';
}

function finalizarDrag(event) {
    if (draggedCard) {
        draggedCard.classList.remove('dragging');
        draggedCard = null;
    }

    document.querySelectorAll('.column-content').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

async function handleDrop(event) {
    event.preventDefault();
    const coluna = event.currentTarget;
    coluna.classList.remove('drag-over');

    const id = parseInt(event.dataTransfer.getData('text/plain'));
    const novaFase = coluna.dataset.fase;

    const franqueado = franqueados.find(f => f.id === id);
    if (franqueado && franqueado.fase !== novaFase) {
        const faseAnterior = FASES_PIPELINE[franqueado.fase].nome;
        const faseNova = FASES_PIPELINE[novaFase].nome;

        franqueado.fase = novaFase;
        await salvarDados();
        renderizar();

        mostrarToast(`${franqueado.nome} movido para "${faseNova}"`, 'success');
    }
}

// ===================================
// Funções do Modal
// ===================================
function abrirModal(id = null) {
    editandoId = id;
    const modal = document.getElementById('modalOverlay');
    const titulo = document.getElementById('modalTitulo');

    if (id) {
        const f = franqueados.find(x => x.id === id);
        if (f) {
            titulo.textContent = 'Editar Franqueado';
            document.getElementById('inputNome').value = f.nome;
            document.getElementById('inputFase').value = f.fase;
            document.getElementById('inputTarefa').value = f.tarefa;
            document.getElementById('inputQuando').value = f.quando || '';
            document.getElementById('inputDataAgendada').value = f.dataAgendada || '';
            document.getElementById('inputPrioridade').value = f.prioridade || 'media';
            document.getElementById('inputValor').value = f.valor || 0;
            document.getElementById('inputNotas').value = f.notas || '';
        }
    } else {
        titulo.textContent = 'Novo Franqueado';
        document.getElementById('inputNome').value = '';
        document.getElementById('inputFase').value = 'prospect';
        document.getElementById('inputTarefa').value = 'LIGAR';
        document.getElementById('inputQuando').value = '';
        document.getElementById('inputDataAgendada').value = '';
        document.getElementById('inputPrioridade').value = 'media';
        document.getElementById('inputValor').value = '0';
        document.getElementById('inputNotas').value = '';
    }

    modal.classList.add('active');
    document.getElementById('inputNome').focus();
}

function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    editandoId = null;
}

function fecharModalOverlay(event) {
    if (event.target.id === 'modalOverlay') {
        fecharModal();
    }
}

async function salvarFranqueado() {
    const nome = document.getElementById('inputNome').value.trim();

    if (!nome) {
        mostrarToast('Por favor, informe o nome do franqueado.', 'error');
        return;
    }

    const dados = {
        nome,
        fase: document.getElementById('inputFase').value,
        tarefa: document.getElementById('inputTarefa').value,
        quando: document.getElementById('inputQuando').value || '-',
        dataAgendada: document.getElementById('inputDataAgendada').value || null,
        prioridade: document.getElementById('inputPrioridade').value,
        valor: parseFloat(document.getElementById('inputValor').value) || 0,
        notas: document.getElementById('inputNotas').value.trim()
    };

    if (editandoId) {
        franqueados = franqueados.map(f =>
            f.id === editandoId ? { ...dados, id: editandoId } : f
        );
        mostrarToast('Franqueado atualizado com sucesso!', 'success');
    } else {
        dados.id = Date.now();
        franqueados.push(dados);
        mostrarToast('Franqueado adicionado com sucesso!', 'success');
    }

    await salvarDados();
    fecharModal();
    renderizar();
}

function editarFranqueado(id) {
    abrirModal(id);
}

async function excluirFranqueado(id) {
    const f = franqueados.find(x => x.id === id);
    if (f && confirm(`Remover "${f.nome}" da lista?`)) {
        franqueados = franqueados.filter(x => x.id !== id);
        await salvarDados();
        renderizar();
        mostrarToast(`${f.nome} removido da lista.`, 'info');
    }
}

// ===================================
// Funções de Filtro
// ===================================
function filtrarFranqueados(termo) {
    filtroAtual = termo.toLowerCase();
    renderizar();

    // Manter foco no campo de busca
    setTimeout(() => {
        const input = document.getElementById('searchInput');
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    }, 0);
}

function filtrarPorPrioridade(prioridade) {
    // Implementar filtro por prioridade
    renderizar();
}

function filtrarLista() {
    if (!filtroAtual) return franqueados;

    return franqueados.filter(f =>
        f.nome.toLowerCase().includes(filtroAtual) ||
        f.tarefa.toLowerCase().includes(filtroAtual) ||
        (f.notas && f.notas.toLowerCase().includes(filtroAtual))
    );
}

// ===================================
// Funções de UI
// ===================================
function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = mensagem;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function configurarEventos() {
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
        }
        if (e.key === 'n' && e.ctrlKey) {
            e.preventDefault();
            abrirModal();
        }
    });
}

// ===================================
// Funções de Exportação
// ===================================
function exportarDados() {
    const dados = franqueados.map(f => ({
        Nome: f.nome,
        Fase: FASES_PIPELINE[f.fase]?.nome || f.fase,
        Tarefa: f.tarefa,
        Quando: f.quando,
        Prioridade: PRIORIDADES[f.prioridade]?.label || f.prioridade,
        Valor: f.valor,
        Notas: f.notas || ''
    }));

    // Criar CSV
    const headers = Object.keys(dados[0]);
    const csv = [
        headers.join(';'),
        ...dados.map(row => headers.map(h => `"${row[h]}"`).join(';'))
    ].join('\n');

    // Download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `franqueados_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    mostrarToast('Dados exportados com sucesso!', 'success');
}

// ===================================
// Funções da TO-DO List
// ===================================
function renderizarAbaTarefas() {
    const tarefasFiltradas = filtrarTarefas();
    const pendentes = tarefas.filter(t => !t.concluida).length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    // Contadores por responsável
    const minhasTarefas = tarefas.filter(t => !t.responsavel || t.responsavel === 'eu').length;
    const tarefasLeo = tarefas.filter(t => t.responsavel === 'leo').length;

    return `
        <div class="todo-container dense">
            <div class="todo-header-row">
                <div class="todo-stats">
                    <span class="todo-stat">📋 ${pendentes} pendente${pendentes !== 1 ? 's' : ''}</span>
                    <span class="todo-stat">✅ ${concluidas} concluída${concluidas !== 1 ? 's' : ''}</span>
                </div>
                <button class="btn btn-primary btn-sm" onclick="abrirModalTarefa()">+ Nova Tarefa</button>
            </div>
            <div class="todo-filters-row">
                <div class="todo-filters">
                    <button class="todo-filter-btn ${filtroTarefas === 'todas' ? 'active' : ''}" onclick="mudarFiltroTarefas('todas')">
                        Todas (${tarefas.length})
                    </button>
                    <button class="todo-filter-btn ${filtroTarefas === 'pendentes' ? 'active' : ''}" onclick="mudarFiltroTarefas('pendentes')">
                        Pendentes (${pendentes})
                    </button>
                    <button class="todo-filter-btn ${filtroTarefas === 'concluidas' ? 'active' : ''}" onclick="mudarFiltroTarefas('concluidas')">
                        Concluídas (${concluidas})
                    </button>
                </div>
                <div class="todo-filters responsavel-filters">
                    <button class="todo-filter-btn ${filtroResponsavel === 'todos' ? 'active' : ''}" onclick="mudarFiltroResponsavel('todos')">
                        👥 Todos
                    </button>
                    <button class="todo-filter-btn ${filtroResponsavel === 'eu' ? 'active' : ''}" onclick="mudarFiltroResponsavel('eu')">
                        🙋 Eu (${minhasTarefas})
                    </button>
                    <button class="todo-filter-btn ${filtroResponsavel === 'leo' ? 'active' : ''}" onclick="mudarFiltroResponsavel('leo')">
                        👤 Leo (${tarefasLeo})
                    </button>
                </div>
            </div>
            <div class="todo-list dense">
                ${tarefasFiltradas.length === 0 ? `
                    <div class="todo-empty">
                        <div class="todo-empty-icon">📝</div>
                        <p>Nenhuma tarefa ${filtroTarefas === 'todas' ? 'cadastrada' : filtroTarefas}</p>
                        <button class="btn btn-primary" onclick="abrirModalTarefa()">+ Adicionar Tarefa</button>
                    </div>
                ` : tarefasFiltradas.map(t => renderizarItemTarefa(t)).join('')}
            </div>
        </div>
    `;
}

function renderizarItemTarefa(tarefa) {
    const prioridadeClass = PRIORIDADES[tarefa.prioridade]?.class || '';
    const prioridadeLabel = PRIORIDADES[tarefa.prioridade]?.label || 'Média';
    const responsavel = COLABORADORES.find(c => c.id === tarefa.responsavel) || COLABORADORES[0];

    return `
        <div class="todo-item dense ${prioridadeClass} ${tarefa.concluida ? 'concluida' : ''}" data-id="${tarefa.id}">
            <button class="todo-check-btn ${tarefa.concluida ? 'checked' : ''}" onclick="toggleTarefa(${tarefa.id})" title="${tarefa.concluida ? 'Reabrir tarefa' : 'Marcar como concluída'}">
                ${tarefa.concluida ? '✓' : ''}
            </button>
            <div class="todo-content">
                <div class="todo-texto ${tarefa.concluida ? 'riscado' : ''}">${tarefa.texto}</div>
                <div class="todo-meta">
                    <span class="todo-responsavel" style="background: ${responsavel.cor}20; color: ${responsavel.cor}; border: 1px solid ${responsavel.cor}40;">
                        ${responsavel.nome}
                    </span>
                    <span class="todo-prioridade ${prioridadeClass}">${prioridadeLabel}</span>
                    ${tarefa.dataVencimento ? `<span class="todo-data">📅 ${formatarDataTarefa(tarefa.dataVencimento)}</span>` : ''}
                </div>
            </div>
            <div class="todo-actions">
                <button class="btn-icon" onclick="editarTarefa(${tarefa.id})" title="Editar">✏️</button>
                <button class="btn-icon" onclick="excluirTarefa(${tarefa.id})" title="Excluir">🗑️</button>
            </div>
        </div>
    `;
}

function renderizarModalTarefa() {
    return `
        <div id="modalTarefaOverlay" class="modal-overlay" onclick="fecharModalTarefaOverlay(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 id="modalTarefaTitulo">Nova Tarefa</h2>
                    <button class="modal-close" onclick="fecharModalTarefa()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Descrição da Tarefa *</label>
                        <input type="text" id="inputTarefaTexto" class="form-input" placeholder="O que você precisa fazer?">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Responsável</label>
                            <select id="inputTarefaResponsavel" class="form-select">
                                ${COLABORADORES.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Prioridade</label>
                            <select id="inputTarefaPrioridade" class="form-select">
                                <option value="alta">🔴 Alta</option>
                                <option value="media" selected>🟡 Média</option>
                                <option value="baixa">🟢 Baixa</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data de Vencimento</label>
                            <input type="date" id="inputTarefaData" class="form-input">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalTarefa()">Cancelar</button>
                    <button class="btn btn-success" onclick="salvarTarefa()">💾 Salvar</button>
                </div>
            </div>
        </div>
    `;
}

function filtrarTarefas() {
    let resultado = tarefas;

    // Filtro por status
    if (filtroTarefas === 'pendentes') {
        resultado = resultado.filter(t => !t.concluida);
    } else if (filtroTarefas === 'concluidas') {
        resultado = resultado.filter(t => t.concluida);
    }

    // Filtro por responsável
    if (filtroResponsavel !== 'todos') {
        resultado = resultado.filter(t => {
            const resp = t.responsavel || 'eu';
            return resp === filtroResponsavel;
        });
    }

    return resultado;
}

function mudarFiltroTarefas(filtro) {
    filtroTarefas = filtro;
    renderizar();
}

function mudarFiltroResponsavel(filtro) {
    filtroResponsavel = filtro;
    renderizar();
}

function formatarDataTarefa(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

async function toggleTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        await salvarTarefas();
        renderizar();
        mostrarToast(tarefa.concluida ? 'Tarefa concluída!' : 'Tarefa reaberta', 'success');
    }
}

async function excluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa && confirm(`Excluir tarefa "${tarefa.texto}"?`)) {
        tarefas = tarefas.filter(t => t.id !== id);
        await salvarTarefas();
        renderizar();
        mostrarToast('Tarefa excluída', 'info');
    }
}

async function limparTarefasConcluidas() {
    const concluidas = tarefas.filter(t => t.concluida).length;
    if (concluidas === 0) {
        mostrarToast('Não há tarefas concluídas para limpar', 'info');
        return;
    }
    if (confirm(`Remover ${concluidas} tarefa(s) concluída(s)?`)) {
        tarefas = tarefas.filter(t => !t.concluida);
        await salvarTarefas();
        renderizar();
        mostrarToast(`${concluidas} tarefa(s) removida(s)`, 'success');
    }
}

function abrirModalTarefa(id = null) {
    editandoTarefaId = id;
    const modal = document.getElementById('modalTarefaOverlay');
    const titulo = document.getElementById('modalTarefaTitulo');

    if (id) {
        const t = tarefas.find(x => x.id === id);
        if (t) {
            titulo.textContent = 'Editar Tarefa';
            document.getElementById('inputTarefaTexto').value = t.texto;
            document.getElementById('inputTarefaResponsavel').value = t.responsavel || 'eu';
            document.getElementById('inputTarefaPrioridade').value = t.prioridade || 'media';
            document.getElementById('inputTarefaData').value = t.dataVencimento || '';
        }
    } else {
        titulo.textContent = 'Nova Tarefa';
        document.getElementById('inputTarefaTexto').value = '';
        document.getElementById('inputTarefaResponsavel').value = 'eu';
        document.getElementById('inputTarefaPrioridade').value = 'media';
        document.getElementById('inputTarefaData').value = '';
    }

    modal.classList.add('active');
    document.getElementById('inputTarefaTexto').focus();
}

function fecharModalTarefa() {
    document.getElementById('modalTarefaOverlay').classList.remove('active');
    editandoTarefaId = null;
}

function fecharModalTarefaOverlay(event) {
    if (event.target.id === 'modalTarefaOverlay') {
        fecharModalTarefa();
    }
}

function editarTarefa(id) {
    abrirModalTarefa(id);
}

async function salvarTarefa() {
    const texto = document.getElementById('inputTarefaTexto').value.trim();

    if (!texto) {
        mostrarToast('Por favor, descreva a tarefa.', 'error');
        return;
    }

    const dados = {
        texto,
        responsavel: document.getElementById('inputTarefaResponsavel').value,
        prioridade: document.getElementById('inputTarefaPrioridade').value,
        dataVencimento: document.getElementById('inputTarefaData').value || null,
        concluida: false
    };

    if (editandoTarefaId) {
        tarefas = tarefas.map(t =>
            t.id === editandoTarefaId ? { ...t, ...dados } : t
        );
        mostrarToast('Tarefa atualizada!', 'success');
    } else {
        dados.id = Date.now();
        dados.dataCriacao = new Date().toISOString();
        tarefas.unshift(dados);
        mostrarToast('Tarefa adicionada!', 'success');
    }

    await salvarTarefas();
    fecharModalTarefa();
    renderizar();
}

// ===================================
// Funções de Pagamentos
// ===================================
function renderizarAbaPagamentos() {
    const pagamentosFiltrados = filtrarPagamentosList();
    const pendentes = pagamentos.filter(p => p.status === 'pendente').length;
    const pagos = pagamentos.filter(p => p.status === 'pago').length;
    const atrasados = pagamentos.filter(p => {
        if (p.status !== 'pendente') return false;
        const vencimento = new Date(p.dataVencimento);
        return vencimento < new Date();
    }).length;

    const totalRecebido = pagamentos
        .filter(p => p.status === 'pago')
        .reduce((sum, p) => sum + (p.valor || 0), 0);

    return `
        <div class="pagamentos-container">
            <div class="pagamentos-stats">
                <div class="pagamento-stat-card">
                    <div class="pagamento-stat-icon">💰</div>
                    <div class="pagamento-stat-value">${formatarMoeda(totalRecebido)}</div>
                    <div class="pagamento-stat-label">Total Recebido</div>
                </div>
                <div class="pagamento-stat-card">
                    <div class="pagamento-stat-icon">⏳</div>
                    <div class="pagamento-stat-value">${pendentes}</div>
                    <div class="pagamento-stat-label">Pendentes</div>
                </div>
                <div class="pagamento-stat-card pagamento-stat-success">
                    <div class="pagamento-stat-icon">✅</div>
                    <div class="pagamento-stat-value">${pagos}</div>
                    <div class="pagamento-stat-label">Pagos</div>
                </div>
                <div class="pagamento-stat-card pagamento-stat-danger">
                    <div class="pagamento-stat-icon">🚨</div>
                    <div class="pagamento-stat-value">${atrasados}</div>
                    <div class="pagamento-stat-label">Atrasados</div>
                </div>
            </div>
            <div class="pagamentos-filters">
                <button class="pagamento-filter-btn ${filtroPagamentos === 'todos' ? 'active' : ''}" onclick="mudarFiltroPagamentos('todos')">
                    Todos (${pagamentos.length})
                </button>
                <button class="pagamento-filter-btn ${filtroPagamentos === 'pendentes' ? 'active' : ''}" onclick="mudarFiltroPagamentos('pendentes')">
                    Pendentes (${pendentes})
                </button>
                <button class="pagamento-filter-btn ${filtroPagamentos === 'atrasados' ? 'active' : ''}" onclick="mudarFiltroPagamentos('atrasados')">
                    Atrasados (${atrasados})
                </button>
                <button class="pagamento-filter-btn ${filtroPagamentos === 'pagos' ? 'active' : ''}" onclick="mudarFiltroPagamentos('pagos')">
                    Pagos (${pagos})
                </button>
            </div>
            <div class="pagamentos-lista">
                ${pagamentosFiltrados.length === 0 ? `
                    <div class="pagamentos-empty">
                        <div class="pagamentos-empty-icon">💳</div>
                        <p>Nenhum pagamento ${filtroPagamentos === 'todos' ? 'cadastrado' : filtroPagamentos}</p>
                        <button class="btn btn-primary" onclick="abrirModalPagamento()">➕ Adicionar Pagamento</button>
                    </div>
                ` : pagamentosFiltrados.map(p => renderizarItemPagamento(p)).join('')}
            </div>
        </div>
    `;
}

function renderizarItemPagamento(pagamento) {
    const vencimento = new Date(pagamento.dataVencimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    vencimento.setHours(0, 0, 0, 0);

    const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
    const estaAtrasado = pagamento.status === 'pendente' && diasRestantes < 0;
    const venceHoje = pagamento.status === 'pendente' && diasRestantes === 0;
    const venceBreve = pagamento.status === 'pendente' && diasRestantes > 0 && diasRestantes <= 3;

    let statusClass = '';
    let statusTexto = '';

    if (pagamento.status === 'pago') {
        statusClass = 'status-pago';
        statusTexto = '✅ Pago';
    } else if (estaAtrasado) {
        statusClass = 'status-atrasado';
        statusTexto = `🚨 Atrasado ${Math.abs(diasRestantes)} dia(s)`;
    } else if (venceHoje) {
        statusClass = 'status-hoje';
        statusTexto = '⚠️ Vence Hoje';
    } else if (venceBreve) {
        statusClass = 'status-breve';
        statusTexto = `⏳ Vence em ${diasRestantes} dia(s)`;
    } else {
        statusClass = 'status-pendente';
        statusTexto = `📅 Vence em ${diasRestantes} dia(s)`;
    }

    const dataVencimentoFormatada = vencimento.toLocaleDateString('pt-BR');
    const dataPagamentoFormatada = pagamento.dataPagamento ?
        new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR') : '';

    return `
        <div class="pagamento-item ${statusClass}" data-id="${pagamento.id}">
            <div class="pagamento-info">
                <div class="pagamento-nome">${pagamento.franqueadoNome}</div>
                <div class="pagamento-detalhes">
                    <span class="pagamento-valor">${formatarMoeda(pagamento.valor)}</span>
                    <span class="pagamento-separador">•</span>
                    <span class="pagamento-vencimento">Venc: ${dataVencimentoFormatada}</span>
                    ${pagamento.status === 'pago' && dataPagamentoFormatada ? `
                        <span class="pagamento-separador">•</span>
                        <span class="pagamento-data-pago">Pago: ${dataPagamentoFormatada}</span>
                    ` : ''}
                </div>
                ${pagamento.descricao ? `<div class="pagamento-descricao">${pagamento.descricao}</div>` : ''}
            </div>
            <div class="pagamento-status">
                <span class="pagamento-status-badge ${statusClass}">${statusTexto}</span>
            </div>
            <div class="pagamento-actions">
                ${pagamento.status === 'pendente' ? `
                    <button class="btn btn-success btn-small" onclick="marcarComoPago(${pagamento.id})" title="Marcar como Pago">
                        ✅ Pago
                    </button>
                ` : `
                    <button class="btn btn-secondary btn-small" onclick="marcarComoPendente(${pagamento.id})" title="Marcar como Pendente">
                        ↩️ Pendente
                    </button>
                `}
                <button class="btn-icon" onclick="editarPagamento(${pagamento.id})" title="Editar">✏️</button>
                <button class="btn-icon" onclick="excluirPagamento(${pagamento.id})" title="Excluir">🗑️</button>
            </div>
        </div>
    `;
}

function renderizarModalPagamento() {
    const franqueadosOptions = franqueados
        .filter(f => f.fase === 'fechado' || f.fase === 'pendente_pagamento')
        .map(f => `<option value="${f.nome}">${f.nome}</option>`)
        .join('');

    return `
        <div id="modalPagamentoOverlay" class="modal-overlay" onclick="fecharModalPagamentoOverlay(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 id="modalPagamentoTitulo">Novo Pagamento</h2>
                    <button class="modal-close" onclick="fecharModalPagamento()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">Franqueado *</label>
                        <select id="inputPagamentoFranqueado" class="form-select">
                            <option value="">Selecione ou digite...</option>
                            ${franqueadosOptions}
                        </select>
                        <input type="text" id="inputPagamentoFranqueadoNome" class="form-input" placeholder="Ou digite o nome" style="margin-top: 8px;">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Valor (R$) *</label>
                            <input type="number" id="inputPagamentoValor" class="form-input" placeholder="0.00" step="0.01">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Data de Vencimento *</label>
                            <input type="date" id="inputPagamentoVencimento" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Descrição</label>
                        <input type="text" id="inputPagamentoDescricao" class="form-input" placeholder="Ex: Mensalidade Dezembro">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select id="inputPagamentoStatus" class="form-select">
                            <option value="pendente">⏳ Pendente</option>
                            <option value="pago">✅ Pago</option>
                        </select>
                    </div>
                    <div class="form-group" id="grupoPagamentoData" style="display: none;">
                        <label class="form-label">Data do Pagamento</label>
                        <input type="date" id="inputPagamentoData" class="form-input">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalPagamento()">Cancelar</button>
                    <button class="btn btn-success" onclick="salvarPagamento()">💾 Salvar</button>
                </div>
            </div>
        </div>
    `;
}

function filtrarPagamentosList() {
    let lista = [...pagamentos];

    if (filtroPagamentos === 'pendentes') {
        lista = lista.filter(p => p.status === 'pendente');
    } else if (filtroPagamentos === 'pagos') {
        lista = lista.filter(p => p.status === 'pago');
    } else if (filtroPagamentos === 'atrasados') {
        lista = lista.filter(p => {
            if (p.status !== 'pendente') return false;
            const vencimento = new Date(p.dataVencimento);
            return vencimento < new Date();
        });
    }

    // Ordena por data de vencimento
    lista.sort((a, b) => new Date(a.dataVencimento) - new Date(b.dataVencimento));

    return lista;
}

function mudarFiltroPagamentos(filtro) {
    filtroPagamentos = filtro;
    renderizar();
}

function abrirModalPagamento(id = null) {
    editandoPagamentoId = id;
    const modal = document.getElementById('modalPagamentoOverlay');
    const titulo = document.getElementById('modalPagamentoTitulo');
    const statusSelect = document.getElementById('inputPagamentoStatus');
    const grupoData = document.getElementById('grupoPagamentoData');

    if (id) {
        const p = pagamentos.find(x => x.id === id);
        if (p) {
            titulo.textContent = 'Editar Pagamento';
            document.getElementById('inputPagamentoFranqueado').value = p.franqueadoNome;
            document.getElementById('inputPagamentoFranqueadoNome').value = p.franqueadoNome;
            document.getElementById('inputPagamentoValor').value = p.valor;
            document.getElementById('inputPagamentoVencimento').value = p.dataVencimento;
            document.getElementById('inputPagamentoDescricao').value = p.descricao || '';
            document.getElementById('inputPagamentoStatus').value = p.status;
            document.getElementById('inputPagamentoData').value = p.dataPagamento || '';
            grupoData.style.display = p.status === 'pago' ? 'block' : 'none';
        }
    } else {
        titulo.textContent = 'Novo Pagamento';
        document.getElementById('inputPagamentoFranqueado').value = '';
        document.getElementById('inputPagamentoFranqueadoNome').value = '';
        document.getElementById('inputPagamentoValor').value = '';
        document.getElementById('inputPagamentoVencimento').value = '';
        document.getElementById('inputPagamentoDescricao').value = '';
        document.getElementById('inputPagamentoStatus').value = 'pendente';
        document.getElementById('inputPagamentoData').value = '';
        grupoData.style.display = 'none';
    }

    // Listener para mostrar/ocultar data de pagamento
    statusSelect.onchange = function() {
        grupoData.style.display = this.value === 'pago' ? 'block' : 'none';
    };

    modal.classList.add('active');
}

function fecharModalPagamento() {
    document.getElementById('modalPagamentoOverlay').classList.remove('active');
    editandoPagamentoId = null;
}

function fecharModalPagamentoOverlay(event) {
    if (event.target.id === 'modalPagamentoOverlay') {
        fecharModalPagamento();
    }
}

function editarPagamento(id) {
    abrirModalPagamento(id);
}

async function salvarPagamento() {
    const franqueadoSelect = document.getElementById('inputPagamentoFranqueado').value;
    const franqueadoInput = document.getElementById('inputPagamentoFranqueadoNome').value.trim();
    const franqueadoNome = franqueadoInput || franqueadoSelect;
    const valor = parseFloat(document.getElementById('inputPagamentoValor').value);
    const dataVencimento = document.getElementById('inputPagamentoVencimento').value;

    if (!franqueadoNome) {
        mostrarToast('Selecione ou digite o nome do franqueado.', 'error');
        return;
    }
    if (!valor || valor <= 0) {
        mostrarToast('Informe um valor válido.', 'error');
        return;
    }
    if (!dataVencimento) {
        mostrarToast('Informe a data de vencimento.', 'error');
        return;
    }

    const status = document.getElementById('inputPagamentoStatus').value;
    const dados = {
        franqueadoNome,
        valor,
        dataVencimento,
        descricao: document.getElementById('inputPagamentoDescricao').value.trim(),
        status,
        dataPagamento: status === 'pago' ?
            (document.getElementById('inputPagamentoData').value || new Date().toISOString().split('T')[0]) : null
    };

    if (editandoPagamentoId) {
        pagamentos = pagamentos.map(p =>
            p.id === editandoPagamentoId ? { ...p, ...dados } : p
        );
        mostrarToast('Pagamento atualizado!', 'success');
    } else {
        dados.id = Date.now();
        dados.dataCriacao = new Date().toISOString();
        pagamentos.push(dados);
        mostrarToast('Pagamento adicionado!', 'success');
    }

    await salvarPagamentos();
    fecharModalPagamento();
    renderizar();
}

async function marcarComoPago(id) {
    const pagamento = pagamentos.find(p => p.id === id);
    if (pagamento) {
        pagamento.status = 'pago';
        pagamento.dataPagamento = new Date().toISOString().split('T')[0];
        await salvarPagamentos();
        renderizar();
        mostrarToast(`Pagamento de ${pagamento.franqueadoNome} marcado como pago!`, 'success');
    }
}

async function marcarComoPendente(id) {
    const pagamento = pagamentos.find(p => p.id === id);
    if (pagamento) {
        pagamento.status = 'pendente';
        pagamento.dataPagamento = null;
        await salvarPagamentos();
        renderizar();
        mostrarToast(`Pagamento reaberto como pendente.`, 'info');
    }
}

async function excluirPagamento(id) {
    const pagamento = pagamentos.find(p => p.id === id);
    if (pagamento && confirm(`Excluir pagamento de "${pagamento.franqueadoNome}"?`)) {
        pagamentos = pagamentos.filter(p => p.id !== id);
        await salvarPagamentos();
        renderizar();
        mostrarToast('Pagamento excluído', 'info');
    }
}

// ===================================
// Extrato Bancário - Funções de Renderização
// ===================================
function renderizarAbaExtrato() {
    const totalEntradas = extrato.transacoes
        .filter(t => t.tipo === 'entrada')
        .reduce((acc, t) => acc + t.valor, 0);
    const totalSaidas = extrato.transacoes
        .filter(t => t.tipo === 'saida')
        .reduce((acc, t) => acc + t.valor, 0);

    const contasRecorrentesTotal = extrato.contasRecorrentes
        .filter(c => c.ativa)
        .reduce((acc, c) => acc + c.valor, 0);

    const boletosPendentes = extrato.boletosFuturos
        .filter(b => b.status === 'pendente')
        .reduce((acc, b) => acc + b.valor, 0);

    return `
        <div class="extrato-container">
            <div class="extrato-header">
                <div class="extrato-saldo-card">
                    <div class="saldo-info">
                        <span class="saldo-label">Saldo Atual</span>
                        <span class="saldo-valor ${extrato.saldoAtual >= 0 ? 'positivo' : 'negativo'}">
                            ${formatarMoeda(extrato.saldoAtual)}
                        </span>
                    </div>
                    <div class="saldo-resumo">
                        <div class="resumo-item entrada">
                            <span class="resumo-icon">📈</span>
                            <span class="resumo-label">Entradas</span>
                            <span class="resumo-valor">${formatarMoeda(totalEntradas)}</span>
                        </div>
                        <div class="resumo-item saida">
                            <span class="resumo-icon">📉</span>
                            <span class="resumo-label">Saídas</span>
                            <span class="resumo-valor">${formatarMoeda(totalSaidas)}</span>
                        </div>
                        <div class="resumo-item recorrente">
                            <span class="resumo-icon">🔄</span>
                            <span class="resumo-label">Recorrentes/mês</span>
                            <span class="resumo-valor">${formatarMoeda(contasRecorrentesTotal)}</span>
                        </div>
                        <div class="resumo-item boletos">
                            <span class="resumo-icon">📋</span>
                            <span class="resumo-label">Boletos Pendentes</span>
                            <span class="resumo-valor">${formatarMoeda(boletosPendentes)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="extrato-sub-tabs">
                <button class="sub-tab-btn ${subAbaExtrato === 'transacoes' ? 'active' : ''}" onclick="mudarSubAbaExtrato('transacoes')">
                    📜 Histórico de Transações
                </button>
                <button class="sub-tab-btn ${subAbaExtrato === 'recorrentes' ? 'active' : ''}" onclick="mudarSubAbaExtrato('recorrentes')">
                    🔄 Contas Recorrentes
                    <span class="sub-tab-badge">${extrato.contasRecorrentes.filter(c => c.ativa).length}</span>
                </button>
                <button class="sub-tab-btn ${subAbaExtrato === 'boletos' ? 'active' : ''}" onclick="mudarSubAbaExtrato('boletos')">
                    📋 Boletos Futuros
                    <span class="sub-tab-badge">${extrato.boletosFuturos.filter(b => b.status === 'pendente').length}</span>
                </button>
            </div>

            ${subAbaExtrato === 'transacoes' ? renderizarTransacoes() : ''}
            ${subAbaExtrato === 'recorrentes' ? renderizarContasRecorrentes() : ''}
            ${subAbaExtrato === 'boletos' ? renderizarBoletos() : ''}
        </div>
    `;
}

function mudarSubAbaExtrato(subAba) {
    subAbaExtrato = subAba;
    renderizar();
}

function mudarFiltroExtrato(filtro) {
    filtroExtrato = filtro;
    renderizar();
}

function renderizarTransacoes() {
    let transacoesFiltradas = [...extrato.transacoes];

    if (filtroExtrato === 'entradas') {
        transacoesFiltradas = transacoesFiltradas.filter(t => t.tipo === 'entrada');
    } else if (filtroExtrato === 'saidas') {
        transacoesFiltradas = transacoesFiltradas.filter(t => t.tipo === 'saida');
    }

    // Ordenar por data (mais recente primeiro)
    transacoesFiltradas.sort((a, b) => new Date(b.data) - new Date(a.data));

    return `
        <div class="extrato-content">
            <div class="extrato-filtros">
                <button class="filtro-btn ${filtroExtrato === 'todos' ? 'active' : ''}" onclick="mudarFiltroExtrato('todos')">
                    Todos (${extrato.transacoes.length})
                </button>
                <button class="filtro-btn ${filtroExtrato === 'entradas' ? 'active' : ''}" onclick="mudarFiltroExtrato('entradas')">
                    📈 Entradas (${extrato.transacoes.filter(t => t.tipo === 'entrada').length})
                </button>
                <button class="filtro-btn ${filtroExtrato === 'saidas' ? 'active' : ''}" onclick="mudarFiltroExtrato('saidas')">
                    📉 Saídas (${extrato.transacoes.filter(t => t.tipo === 'saida').length})
                </button>
            </div>

            <div class="transacoes-lista">
                ${transacoesFiltradas.length === 0 ? `
                    <div class="empty-state">
                        <span class="empty-icon">📜</span>
                        <p>Nenhuma transação registrada</p>
                        <button class="btn btn-primary" onclick="abrirModalTransacao()">Adicionar Transação</button>
                    </div>
                ` : transacoesFiltradas.map(t => `
                    <div class="transacao-item ${t.tipo}">
                        <div class="transacao-icon">${t.tipo === 'entrada' ? '📈' : '📉'}</div>
                        <div class="transacao-info">
                            <span class="transacao-descricao">${t.descricao}</span>
                            <span class="transacao-categoria">${t.categoria || 'Sem categoria'}</span>
                            <span class="transacao-data">${formatarData(t.data)}</span>
                        </div>
                        <div class="transacao-valor ${t.tipo}">
                            ${t.tipo === 'entrada' ? '+' : '-'} ${formatarMoeda(t.valor)}
                        </div>
                        <div class="transacao-acoes">
                            <button class="btn-icon" onclick="abrirModalTransacao(${t.id})" title="Editar">✏️</button>
                            <button class="btn-icon" onclick="excluirTransacao(${t.id})" title="Excluir">🗑️</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderizarContasRecorrentes() {
    const contasAtivas = extrato.contasRecorrentes.filter(c => c.ativa);
    const contasInativas = extrato.contasRecorrentes.filter(c => !c.ativa);

    return `
        <div class="extrato-content">
            <div class="extrato-actions">
                <button class="btn btn-primary" onclick="abrirModalContaRecorrente()">
                    ➕ Nova Conta Recorrente
                </button>
            </div>

            <div class="contas-lista">
                ${extrato.contasRecorrentes.length === 0 ? `
                    <div class="empty-state">
                        <span class="empty-icon">🔄</span>
                        <p>Nenhuma conta recorrente cadastrada</p>
                        <button class="btn btn-primary" onclick="abrirModalContaRecorrente()">Adicionar Conta</button>
                    </div>
                ` : `
                    ${contasAtivas.length > 0 ? `
                        <h3 class="lista-titulo">Contas Ativas</h3>
                        ${contasAtivas.map(c => renderizarContaRecorrenteItem(c)).join('')}
                    ` : ''}
                    ${contasInativas.length > 0 ? `
                        <h3 class="lista-titulo inativas">Contas Inativas</h3>
                        ${contasInativas.map(c => renderizarContaRecorrenteItem(c)).join('')}
                    ` : ''}
                `}
            </div>
        </div>
    `;
}

function renderizarContaRecorrenteItem(conta) {
    return `
        <div class="conta-recorrente-item ${conta.ativa ? 'ativa' : 'inativa'}">
            <div class="conta-icon">${getCategoriaIcon(conta.categoria)}</div>
            <div class="conta-info">
                <span class="conta-nome">${conta.nome}</span>
                <span class="conta-categoria">${conta.categoria || 'Sem categoria'}</span>
                <span class="conta-vencimento">Vence dia ${conta.diaVencimento}</span>
            </div>
            <div class="conta-valor">
                ${formatarMoeda(conta.valor)}
                <span class="conta-frequencia">/${conta.frequencia || 'mês'}</span>
            </div>
            <div class="conta-acoes">
                <button class="btn-icon" onclick="toggleContaRecorrente(${conta.id})" title="${conta.ativa ? 'Desativar' : 'Ativar'}">
                    ${conta.ativa ? '⏸️' : '▶️'}
                </button>
                <button class="btn-icon" onclick="abrirModalContaRecorrente(${conta.id})" title="Editar">✏️</button>
                <button class="btn-icon" onclick="excluirContaRecorrente(${conta.id})" title="Excluir">🗑️</button>
            </div>
        </div>
    `;
}

function renderizarBoletos() {
    const boletosPendentes = extrato.boletosFuturos.filter(b => b.status === 'pendente');
    const boletosPagos = extrato.boletosFuturos.filter(b => b.status === 'pago');

    // Ordenar por data de vencimento
    boletosPendentes.sort((a, b) => new Date(a.dataVencimento) - new Date(b.dataVencimento));
    boletosPagos.sort((a, b) => new Date(b.dataPagamento || b.dataVencimento) - new Date(a.dataPagamento || a.dataVencimento));

    return `
        <div class="extrato-content">
            <div class="extrato-actions">
                <button class="btn btn-primary" onclick="abrirModalBoleto()">
                    ➕ Novo Boleto
                </button>
            </div>

            <div class="boletos-lista">
                ${extrato.boletosFuturos.length === 0 ? `
                    <div class="empty-state">
                        <span class="empty-icon">📋</span>
                        <p>Nenhum boleto cadastrado</p>
                        <button class="btn btn-primary" onclick="abrirModalBoleto()">Adicionar Boleto</button>
                    </div>
                ` : `
                    ${boletosPendentes.length > 0 ? `
                        <h3 class="lista-titulo">Boletos Pendentes</h3>
                        ${boletosPendentes.map(b => renderizarBoletoItem(b)).join('')}
                    ` : ''}
                    ${boletosPagos.length > 0 ? `
                        <h3 class="lista-titulo pagos">Boletos Pagos</h3>
                        ${boletosPagos.map(b => renderizarBoletoItem(b)).join('')}
                    ` : ''}
                `}
            </div>
        </div>
    `;
}

function renderizarBoletoItem(boleto) {
    const vencimento = new Date(boleto.dataVencimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));

    let statusClass = 'pendente';
    let statusLabel = '';

    if (boleto.status === 'pago') {
        statusClass = 'pago';
        statusLabel = 'Pago';
    } else if (diasRestantes < 0) {
        statusClass = 'atrasado';
        statusLabel = `Atrasado ${Math.abs(diasRestantes)} dia(s)`;
    } else if (diasRestantes === 0) {
        statusClass = 'hoje';
        statusLabel = 'Vence hoje!';
    } else if (diasRestantes <= 7) {
        statusClass = 'proximo';
        statusLabel = `Vence em ${diasRestantes} dia(s)`;
    } else {
        statusLabel = `Vence em ${diasRestantes} dias`;
    }

    return `
        <div class="boleto-item ${statusClass}">
            <div class="boleto-icon">📋</div>
            <div class="boleto-info">
                <span class="boleto-descricao">${boleto.descricao}</span>
                <span class="boleto-beneficiario">${boleto.beneficiario || ''}</span>
                <span class="boleto-vencimento">${formatarData(boleto.dataVencimento)}</span>
                <span class="boleto-status ${statusClass}">${statusLabel}</span>
            </div>
            <div class="boleto-valor">
                ${formatarMoeda(boleto.valor)}
            </div>
            <div class="boleto-acoes">
                ${boleto.status === 'pendente' ? `
                    <button class="btn-icon btn-pagar" onclick="marcarBoletoPago(${boleto.id})" title="Marcar como Pago">✅</button>
                ` : `
                    <button class="btn-icon" onclick="marcarBoletoPendente(${boleto.id})" title="Reabrir">↩️</button>
                `}
                <button class="btn-icon" onclick="abrirModalBoleto(${boleto.id})" title="Editar">✏️</button>
                <button class="btn-icon" onclick="excluirBoleto(${boleto.id})" title="Excluir">🗑️</button>
            </div>
        </div>
    `;
}

function getCategoriaIcon(categoria) {
    const icons = {
        'Aluguel': '🏠',
        'Energia': '⚡',
        'Água': '💧',
        'Internet': '🌐',
        'Telefone': '📱',
        'Streaming': '📺',
        'Seguro': '🛡️',
        'Empréstimo': '🏦',
        'Cartão': '💳',
        'Outros': '📦'
    };
    return icons[categoria] || '📦';
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

// ===================================
// Extrato Bancário - Modais
// ===================================
function renderizarModalTransacao() {
    if (editandoTransacaoId === null && !window.modalTransacaoAberto) return '';

    const transacao = editandoTransacaoId
        ? extrato.transacoes.find(t => t.id === editandoTransacaoId)
        : null;

    return `
        <div class="modal-overlay" onclick="fecharModalTransacao()">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${transacao ? 'Editar Transação' : 'Nova Transação'}</h2>
                    <button class="btn-close" onclick="fecharModalTransacao()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tipo</label>
                        <div class="tipo-selector">
                            <button type="button" class="tipo-btn entrada ${!transacao || transacao.tipo === 'entrada' ? 'active' : ''}"
                                    onclick="selecionarTipoTransacao('entrada')">
                                📈 Entrada
                            </button>
                            <button type="button" class="tipo-btn saida ${transacao && transacao.tipo === 'saida' ? 'active' : ''}"
                                    onclick="selecionarTipoTransacao('saida')">
                                📉 Saída
                            </button>
                        </div>
                        <input type="hidden" id="transacao-tipo" value="${transacao?.tipo || 'entrada'}">
                    </div>
                    <div class="form-group">
                        <label>Descrição *</label>
                        <input type="text" id="transacao-descricao" class="form-input"
                               value="${transacao?.descricao || ''}" placeholder="Ex: Pagamento de cliente">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Valor *</label>
                            <input type="number" id="transacao-valor" class="form-input" step="0.01" min="0"
                                   value="${transacao?.valor || ''}" placeholder="0,00">
                        </div>
                        <div class="form-group">
                            <label>Data *</label>
                            <input type="date" id="transacao-data" class="form-input"
                                   value="${transacao?.data || new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Categoria</label>
                        <select id="transacao-categoria" class="form-select">
                            <option value="">Selecione...</option>
                            <option value="Vendas" ${transacao?.categoria === 'Vendas' ? 'selected' : ''}>Vendas</option>
                            <option value="Serviços" ${transacao?.categoria === 'Serviços' ? 'selected' : ''}>Serviços</option>
                            <option value="Investimentos" ${transacao?.categoria === 'Investimentos' ? 'selected' : ''}>Investimentos</option>
                            <option value="Salário" ${transacao?.categoria === 'Salário' ? 'selected' : ''}>Salário</option>
                            <option value="Aluguel" ${transacao?.categoria === 'Aluguel' ? 'selected' : ''}>Aluguel</option>
                            <option value="Fornecedores" ${transacao?.categoria === 'Fornecedores' ? 'selected' : ''}>Fornecedores</option>
                            <option value="Impostos" ${transacao?.categoria === 'Impostos' ? 'selected' : ''}>Impostos</option>
                            <option value="Utilidades" ${transacao?.categoria === 'Utilidades' ? 'selected' : ''}>Utilidades</option>
                            <option value="Marketing" ${transacao?.categoria === 'Marketing' ? 'selected' : ''}>Marketing</option>
                            <option value="Outros" ${transacao?.categoria === 'Outros' ? 'selected' : ''}>Outros</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="transacao-notas" class="form-textarea" rows="2"
                                  placeholder="Observações adicionais...">${transacao?.notas || ''}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalTransacao()">Cancelar</button>
                    <button class="btn btn-primary" onclick="salvarTransacao()">
                        ${transacao ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderizarModalContaRecorrente() {
    if (editandoContaRecorrenteId === null && !window.modalContaRecorrenteAberto) return '';

    const conta = editandoContaRecorrenteId
        ? extrato.contasRecorrentes.find(c => c.id === editandoContaRecorrenteId)
        : null;

    return `
        <div class="modal-overlay" onclick="fecharModalContaRecorrente()">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${conta ? 'Editar Conta Recorrente' : 'Nova Conta Recorrente'}</h2>
                    <button class="btn-close" onclick="fecharModalContaRecorrente()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nome da Conta *</label>
                        <input type="text" id="conta-nome" class="form-input"
                               value="${conta?.nome || ''}" placeholder="Ex: Netflix, Aluguel, Luz...">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Valor *</label>
                            <input type="number" id="conta-valor" class="form-input" step="0.01" min="0"
                                   value="${conta?.valor || ''}" placeholder="0,00">
                        </div>
                        <div class="form-group">
                            <label>Dia do Vencimento *</label>
                            <input type="number" id="conta-dia" class="form-input" min="1" max="31"
                                   value="${conta?.diaVencimento || ''}" placeholder="1-31">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Categoria</label>
                            <select id="conta-categoria" class="form-select">
                                <option value="">Selecione...</option>
                                <option value="Aluguel" ${conta?.categoria === 'Aluguel' ? 'selected' : ''}>🏠 Aluguel</option>
                                <option value="Energia" ${conta?.categoria === 'Energia' ? 'selected' : ''}>⚡ Energia</option>
                                <option value="Água" ${conta?.categoria === 'Água' ? 'selected' : ''}>💧 Água</option>
                                <option value="Internet" ${conta?.categoria === 'Internet' ? 'selected' : ''}>🌐 Internet</option>
                                <option value="Telefone" ${conta?.categoria === 'Telefone' ? 'selected' : ''}>📱 Telefone</option>
                                <option value="Streaming" ${conta?.categoria === 'Streaming' ? 'selected' : ''}>📺 Streaming</option>
                                <option value="Seguro" ${conta?.categoria === 'Seguro' ? 'selected' : ''}>🛡️ Seguro</option>
                                <option value="Empréstimo" ${conta?.categoria === 'Empréstimo' ? 'selected' : ''}>🏦 Empréstimo</option>
                                <option value="Cartão" ${conta?.categoria === 'Cartão' ? 'selected' : ''}>💳 Cartão</option>
                                <option value="Outros" ${conta?.categoria === 'Outros' ? 'selected' : ''}>📦 Outros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Frequência</label>
                            <select id="conta-frequencia" class="form-select">
                                <option value="mês" ${conta?.frequencia === 'mês' || !conta?.frequencia ? 'selected' : ''}>Mensal</option>
                                <option value="ano" ${conta?.frequencia === 'ano' ? 'selected' : ''}>Anual</option>
                                <option value="semana" ${conta?.frequencia === 'semana' ? 'selected' : ''}>Semanal</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="conta-notas" class="form-textarea" rows="2"
                                  placeholder="Observações...">${conta?.notas || ''}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalContaRecorrente()">Cancelar</button>
                    <button class="btn btn-primary" onclick="salvarContaRecorrente()">
                        ${conta ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderizarModalBoleto() {
    if (editandoBoletoId === null && !window.modalBoletoAberto) return '';

    const boleto = editandoBoletoId
        ? extrato.boletosFuturos.find(b => b.id === editandoBoletoId)
        : null;

    return `
        <div class="modal-overlay" onclick="fecharModalBoleto()">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${boleto ? 'Editar Boleto' : 'Novo Boleto'}</h2>
                    <button class="btn-close" onclick="fecharModalBoleto()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Descrição *</label>
                        <input type="text" id="boleto-descricao" class="form-input"
                               value="${boleto?.descricao || ''}" placeholder="Ex: IPTU, Parcela do carro...">
                    </div>
                    <div class="form-group">
                        <label>Beneficiário</label>
                        <input type="text" id="boleto-beneficiario" class="form-input"
                               value="${boleto?.beneficiario || ''}" placeholder="Nome do beneficiário">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Valor *</label>
                            <input type="number" id="boleto-valor" class="form-input" step="0.01" min="0"
                                   value="${boleto?.valor || ''}" placeholder="0,00">
                        </div>
                        <div class="form-group">
                            <label>Data de Vencimento *</label>
                            <input type="date" id="boleto-vencimento" class="form-input"
                                   value="${boleto?.dataVencimento || ''}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Código de Barras</label>
                        <input type="text" id="boleto-codigo" class="form-input"
                               value="${boleto?.codigoBarras || ''}" placeholder="Código de barras (opcional)">
                    </div>
                    <div class="form-group">
                        <label>Observações</label>
                        <textarea id="boleto-notas" class="form-textarea" rows="2"
                                  placeholder="Observações...">${boleto?.notas || ''}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalBoleto()">Cancelar</button>
                    <button class="btn btn-primary" onclick="salvarBoleto()">
                        ${boleto ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderizarModalSaldo() {
    if (!window.modalSaldoAberto) return '';

    return `
        <div class="modal-overlay" onclick="fecharModalSaldo()">
            <div class="modal modal-small" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>💰 Atualizar Saldo</h2>
                    <button class="btn-close" onclick="fecharModalSaldo()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Saldo Atual da Conta</label>
                        <input type="number" id="novo-saldo" class="form-input form-input-large" step="0.01"
                               value="${extrato.saldoAtual}" placeholder="0,00">
                        <small class="form-hint">Digite o saldo atual exato da sua conta bancária</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="fecharModalSaldo()">Cancelar</button>
                    <button class="btn btn-primary" onclick="salvarSaldo()">Atualizar</button>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// Extrato Bancário - Funções CRUD Transações
// ===================================
function abrirModalTransacao(id = null) {
    editandoTransacaoId = id;
    window.modalTransacaoAberto = true;
    renderizar();
}

function fecharModalTransacao() {
    editandoTransacaoId = null;
    window.modalTransacaoAberto = false;
    renderizar();
}

function selecionarTipoTransacao(tipo) {
    document.getElementById('transacao-tipo').value = tipo;
    document.querySelectorAll('.tipo-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tipo-btn.${tipo}`).classList.add('active');
}

async function salvarTransacao() {
    const tipo = document.getElementById('transacao-tipo').value;
    const descricao = document.getElementById('transacao-descricao').value.trim();
    const valor = parseFloat(document.getElementById('transacao-valor').value) || 0;
    const data = document.getElementById('transacao-data').value;
    const categoria = document.getElementById('transacao-categoria').value;
    const notas = document.getElementById('transacao-notas').value.trim();

    if (!descricao || valor <= 0 || !data) {
        mostrarToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    const dados = { tipo, descricao, valor, data, categoria, notas };

    if (editandoTransacaoId) {
        const index = extrato.transacoes.findIndex(t => t.id === editandoTransacaoId);
        if (index !== -1) {
            extrato.transacoes[index] = { ...extrato.transacoes[index], ...dados };
        }
        mostrarToast('Transação atualizada!', 'success');
    } else {
        dados.id = Date.now();
        dados.dataCriacao = new Date().toISOString();
        extrato.transacoes.push(dados);
        mostrarToast('Transação adicionada!', 'success');
    }

    await salvarExtrato();
    fecharModalTransacao();
}

async function excluirTransacao(id) {
    if (confirm('Excluir esta transação?')) {
        extrato.transacoes = extrato.transacoes.filter(t => t.id !== id);
        await salvarExtrato();
        renderizar();
        mostrarToast('Transação excluída', 'info');
    }
}

// ===================================
// Extrato Bancário - Funções CRUD Contas Recorrentes
// ===================================
function abrirModalContaRecorrente(id = null) {
    editandoContaRecorrenteId = id;
    window.modalContaRecorrenteAberto = true;
    renderizar();
}

function fecharModalContaRecorrente() {
    editandoContaRecorrenteId = null;
    window.modalContaRecorrenteAberto = false;
    renderizar();
}

async function salvarContaRecorrente() {
    const nome = document.getElementById('conta-nome').value.trim();
    const valor = parseFloat(document.getElementById('conta-valor').value) || 0;
    const diaVencimento = parseInt(document.getElementById('conta-dia').value) || 1;
    const categoria = document.getElementById('conta-categoria').value;
    const frequencia = document.getElementById('conta-frequencia').value;
    const notas = document.getElementById('conta-notas').value.trim();

    if (!nome || valor <= 0 || diaVencimento < 1 || diaVencimento > 31) {
        mostrarToast('Preencha todos os campos obrigatórios corretamente', 'error');
        return;
    }

    const dados = { nome, valor, diaVencimento, categoria, frequencia, notas, ativa: true };

    if (editandoContaRecorrenteId) {
        const index = extrato.contasRecorrentes.findIndex(c => c.id === editandoContaRecorrenteId);
        if (index !== -1) {
            dados.ativa = extrato.contasRecorrentes[index].ativa;
            extrato.contasRecorrentes[index] = { ...extrato.contasRecorrentes[index], ...dados };
        }
        mostrarToast('Conta atualizada!', 'success');
    } else {
        dados.id = Date.now();
        dados.dataCriacao = new Date().toISOString();
        extrato.contasRecorrentes.push(dados);
        mostrarToast('Conta recorrente adicionada!', 'success');
    }

    await salvarExtrato();
    fecharModalContaRecorrente();
}

async function toggleContaRecorrente(id) {
    const conta = extrato.contasRecorrentes.find(c => c.id === id);
    if (conta) {
        conta.ativa = !conta.ativa;
        await salvarExtrato();
        renderizar();
        mostrarToast(conta.ativa ? 'Conta ativada' : 'Conta desativada', 'info');
    }
}

async function excluirContaRecorrente(id) {
    if (confirm('Excluir esta conta recorrente?')) {
        extrato.contasRecorrentes = extrato.contasRecorrentes.filter(c => c.id !== id);
        await salvarExtrato();
        renderizar();
        mostrarToast('Conta excluída', 'info');
    }
}

// ===================================
// Extrato Bancário - Funções CRUD Boletos
// ===================================
function abrirModalBoleto(id = null) {
    editandoBoletoId = id;
    window.modalBoletoAberto = true;
    renderizar();
}

function fecharModalBoleto() {
    editandoBoletoId = null;
    window.modalBoletoAberto = false;
    renderizar();
}

async function salvarBoleto() {
    const descricao = document.getElementById('boleto-descricao').value.trim();
    const beneficiario = document.getElementById('boleto-beneficiario').value.trim();
    const valor = parseFloat(document.getElementById('boleto-valor').value) || 0;
    const dataVencimento = document.getElementById('boleto-vencimento').value;
    const codigoBarras = document.getElementById('boleto-codigo').value.trim();
    const notas = document.getElementById('boleto-notas').value.trim();

    if (!descricao || valor <= 0 || !dataVencimento) {
        mostrarToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    const dados = { descricao, beneficiario, valor, dataVencimento, codigoBarras, notas, status: 'pendente' };

    if (editandoBoletoId) {
        const index = extrato.boletosFuturos.findIndex(b => b.id === editandoBoletoId);
        if (index !== -1) {
            dados.status = extrato.boletosFuturos[index].status;
            dados.dataPagamento = extrato.boletosFuturos[index].dataPagamento;
            extrato.boletosFuturos[index] = { ...extrato.boletosFuturos[index], ...dados };
        }
        mostrarToast('Boleto atualizado!', 'success');
    } else {
        dados.id = Date.now();
        dados.dataCriacao = new Date().toISOString();
        extrato.boletosFuturos.push(dados);
        mostrarToast('Boleto adicionado!', 'success');
    }

    await salvarExtrato();
    fecharModalBoleto();
}

async function marcarBoletoPago(id) {
    const boleto = extrato.boletosFuturos.find(b => b.id === id);
    if (boleto) {
        boleto.status = 'pago';
        boleto.dataPagamento = new Date().toISOString().split('T')[0];
        await salvarExtrato();
        renderizar();
        mostrarToast('Boleto marcado como pago!', 'success');
    }
}

async function marcarBoletoPendente(id) {
    const boleto = extrato.boletosFuturos.find(b => b.id === id);
    if (boleto) {
        boleto.status = 'pendente';
        boleto.dataPagamento = null;
        await salvarExtrato();
        renderizar();
        mostrarToast('Boleto reaberto', 'info');
    }
}

async function excluirBoleto(id) {
    if (confirm('Excluir este boleto?')) {
        extrato.boletosFuturos = extrato.boletosFuturos.filter(b => b.id !== id);
        await salvarExtrato();
        renderizar();
        mostrarToast('Boleto excluído', 'info');
    }
}

// ===================================
// Extrato Bancário - Funções de Saldo
// ===================================
function atualizarSaldo() {
    window.modalSaldoAberto = true;
    renderizar();
}

function fecharModalSaldo() {
    window.modalSaldoAberto = false;
    renderizar();
}

async function salvarSaldo() {
    const novoSaldo = parseFloat(document.getElementById('novo-saldo').value) || 0;
    extrato.saldoAtual = novoSaldo;
    await salvarExtrato();
    fecharModalSaldo();
    mostrarToast('Saldo atualizado!', 'success');
}

// ===================================
// Inicialização
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
    await carregarDados();
    await carregarTarefas();
    await carregarPagamentos();
    await carregarExtrato();
    renderizar();
});
