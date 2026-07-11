# Senai Notes (Angular)
 
Senai Notes é uma aplicação web que implementa a experiência de criar, organizar e revisar notas com Angular 20. O foco é fornecer uma interface moderna para usuários autenticados gerenciarem suas anotações em qualquer dispositivo.

## Demonstração
<img width="1916" height="916" alt="image" src="https://github.com/user-attachments/assets/40b53807-a63a-4db5-bcfe-d5ebed7e5fee" />
<br>
<br>
<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/c0901375-3729-4a13-9129-69d6f16d21e6" />



### Aplicação publicada
https://senai-notes-angular.vercel.app/

Usuário de teste:
  - E-mail: front@email.com
  - Senha: frontdomina 

## Funcionalidades principais

- **Autenticação** com guarda de rotas; tokens JWT são persistidos no `localStorage`.
- **Cadastro de usuário** com fluxo de criação e redirecionamento automático para login.
- **Lista de notas** com carregamento dinâmico da API e visualização em cards.
- **Criação de notas** com dados padrão, imagem ilustrativa e feedback imediato ao usuário.
- **Edição completa** de título, descrição, etiquetas e imagem (preview local da imagem enviada).
- **Filtros por etiquetas** consumindo o catálogo fornecido pela API.
- **Busca textual** por título, descrição ou etiquetas, com atualização instantânea.
- **Arquivar, desarquivar e excluir** notas diretamente da tela principal.
- **Feedbacks de UI** com toasts simulados, alerts e estados de carregamento.

## Arquitetura e tecnologias

- Angular 20 com componentes standalone e `ChangeDetection` manual onde necessário.
- TypeScript 5.9 e RxJS para composições assíncronas (`firstValueFrom`).
- Angular Router com guarda de autenticação (`authGuard`) e lazy loading de componentes.
- Angular Forms: reativos para telas de login/cadastro e template-driven para edição de notas.
- HTTPClient para buscas/cadastro/login e `fetch` nativo para operações de atualização pontual.
- Font Awesome via CDN para ícones.
- Deploy contínuo na Vercel, consumindo a API `https://senai-gpt-api.azurewebsites.net/`.

## Integração com a API

| Recurso | Rotas consumidas |
|---------|-----------------|
| Autenticação | `POST /login` |
| Usuários | `POST /users` |
| Notas | `GET /senainotes/notes`, `POST /senainotes/notes`, `PUT /senainotes/notes/{id}`, `PATCH /senainotes/notes/{id}`, `DELETE /senainotes/notes/{id}` |
| Etiquetas | `GET /senainotes/tags` |

Os tokens retornados no login são salvos localmente e enviados via header `Authorization` quando presentes.

## Organização do código

- `src/app/components`: componentes reutilizáveis (`header`, `left-panel`, `notes-list`, `note`, `note-options`).
- `src/app/notes-screen`: composição da tela principal com comunicação entre componentes.
- `src/app/user-module`: telas de autenticação (`login` e `novo usuário`).
- `src/app/auth.guard.ts`: guarda de rota que bloqueia acesso sem token.

## Executando localmente

1. Instale o [Node.js](https://nodejs.org/) 20 LTS ou superior.
2. Instale as dependências:  
   ```bash
   npm install
   ```
3. Suba o servidor de desenvolvimento:  
   ```bash
   npm run start
   ```
4. Acesse `http://localhost:4200/` no navegador. O aplicativo recarrega automaticamente a cada alteração.

## Scripts npm úteis

- `npm run start`: inicia o servidor de desenvolvimento com live reload.
- `npm run build`: gera o bundle otimizado em `dist/`.
- `npm run watch`: recompila em modo development a cada alteração.
- `npm test`: executa os testes unitários via Karma.
