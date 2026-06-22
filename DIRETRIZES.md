# Diretrizes do Portfolio Pessoal

Este documento deve ser consultado antes de novas etapas de desenvolvimento para manter o projeto consistente.

## Objetivo

Criar um portfolio pessoal moderno, bonito, acessivel e criativo, com foco em apresentar capacidade tecnica e bom senso visual. Nesta fase, o projeto deve permanecer como esqueleto funcional, sem conteudo definitivo e sem design final.

## Stack

- Aplicacao exclusivamente frontend.
- Sem backend, APIs externas, banco de dados ou persistencia remota.
- React + Vite como base do projeto.
- Execucao local com `npm run dev`, aproveitando HMR para visualizacao imediata no browser.
- Tailwind CSS para estilos utilitarios.
- `src/index.css` como CSS global da aplicacao.

## Estrutura

- O portfolio sera uma single page application.
- Mesmo sendo uma pagina unica, cada secao deve ser separada em componentes proprios.
- Componentes de secao devem usar nomes em ingles, como `HomeSection`, `AboutSection` e `ContactSection`.
- As secoes finais ainda serao definidas. Por enquanto, manter placeholders simples e bem organizados.
- Evitar adicionar conteudo definitivo antes da etapa de conteudo.
- Evitar design visual definitivo antes da etapa de design.
- Quando forem necessarios icones na interface, utilizar `lucide-react`. Para marcas que nao existam no Lucide, usar `react-icons`.
- A navegacao principal deve permanecer visivel durante a rolagem e apontar para secoes internas da pagina.

## Idioma

- O projeto deve suportar Portugues e Ingles.
- Todo texto visivel deve passar por uma estrutura de conteudo/i18n, evitando strings soltas nos componentes finais.
- O atributo `lang` do documento deve acompanhar o idioma selecionado.
- A preferencia de idioma pode ser salva localmente no navegador, sem backend.

## Tema

- O projeto deve suportar modo claro e modo escuro.
- O tema deve ser refletido no elemento raiz para permitir estilos globais com Tailwind.
- Componentes novos devem considerar os dois temas desde o inicio.
- A preferencia de tema pode ser salva localmente no navegador, sem backend.

## Animacoes

- O design final deve incluir boa quantidade de microanimacoes.
- Animacoes devem reforcar interacao, hierarquia e polimento, sem atrapalhar leitura ou desempenho.
- Respeitar `prefers-reduced-motion` para acessibilidade.

## Acessibilidade

- Usar HTML semantico: `header`, `main`, `section`, titulos hierarquicos e botoes reais.
- Manter foco visivel e navegacao por teclado.
- Usar textos acessiveis em controles de idioma, tema e navegacao.
- Garantir contraste adequado nos modos claro e escuro.
- Evitar depender apenas de cor ou animacao para comunicar informacao.
- Manter layout responsivo para mobile, tablet e desktop.

## Boas praticas

- Preferir componentes pequenos e claros.
- Manter estilos globais apenas para base visual, tokens, acessibilidade e utilidades compartilhadas.
- Evitar dependencias extras sem necessidade real.
- Antes de novas alteracoes, validar com `npm run build` ou `npm run lint` quando fizer sentido.
