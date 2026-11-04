Nuclear Sentinel

### Sentinela Nuclear Challenge – Sprint 1 | AMAZUL

Aplicativo mobile desenvolvido com **React Native, Expo e TypeScript** para registrar, monitorar e classificar ocorrências simuladas em uma instalação nuclear fictícia.

O Nuclear Sentinel foi desenvolvido como um MVP (Produto Mínimo Viável), com o objetivo de organizar informações sobre ocorrências e facilitar a identificação de situações normais, atípicas e críticas.

---

## Objetivo do projeto

Desenvolver uma aplicação mobile funcional que permita aos usuários registrar e acompanhar ocorrências, visualizar seus detalhes e identificar automaticamente o nível de alerta de cada situação.

A solução utiliza dados simulados e armazenamento local para demonstrar o funcionamento das principais funcionalidades propostas pelo desafio.

## Funcionalidades

- **Autenticação:** login com contas de teste e gerenciamento local de sessão.
- **Consulta de ocorrências:** visualização e pesquisa das ocorrências cadastradas.
- **Cadastro de ocorrências:** formulário com validação dos campos obrigatórios.
- **Classificação automática:** identificação do nível de alerta com base em regras definidas no sistema.
- **Detalhes:** visualização das informações completas de cada ocorrência.
- **Persistência local:** armazenamento das ocorrências e da sessão utilizando AsyncStorage.
- **Perfis de usuário:** estrutura preparada para os papéis de operador e supervisor.

## Classificação de alertas

O sistema classifica as ocorrências em três níveis:

| Nível | Cor | Descrição |
|---|---|---|
| Normal | Verde | Ocorrência sem indicação de anormalidade nas regras implementadas. |
| Atípica | Amarelo | Ocorrência que apresenta variação ou comportamento fora do esperado. |
| Crítica | Vermelho | Ocorrência que apresenta palavras-chave relacionadas a situações de risco elevado. |

A classificação é realizada por meio de regras implementadas em TypeScript, considerando o tipo da ocorrência e palavras-chave presentes na descrição.

Essa abordagem permite demonstrar a classificação automática no MVP e possibilita futuras evoluções para mecanismos mais avançados de análise.

## Tecnologias utilizadas

- **React Native:** desenvolvimento da interface mobile.
- **Expo:** ambiente e ferramentas para execução do aplicativo.
- **TypeScript:** tipagem e organização do código.
- **React Navigation:** navegação entre as telas.
- **AsyncStorage:** armazenamento local de ocorrências e sessão.
- **Git e GitHub:** controle de versão e hospedagem do código.

## Identidade visual

A interface utiliza uma identidade visual inspirada em sistemas de monitoramento industrial, com predominância de azul-marinho e azul para os elementos de interação.

As cores dos alertas possuem significados específicos:

- Verde: normal.
- Amarelo: atípica.
- Vermelho: crítica.

## Estrutura do projeto

```text
nuclear-sentinel-cross-plataform/
│
├── assets/
│
├── src/
│   ├── components/
│   │   ├── AlertBadge.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── OccurrenceCard.tsx
│   │
│   ├── data/
│   │   ├── occurrences.ts
│   │   └── users.ts
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── OccurrencesScreen.tsx
│   │   ├── NewOccurrenceScreen.tsx
│   │   └── OccurrenceDetailsScreen.tsx
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   └── storageService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── alertClassifier.ts
│   │
│   └── theme.ts
│
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Organização do código

- **components:** componentes reutilizáveis da interface.
- **data:** dados iniciais e contas de teste.
- **navigation:** configuração da navegação entre telas.
- **screens:** telas principais do aplicativo.
- **services:** autenticação e armazenamento local.
- **types:** modelos e tipos utilizados no TypeScript.
- **utils:** funções auxiliares, incluindo a classificação de alertas.
- **theme.ts:** cores e configurações visuais compartilhadas.

## Contas para teste

O aplicativo possui duas contas simuladas:

**Operador**

- E-mail: `operador@nuclearsentinel.com`
- Senha: `123456`

**Supervisor**

- E-mail: `supervisor@nuclearsentinel.com`
- Senha: `123456`

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Expo Go ou emulador compatível.

### 1. Clonar o repositório

```bash
git clone https://github.com/haninatwi0/nuclear-sentinel-cross-plataform.git
```

### 2. Entrar na pasta

```bash
cd nuclear-sentinel-cross-plataform
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar o aplicativo

```bash
npx expo start
```

Após iniciar o Expo, utilize o QR Code para abrir o aplicativo no Expo Go ou execute-o em um emulador compatível.

## Persistência de dados

O aplicativo utiliza AsyncStorage para armazenar localmente:

- Ocorrências cadastradas.
- Sessão do usuário autenticado.

Os dados iniciais são simulados e carregados na primeira inicialização do armazenamento.

## Limitações e possibilidades futuras

O projeto representa uma primeira versão funcional da solução. Algumas possibilidades de evolução incluem:

- Integração com sensores IoT e dados de telemetria.
- Integração com drones e sistemas de monitoramento.
- Utilização de Inteligência Artificial para análise de ocorrências.
- Implementação de controle de acesso específico para cada perfil.
- Integração com banco de dados remoto.
- Desenvolvimento de dashboards para acompanhamento operacional.

Essas funcionalidades representam possibilidades futuras e não fazem parte da implementação atual da Sprint 1.

## Equipe

Hanin Atwi RM 567626
Gabriel Guimarães de Oliveira RM 567835
Pedro Paulo Ferreira Agnelo D’angelo RM 567564
Laura Stephanie Vasquez Oliveira RM 567277
Mark Lima Leal RM 566760

## Demonstração

### Capturas de tela

As imagens abaixo apresentam as principais telas do Nuclear Sentinel.

<img width="512" height="243" alt="unnamed" src="https://github.com/user-attachments/assets/206e80a4-399a-4cf6-97ed-7d4499f93b37" />

**Lista de Ocorrências**

<img width="512" height="232" alt="unnamed (1)" src="https://github.com/user-attachments/assets/dc09ef08-220c-4a97-a1ab-fde2bb530211" />

<img width="512" height="240" alt="unnamed (2)" src="https://github.com/user-attachments/assets/de539897-6e22-45cc-9707-ef3f1a4973eb" />

**Cadastro de Ocorrência**

<img width="512" height="241" alt="unnamed (3)" src="https://github.com/user-attachments/assets/c13fc624-448c-4fe6-976a-5f0765138286" />

**Detalhes da Ocorrência**

<img width="512" height="245" alt="unnamed (4)" src="https://github.com/user-attachments/assets/8a1edcbc-bbba-480d-b29a-bdc1ec28b93a" />

<img width="512" height="237" alt="unnamed (5)" src="https://github.com/user-attachments/assets/535f14be-48b2-4ed2-a6b3-f146e0a52ce6" />

<img width="512" height="237" alt="unnamed (6)" src="https://github.com/user-attachments/assets/e547b2f5-2fb8-4597-9d73-e089fa999631" />

<img width="512" height="235" alt="unnamed (7)" src="https://github.com/user-attachments/assets/8993bdc4-7ddf-4dbf-93e6-6f8232b93840" />


### Vídeo de demonstração

https://youtu.be/hWqN0GA8JWI


## Repositório

[GitHub – Nuclear Sentinel](https://github.com/haninatwi0/nuclear-sentinel-cross-plataform)

---

**Projeto acadêmico desenvolvido para o Sentinela Nuclear Challenge – AMAZUL.**
