# Nuclear Sentinel

## Sprint 1 - MVP Funcional

Projeto desenvolvido para o desafio **Sentinela Nuclear Challenge**, proposto pela AMAZUL.

O Nuclear Sentinel é um aplicativo mobile desenvolvido para apoiar o registro, monitoramento e classificação de ocorrências simuladas em uma instalação nuclear fictícia.

O MVP transforma informações registradas pelos operadores em dados estruturados que podem apoiar a identificação de situações normais, atípicas e críticas.

---

## Objetivo

Desenvolver uma solução mobile funcional capaz de:

- autenticar usuários;
- registrar ocorrências;
- consultar ocorrências;
- visualizar detalhes;
- classificar automaticamente alertas;
- armazenar dados localmente;
- manter a sessão do usuário;
- preparar uma estrutura para futura evolução do controle de acesso.

---

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Git
- GitHub

---

## Funcionalidades

### Login

O sistema possui autenticação simulada com contas de teste.

### Ocorrências

É possível:

- visualizar ocorrências;
- pesquisar ocorrências;
- cadastrar novas ocorrências;
- consultar detalhes;
- visualizar nível de alerta;
- visualizar status;
- visualizar responsável pelo registro.

### Validação

O cadastro possui validação dos campos obrigatórios:

- título;
- descrição;
- local.

Mensagens de erro são apresentadas diretamente no formulário.

### Classificação automática

As ocorrências são classificadas em:

- Normal;
- Atípica;
- Crítica.

A classificação é realizada por regras simples baseadas no tipo da ocorrência e no conteúdo da descrição.

A implementação foi estruturada para permitir uma futura substituição das regras por modelos de Inteligência Artificial.

### Persistência

O aplicativo utiliza AsyncStorage para:

- armazenar ocorrências;
- manter os dados após o fechamento do aplicativo;
- armazenar a sessão localmente.

---

## Perfis

O projeto possui dois papéis:

### Operador

Responsável pelo registro e acompanhamento das ocorrências.

### Supervisor

Perfil preparado para futuras funcionalidades de supervisão e controle de acesso.

---

## Contas de teste

### Operador

Email:

`operador@nuclearsentinel.com`

Senha:

`123456`

### Supervisor

Email:

`supervisor@nuclearsentinel.com`

Senha:

`123456`

---

## Como executar

Clone o repositório:

```bash
git clone https://github.com/haninatwi0/nuclear-sentinel-cross-plataform.git