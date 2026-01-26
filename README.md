# 🚀 PedidoPronto API Core

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

> **A espinha dorsal de um ecossistema de alta performance para gestão de restaurantes.**

O **PedidoPronto** é uma solução SaaS projetada para erradicar a ineficiência operacional no setor gastronômico. Esta API Core provê uma ponte tecnológica em tempo real entre o salão e a cozinha, focando em integridade de dados, segurança transacional e baixa latência.

---

## 🏛️ Arquitetura: Domain-Driven Design (DDD)

A API adota o padrão **Domain-Driven Design (DDD)** para garantir que o software seja um reflexo fiel das regras de negócio complexas do mundo real. A arquitetura é centrada no domínio, isolando as regras fundamentais de detalhes tecnológicos externos.



### Camadas de Implementação:

* **Camada de Domínio (Domain):** Onde residem as **Entidades**, **Agregados** e **Value Objects**. É aqui que as **Regras de Negócio (RN)** são aplicadas de forma pura (ex: validação de status de pedido e lógica de fechamento de mesa).
* **Camada de Aplicação (Application):** Responsável por orquestrar os **Casos de Uso**. Ela coordena a execução, mas não contém lógica de negócio própria.
* **Camada de Infraestrutura (Infrastructure):** Contém as implementações técnicas: persistência com **Prisma**, envio de e-mails, integração com drivers de banco de dados e drivers de WebSocket.
* **Camada de Interface (Interface/API):** Exposição dos contratos através de **Controllers REST** e **Gateways de WebSocket**, garantindo que o mundo externo possa interagir com o sistema.

---

## 🛠️ Stack Tecnológica

### Core e Backend
* **NestJS:** Framework Node.js opinativo que utiliza TypeScript por padrão, permitindo uma arquitetura modular e testável através de Injeção de Dependência.
* **TypeScript:** Garantia de segurança de tipos (Type-Safety) em toda a aplicação, reduzindo erros em tempo de execução.

### Dados e Persistência
* **PostgreSQL:** Banco de dados relacional robusto, escolhido por sua capacidade de lidar com transações complexas e garantir a integridade ACID.
* **Prisma ORM:** Ferramenta de mapeamento objeto-relacional de última geração. Oferece uma experiência de desenvolvedor superior com autocompletar e migrações declarativas.
* **Docker:** Containerização para padronizar os ambientes de desenvolvimento e produção, garantindo que o PostgreSQL e a API rodem de forma isolada e idêntica em qualquer máquina.

### Comunicação e Real-time
* **Socket.io (WebSockets):** Utilizado para a comunicação bi-direcional entre cozinha e salão, permitindo que o status do pedido mude em milissegundos nas telas dos usuários.
* **JWT (JSON Web Tokens):** Implementação de autenticação stateless para garantir segurança e escalabilidade no modelo SaaS.

---

## 🌟 Funcionalidades de Engenharia

* **Sincronização em Tempo Real:** Gateway de eventos para notificação imediata de novos pedidos e mudanças de status.
* **Isolamento Multi-tenant:** Preparado para garantir que os dados de uma instância (restaurante) sejam logicamente inacessíveis por outra.
* **Integridade Financeira:** Registro imutável de preços unitários no momento da venda (`unit_price` persistido no item), protegendo o fechamento da conta contra alterações futuras no cardápio.
* **Auditoria de Cancelamento:** Pipeline obrigatório para inserção de justificativas em cancelamentos, alimentando relatórios de desperdício (Perda Operacional).



---

## 🚀 Guia de Início Rápido

### Pré-requisitos
* Docker & Docker Compose
* Node.js (v18+)
* Gerenciador de pacotes (NPM ou PNPM)

### Configuração do Ambiente

1. **Clone o projeto e instale as dependências:**
   ```bash
   git clone [https://github.com/seu-usuario/pedidopronto-api.git](https://github.com/seu-usuario/pedidopronto-api.git)
   cd pedidopronto-api
   npm install
