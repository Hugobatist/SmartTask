/**
 * Backend - Pipeline de Vendas Franqueados
 * Servidor Express com persistência em arquivo JSON
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'franqueados.json');
const TAREFAS_FILE = path.join(__dirname, 'data', 'tarefas.json');
const PAGAMENTOS_FILE = path.join(__dirname, 'data', 'pagamentos.json');
const EXTRATO_FILE = path.join(__dirname, 'data', 'extrato.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve arquivos estáticos (HTML, CSS, JS)

// Garantir que a pasta data existe
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Dados padrão caso o arquivo não exista
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

// Inicializar arquivo se não existir
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dadosPadrao, null, 2), 'utf8');
    console.log('📁 Arquivo de dados criado com dados iniciais');
}

// ===================================
// API Endpoints
// ===================================

// GET - Buscar todos os franqueados
app.get('/api/franqueados', (req, res) => {
    try {
        const dados = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(dados));
    } catch (error) {
        console.error('Erro ao ler dados:', error);
        res.status(500).json({ error: 'Erro ao carregar dados' });
    }
});

// POST - Salvar todos os franqueados
app.post('/api/franqueados', (req, res) => {
    try {
        const franqueados = req.body;
        fs.writeFileSync(DATA_FILE, JSON.stringify(franqueados, null, 2), 'utf8');
        console.log(`💾 Dados salvos: ${franqueados.length} franqueados`);
        res.json({ success: true, count: franqueados.length });
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        res.status(500).json({ error: 'Erro ao salvar dados' });
    }
});

// POST - Resetar para dados padrão
app.post('/api/reset', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(dadosPadrao, null, 2), 'utf8');
        console.log('🔄 Dados resetados para o padrão');
        res.json({ success: true, data: dadosPadrao });
    } catch (error) {
        console.error('Erro ao resetar dados:', error);
        res.status(500).json({ error: 'Erro ao resetar dados' });
    }
});

// ===================================
// API Endpoints - Tarefas (TO-DO List)
// ===================================

// GET - Buscar todas as tarefas
app.get('/api/tarefas', (req, res) => {
    try {
        if (!fs.existsSync(TAREFAS_FILE)) {
            fs.writeFileSync(TAREFAS_FILE, JSON.stringify([], null, 2), 'utf8');
        }
        const dados = fs.readFileSync(TAREFAS_FILE, 'utf8');
        res.json(JSON.parse(dados));
    } catch (error) {
        console.error('Erro ao ler tarefas:', error);
        res.status(500).json({ error: 'Erro ao carregar tarefas' });
    }
});

// POST - Salvar todas as tarefas
app.post('/api/tarefas', (req, res) => {
    try {
        const tarefas = req.body;
        fs.writeFileSync(TAREFAS_FILE, JSON.stringify(tarefas, null, 2), 'utf8');
        console.log(`✅ Tarefas salvas: ${tarefas.length} itens`);
        res.json({ success: true, count: tarefas.length });
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        res.status(500).json({ error: 'Erro ao salvar tarefas' });
    }
});

// ===================================
// API Endpoints - Pagamentos
// ===================================

// GET - Buscar todos os pagamentos
app.get('/api/pagamentos', (req, res) => {
    try {
        if (!fs.existsSync(PAGAMENTOS_FILE)) {
            fs.writeFileSync(PAGAMENTOS_FILE, JSON.stringify([], null, 2), 'utf8');
        }
        const dados = fs.readFileSync(PAGAMENTOS_FILE, 'utf8');
        res.json(JSON.parse(dados));
    } catch (error) {
        console.error('Erro ao ler pagamentos:', error);
        res.status(500).json({ error: 'Erro ao carregar pagamentos' });
    }
});

// POST - Salvar todos os pagamentos
app.post('/api/pagamentos', (req, res) => {
    try {
        const pagamentos = req.body;
        fs.writeFileSync(PAGAMENTOS_FILE, JSON.stringify(pagamentos, null, 2), 'utf8');
        console.log(`💰 Pagamentos salvos: ${pagamentos.length} itens`);
        res.json({ success: true, count: pagamentos.length });
    } catch (error) {
        console.error('Erro ao salvar pagamentos:', error);
        res.status(500).json({ error: 'Erro ao salvar pagamentos' });
    }
});

// ===================================
// API Endpoints - Extrato Bancário
// ===================================

// GET - Buscar extrato bancário
app.get('/api/extrato', (req, res) => {
    try {
        if (!fs.existsSync(EXTRATO_FILE)) {
            const dadosIniciais = {
                saldoAtual: 0,
                transacoes: [],
                contasRecorrentes: [],
                boletosFuturos: []
            };
            fs.writeFileSync(EXTRATO_FILE, JSON.stringify(dadosIniciais, null, 2), 'utf8');
        }
        const dados = fs.readFileSync(EXTRATO_FILE, 'utf8');
        res.json(JSON.parse(dados));
    } catch (error) {
        console.error('Erro ao ler extrato:', error);
        res.status(500).json({ error: 'Erro ao carregar extrato' });
    }
});

// POST - Salvar extrato bancário
app.post('/api/extrato', (req, res) => {
    try {
        const extrato = req.body;
        fs.writeFileSync(EXTRATO_FILE, JSON.stringify(extrato, null, 2), 'utf8');
        console.log(`🏦 Extrato salvo: ${extrato.transacoes?.length || 0} transações, ${extrato.contasRecorrentes?.length || 0} contas recorrentes, ${extrato.boletosFuturos?.length || 0} boletos`);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar extrato:', error);
        res.status(500).json({ error: 'Erro ao salvar extrato' });
    }
});

// ===================================
// Iniciar Servidor
// ===================================
app.listen(PORT, () => {
    console.log('');
    console.log('══════════════════════════════════════════════════════════');
    console.log('   🚀 Pipeline de Vendas - Servidor Iniciado');
    console.log('══════════════════════════════════════════════════════════');
    console.log(`   📍 Acesse: http://localhost:${PORT}`);
    console.log('   📁 Dados salvos em: data/franqueados.json');
    console.log('   ⏹️  Para parar: Ctrl+C');
    console.log('══════════════════════════════════════════════════════════');
    console.log('');
});
