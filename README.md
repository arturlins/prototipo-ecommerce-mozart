# Mozart Fitness - Protótipo E-commerce

Este é um protótipo de alta fidelidade para um e-commerce de equipamentos de fitness premium, focado em design minimalista e experiência do usuário (UX) fluida. Faz parte do trabalho da matéria de Análise e Projeto de Sistemas, do Curso de Sistemas de Informação do Centro Universitário Cesmac. Professor Mozart Melo Jr.

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna para garantir performance e manutenibilidade:

-   **[Next.js 16](https://nextjs.org/)** (App Router & Turbopack)
-   **[TypeScript](https://www.typescriptlang.org/)**
-   **[Tailwind CSS](https://tailwindcss.com/)**
-   **[Lucide React](https://lucide.dev/)** (Ícones)

## ✨ Funcionalidades

-   **Catálogo de Produtos**: Visualização de produtos com galeria de imagens e variações.
-   **Preços Dinâmicos**: O preço altera automaticamente com base na variação escolhida (ex: Peso de halteres, Espessura de tapetes).
-   **Carrinho de Compras**: Gerenciamento de estado global via Context API, com persistência local.
-   **Checkout Simulado**: Fluxo completo de checkout com validação de carrinho e simulação de pagamento (Cartão, Pix, Boleto).
-   **Design Responsivo**: Interface adaptável para Mobile e Desktop.

## 📦 Como Rodar Localmente

Siga os passos abaixo para executar o projeto na sua máquina:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/arturlins/prototipo-ecommerce-mozart.git
    cd prototipo-ecommerce-mozart
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse o projeto:**
    Abra seu navegador e vá para [http://localhost:3000](http://localhost:3000).

---

Desenvolvido como parte de um protótipo de interface moderna.

--- 

Texto do fluxo transformado em protótipo (fluxo descrito pelo aluno Gabriel Barros e desenvolvido por Artur Lins):

      0.    Usuário acessa o site ou aplicativo da loja de fitness
      1.    Usuário navega pelas categorias (ex: musculação, yoga, acessórios, bem-estar)
      2.    Usuário seleciona um produto
      3.    Sistema exibe a página do produto (fotos, descrição, preço, avaliações)
      4.    Usuário escolhe variações do produto (cor, tamanho, nível de resistência etc.)
      5.    Usuário define a quantidade desejada
      6.    Usuário adiciona o produto ao carrinho
      7.    Sistema atualiza o carrinho com o item selecionado
      8.    Usuário acessa o carrinho de compras
      9.    Sistema exibe resumo do pedido (produtos, frete, prazo, valor total)
      10.   Usuário insere CEP para cálculo de frete
      11.   Sistema consulta transportadora e calcula prazo e valor de entrega
      12.   Usuário seleciona o tipo de frete
      13.   Usuário clica em “Finalizar compra”
      14.   Sistema solicita login ou cadastro
      15.   Usuário insere e-mail e senha ou cria uma conta
      16.   Sistema valida os dados do usuário
      17.   Usuário informa endereço de entrega
      18.   Sistema salva e valida o endereço
      19.   Usuário escolhe a forma de pagamento (cartão, Pix, boleto)
      20.   Sistema exibe resumo final da compra
      21.   Usuário confirma o pedido
      22.   Sistema envia os dados para o gateway de pagamento
      23.   Gateway processa a transação
      24.   Sistema recebe a aprovação ou recusa do pagamento
      25.   Sistema gera o número do pedido
      26.   Sistema envia confirmação da compra por e-mail/notificação
      27.   Pedido é registrado no sistema da loja
      28.   Estoque é atualizado automaticamente
      29.   Equipe de separação recebe a ordem de preparo
      30.   Produto é separado no estoque
      31.   Produto passa por conferência
      32.   Produto é embalado
      33.   Nota fiscal é emitida
      34.   Pedido é entregue à transportadora
      35.   Código de rastreio é gerado
      36.   Cliente recebe o código de rastreio
      37.   Transportadora realiza a entrega
      38.   Sistema atualiza status para “Entregue”
      39.   Cliente recebe notificação de entrega concluída
      40.   Sistema envia solicitação de avaliação do produto
      41.   Processo de venda é finalizado

