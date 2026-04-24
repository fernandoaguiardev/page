# Sistema de Cadastro de Imóveis

## Objetivo do sistema

Este sistema permite cadastrar imóveis, armazená-los em memória, exibi-los na tela e removê-los quando necessário.

---

## Variáveis globais

* `imoveis`: lista (array) que armazena todos os imóveis cadastrados.
* `id`: contador utilizado para gerar um identificador único para cada imóvel.

---

## Função: cadastrarImovel

Executada quando o formulário é enviado.

1. Impede o comportamento padrão do formulário (recarregar a página).
2. Captura os dados digitados pelo usuário:

   * Nome do proprietário
   * Quantidade de quartos
   * Quantidade de banheiros
   * Indicação de garagem
3. Converte os valores numéricos.
4. Incrementa o ID para garantir que cada imóvel seja único.
5. Cria um objeto `imovel` com os dados informados.
6. Adiciona o imóvel à lista `imoveis`.
7. Exibe uma mensagem de confirmação.
8. Limpa o formulário.

---

## Função: mostrarImoveis

Responsável por exibir os imóveis cadastrados.

1. Seleciona o elemento onde os dados serão exibidos.
2. Limpa o conteúdo anterior.
3. Caso não existam imóveis cadastrados:

   * Exibe uma mensagem informando que a lista está vazia.
4. Caso existam:

   * Percorre todos os imóveis.
   * Para cada imóvel:

     * Cria um elemento visual (card).
     * Exibe as seguintes informações:

       * ID
       * Proprietário
       * Quartos
       * Banheiros
       * Garagem
     * Adiciona um botão para exclusão.
     * Insere o elemento na tela.

---

## Função: removerPorId

Remove um imóvel diretamente a partir do botão exibido na interface.

1. Recebe o ID do imóvel.
2. Localiza o índice correspondente na lista.
3. Caso não encontre:

   * Informa que o imóvel não existe.
4. Caso encontre:

   * Solicita confirmação do usuário.
   * Remove o imóvel da lista.
   * Atualiza a exibição na tela.

---

## Função: deletarImovel

Permite remover um imóvel informando o ID manualmente.

1. Solicita ao usuário o ID do imóvel.
2. Busca o imóvel na lista.
3. Caso não encontre:

   * Exibe mensagem de erro.
4. Caso encontre:

   * Solicita confirmação.
   * Remove o imóvel da lista.
   * Atualiza a exibição.

---

## Evento do formulário

O formulário está associado a um evento de envio (`submit`), que dispara a função `cadastrarImovel`.

---

## Resumo geral

O sistema segue o seguinte fluxo:

* O usuário cadastra imóveis por meio de um formulário.
* Os dados são armazenados em uma estrutura de lista.
* Os imóveis podem ser visualizados na interface.
* É possível remover imóveis por meio de ações do usuário.

---

## Possíveis melhorias

* Substituir `alert` e `confirm` por componentes visuais mais adequados.
* Implementar edição de imóveis.
* Persistir os dados utilizando `localStorage`.
* Remover atributos `onclick` e utilizar apenas `addEventListener`.
* Melhorar a organização e a experiência da interface.

---
