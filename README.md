# DefendaJá

Site estático com páginas de serviços, contato e avaliações ilustrativas.

## Visualização local

Na pasta do projeto, execute:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Abra http://127.0.0.1:8765/. O projeto já contém os arquivos compilados e não
precisa de instalação de dependências. Abrir index.html diretamente não funciona.

## Conteúdo e estilos

- `depoimentos.json`: conteúdo e caminhos das fotos das avaliações.
- `clientes/`: imagens locais, incluindo os retratos fictícios gerados por IA.
- `assets/avaliacoes.js`: componente das avaliações, com navegação manual.
- `assets/avaliacoes.css`: estilos das avaliações.
- `assets/mobile.css`: ajustes para celular e tablet.
- `assets/index-rS7u0wqS_v7.js`: aplicação e configurações de contato.

Contato: defendaja@gmail.com. Atendimento de segunda a sexta, das 9h às 18h.
Sábados e domingos: fechado.

Os dez depoimentos e seus retratos são fictícios e estão identificados como
ilustrativos. Substitua por avaliações reais autorizadas antes de usá-los como
referências de clientes. Dados institucionais entre colchetes ainda precisam ser
preenchidos com informações reais.

Os detalhes dos ajustes e das verificações de layout estão em
`ATUALIZACOES-MOBILE.txt`.

## Publicação na Vercel

O projeto contém `vercel.json` para publicação estática, com a pasta raiz como
saída e sem etapa de build. As rotas das páginas públicas são direcionadas ao
aplicativo. Os arquivos de documentação e credenciais locais ficam fora do envio.

Com a conta autenticada na Vercel, publique na pasta do projeto:

```sh
npx vercel --prod
```
