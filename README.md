# DevTrack — Painel de Desenvolvimento

O **DevTrack** é uma aplicação web desenvolvida para ajudar desenvolvedores a organizar seus projetos, registrar suas atividades de estudo e acompanhar seu progresso em relação a metas semanais.

O projeto foi desenvolvido com HTML, CSS e JavaScript puro, com foco na manipulação do DOM, tratamento de eventos e armazenamento de dados no navegador. Também conta com testes automatizados de ponta a ponta (E2E), implementados com Cypress, para validar os principais fluxos de interação da aplicação.

## Funcionalidades

### Dashboard

- Visualização da quantidade de projetos cadastrados.
- Acompanhamento das horas estudadas na semana atual.
- Visualização do progresso em relação à meta semanal.

### Gerenciamento de projetos

- Cadastro de projetos com nome, tecnologias utilizadas e descrição.
- Listagem dos projetos cadastrados.
- Exclusão de projetos com confirmação.
- Persistência dos projetos no navegador.

### Diário de estudos

- Registro de atividades com tema, tecnologia, duração e data.
- Inclusão de anotações sobre o conteúdo estudado.
- Listagem das atividades em ordem cronológica decrescente.
- Exclusão de atividades registradas.
- Atualização automática do resumo de horas estudadas.

### Metas semanais

- Definição de uma meta semanal de estudo.
- Validação da meta entre 1 e 168 horas, em intervalos de meia hora.
- Barra de progresso que acompanha o cumprimento da meta.
- Cálculo das horas estudadas de segunda-feira a domingo.
- Persistência da meta definida pelo usuário.

## Tecnologias utilizadas

- **HTML5:** estruturação semântica da aplicação e criação de formulários.
- **CSS3:** estilização da interface, tema escuro, cartões, layout com CSS Grid e efeitos de interação.
- **JavaScript (Vanilla JS):** lógica da aplicação, manipulação do DOM, eventos, validações e atualização dinâmica da interface.
- **LocalStorage:** armazenamento dos projetos, registros de estudo e meta semanal no navegador.
- **Cypress:** implementação de testes automatizados E2E para validar os principais fluxos da aplicação.

## Testes Automatizados

O projeto conta com testes automatizados End-to-End (E2E) utilizando Cypress, com foco na validação dos comportamentos da aplicação pela perspectiva do usuário.

Os testes são organizados em cenários que verificam funcionalidades como:

**Gerenciamento de projetos:**
- Cadastro de projetos, incluindo o preenchimento opcional da descrição.
- Validação de campos obrigatórios.
- Exclusão de projetos e cancelamento da exclusão.
- Persistência dos dados após atualização da página.
- Cadastro de múltiplos projetos sem sobrescrever os anteriores.

**Gerenciamento de estudos:**
- Cadastro de sessões de estudo, incluindo o preenchimento opcional da descrição.
- Validação da duração das sessões.
- Exclusão de estudos e cancelamento da exclusão.
- Cancelamento do cadastro e limpeza do formulário.
- Persistência dos dados após atualização da página.
- Cadastro de múltiplos estudos sem sobrescrever os anteriores.
- Ordenação dos estudos do mais recente para o mais antigo.

Os testes são executados com Cypress e verificam tanto os elementos exibidos na interface quanto os dados armazenados no LocalStorage.

## Conceitos praticados

Durante o desenvolvimento, foram aplicados conceitos importantes do desenvolvimento front-end:

- Seleção e manipulação de elementos HTML com `querySelector`.
- Criação dinâmica de elementos com `createElement`.
- Manipulação de classes CSS com `classList`.
- Tratamento de eventos com `addEventListener`.
- Manipulação de arrays com métodos como `push`, `filter`, `forEach` e `sort`.
- Uso de objetos para representar projetos e atividades de estudo.
- Persistência de dados com `localStorage`, `JSON.stringify` e `JSON.parse`.
- Validação de formulários e prevenção do comportamento padrão de envio.
- Manipulação de datas e cálculo de intervalos semanais.
- Organização da interface com CSS Grid e variáveis CSS.
- Uso de atributos ARIA para melhorar a acessibilidade de componentes.
- Escrita e execução de testes automatizados E2E com Cypress.

## Como executar o projeto

O DevTrack não exige instalação de dependências nem processo de build para executar a aplicação.

1. Clone o repositório:
   ```bash
   git clone https://github.com/hugoovargas/devTrack.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd devTrack
   ```
3. Abra o arquivo `index.html` no navegador.

### Executando os testes E2E

Para executar os testes automatizados, é necessário ter o Node.js e o npm instalados.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor local da aplicação:
   ```bash
   npm run dev
   ```
3. Em outro terminal, abra o Cypress:
   ```bash
   npm run test:e2e
   ```

Para executar os testes em modo headless, sem abrir a interface gráfica:

```bash
npm run test:e2e:headless
```

## Armazenamento de dados

Os dados são armazenados localmente no navegador por meio do `localStorage`. Isso permite que projetos, atividades de estudo e a meta semanal continuem disponíveis após recarregar a página, no mesmo navegador e origem.

A aplicação não utiliza banco de dados ou servidor backend nesta versão.

## Objetivo do projeto

O DevTrack foi criado como um projeto de prática e portfólio para consolidar conhecimentos de desenvolvimento web, desde a estruturação da interface até a implementação de funcionalidades com JavaScript.

Além de servir como ferramenta pessoal de organização, o projeto representa uma etapa de aprendizado em desenvolvimento front-end, incluindo a aplicação de testes automatizados para aumentar a confiabilidade das funcionalidades implementadas.

---

**Desenvolvido como projeto de estudo e portfólio.**