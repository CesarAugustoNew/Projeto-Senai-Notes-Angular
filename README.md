<div align="center">
<img src="https://raw.githubusercontent.com/twbs/icons/main/icons/journal-text.svg" width="60" alt="Logo" />

# Senai Notes


[![Frontend](https://img.shields.io/badge/Frontend-Angular-DD0031?style=flat-square&logo=angular&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](#)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](#)

[**🔗 Aplicação publicada**](https://projeto-senai-notes-angular.vercel.app) · [**⚙️ Repositório da API**](https://github.com/CesarAugustoNew/SpringBootAPI-Senai-Notes)

</div>

## Demonstração
<img width="1915" height="948" alt="cadastro" src="https://github.com/user-attachments/assets/8d629a96-4aff-4d5c-b417-264cf2f6483e" />
<img width="1918" height="946" alt="login" src="https://github.com/user-attachments/assets/fda47b06-39c8-4eef-8a1f-1e0f71b192a5" />
<img width="1914" height="951" alt="telaprincipal" src="https://github.com/user-attachments/assets/28940fee-cfdd-4b84-9401-45ba33d0bec1" />


---

## Sobre este projeto

Esta é a tela do Senai Notes: a parte que a pessoa realmente usa no navegador para se cadastrar, entrar na conta, e criar/organizar suas anotações. Ela não guarda nenhum dado sozinha — toda informação (usuários, notas, etiquetas) é enviada e buscada de uma API própria, publicada separadamente.

A API que esse front-end consome é um projeto à parte, feito em Java com Spring Boot ([link do repositório](#)).

## Funcionalidades

- Tela de cadastro e login
- Criar, editar, arquivar e excluir notas
- Anexar uma imagem a cada nota
- Organizar e filtrar notas por etiqueta (tag)
- Buscar notas por palavra-chave
- Notificações visuais (toasts) para cada ação — sem usar os alertas padrão do navegador

## Tecnologias usadas

| Item | Tecnologia |
|---|---|
| Framework | Angular |
| Linguagem | TypeScript |
| Estilo | CSS |
| Publicação | Vercel |

## Como a comunicação com a API funciona

O endereço da API não fica fixo no código: ele vem de uma variável de ambiente (`API_URL`), configurada na própria Vercel. Isso permite trocar de API (por exemplo, para testar localmente ou apontar para outro ambiente) sem precisar alterar nenhum arquivo do projeto — só a configuração de ambiente muda.

Depois do login, a aplicação guarda um token de acesso (JWT) e passa a enviá-lo automaticamente em cada ação seguinte, provando para a API quem é o usuário logado.

## Deploy

Publicado na **Vercel**, que builda o projeto automaticamente a cada atualização enviada para o repositório.
