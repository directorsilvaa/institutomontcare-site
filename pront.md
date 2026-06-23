Projeto: Instituto Montcare
Site: https://institutomontcare.com.br
Stack atual: React/Vite
Arquivos principais: src/App.jsx, src/main.jsx, src/styles.css, server.js, vite.config.js
Hospedagem: cPanel como Node App, rodando build normal com npm run build e servindo a pasta dist pelo server.js. Não usar Vercel. Não depender de Edge Functions. Não vou subir manualmente para public_html.

Problema:
O cliente reclamou que o conteúdo e o Schema sumiram do código-fonte. Preciso corrigir SEO técnico, GEO SEO, AEO e Schema em todas as páginas públicas do site.

Objetivo:
Ao abrir view-source nas rotas abaixo, precisa aparecer:

* conteúdo textual principal da página
* title único
* meta description única
* canonical correto
* Open Graph básico
* script type="application/ld+json"

Rotas principais:
/
/reabilitacao-ortopedica/
/artrodeses/
/infiltracoes/
/cirurgias-minimamente-invasivas/

Tarefas:

1. Manter o projeto em React/Vite.
   Não migrar para Next.js.
   Não quebrar layout, design, responsividade, animações ou rotas existentes.

2. Corrigir o server.js para servir corretamente a pasta dist após o build:

* npm run build deve gerar dist/
* npm start deve rodar node server.js
* server.js deve servir arquivos estáticos de dist
* server.js deve funcionar no cPanel Node App usando process.env.PORT

3. Implementar SEO por rota.
   Cada rota precisa ter:

* title próprio
* meta description própria
* canonical absoluto
* og:title
* og:description
* og:url
* og:type
* og:site_name
* twitter:card
* twitter:title
* twitter:description

4. Implementar Schema JSON-LD.
   Criar dados estruturados usando:

<script type="application/ld+json">

O JSON precisa ser válido e seguro:
JSON.stringify(data).replace(/</g, "\\u003c")

5. Schema global em todas as páginas:
- Organization
- MedicalClinic
- WebSite

Usar somente dados reais já existentes no projeto/site.
Não inventar cidade, CEP, horário, CRM, RQE, redes sociais, médico ou dados médicos se não estiverem no código atual.

IDs sugeridos:
https://institutomontcare.com.br/#organization
https://institutomontcare.com.br/#clinic
https://institutomontcare.com.br/#website

6. Schema específico por página:
Cada página deve ter:
- WebPage
- BreadcrumbList

Páginas de procedimento devem ter também:
- Service ou MedicalProcedure

Se a página tiver FAQ visível, adicionar:
- FAQPage

Regra importante:
Não criar FAQPage se as perguntas e respostas não estiverem visíveis na página.

7. Corrigir a reclamação do cliente sobre conteúdo no código.
Como React SPA normalmente deixa o conteúdo só depois do JavaScript carregar, implementar uma solução para que o conteúdo principal também apareça no HTML inicial/view-source.

Pode usar uma destas abordagens:
- pré-render estático das rotas públicas no build
- vite-plugin-prerender
- react-snap
- ou outra solução equivalente compatível com React/Vite e cPanel Node App

Critério obrigatório:
Ao abrir view-source de cada rota, o texto principal da página precisa aparecer no HTML, não apenas dentro do bundle JavaScript.

8. GEO SEO.
Adicionar ou melhorar textos visíveis no HTML explicando claramente:
- o que é o Instituto Montcare
- quais tratamentos oferece
- quando procurar atendimento ortopédico
- diferenciais da clínica
- medicina resolutiva, se já existir no conteúdo real
- reabilitação ortopédica
- artrodeses
- infiltrações
- cirurgias minimamente invasivas

Esses textos precisam estar visíveis na página, não apenas no Schema.

9. AEO.
Adicionar blocos de perguntas e respostas visíveis nas páginas principais, principalmente home e páginas de procedimentos.

Exemplo:
<h2>Perguntas frequentes</h2>
<h3>Quando procurar um ortopedista?</h3>
<p>Procure um ortopedista em caso de dor persistente na coluna, joelho, ombro, quadril, mão, pé, tornozelo ou limitação de movimento.</p>

As perguntas visíveis precisam bater com o FAQPage schema da mesma rota.

10. Sitemap e robots.
Garantir que existam e sejam publicados no build:
public/robots.txt
public/sitemap.xml

robots.txt deve conter:
User-agent: *
Allow: /

Sitemap: https://institutomontcare.com.br/sitemap.xml

sitemap.xml deve conter todas as rotas públicas:
https://institutomontcare.com.br/
https://institutomontcare.com.br/reabilitacao-ortopedica/
https://institutomontcare.com.br/artrodeses/
https://institutomontcare.com.br/infiltracoes/
https://institutomontcare.com.br/cirurgias-minimamente-invasivas/

11. Validação.
Rodar:
npm install
npm run build
npm start

Corrigir qualquer erro de build, lint, import, rota, server.js ou dependência.

12. Critério de aceite final.
A tarefa só termina quando:

- npm run build passa sem erro
- npm start roda o servidor
- o site continua visualmente igual
- todas as rotas continuam funcionando
- view-source:https://institutomontcare.com.br/ mostra conteúdo textual, canonical, meta description, Open Graph e application/ld+json
- view-source das páginas internas também mostra conteúdo textual, canonical, meta description, Open Graph e application/ld+json
- schema global aparece em todas as páginas
- cada página tem WebPage e BreadcrumbList
- páginas de procedimento têm Service ou MedicalProcedure
- FAQPage só aparece onde existe FAQ visível
- robots.txt funciona
- sitemap.xml funciona

No final, me informe:
- arquivos criados
- arquivos alterados
- dependências instaladas
- comando de build
- comando para rodar no cPanel Node App
- como testar com view-source
- se precisa limpar cache do cPanel, LiteSpeed, QUIC.cloud ou Cloudflare
