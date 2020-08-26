/*
  funções Main() para receber o primeiro produto e determinar se o usuário quer mais de um, se sim,
  é chamada a função Multiple() para servir de carrinho.

  A função PayMent() é obvia, é onde fica as operações de troco e pagamento.

  A função DumpCustomers() serve para saber quais produtos existem, sua quantidade e seu preço;
  caso a quantidade do produto seja 0, ele imprimirá dizendo que acabou.
  */

var escolha, salg, qnt, recieved, troco, precoT = 0, nEscolha, yesNo, text = " ", qntMain, salgMain, nEscolhaMain, find, choice, resultMulti = 0, precoTmain = 0;

var salgados = [
  { nome: "Another World", preco: 30, qnt: 1 },
  { nome: "Super Driver", preco: 30, qnt: 15 },
  { nome: "Brigadeiro", preco: 15, qnt: 15 }
];

function start(){
    while (true) {
      //tells the program what the user wants
      escolha = parseInt(prompt("Digite 1 para comprar algo[..]\n4 para adicionar produtos.\nDigite 0 para cancelar."));

      if (escolha == 0) {
        escolha = "";
        break;
      }
      
      else if (escolha == 1) {
        //resets variables
        salg = 0, recieved = 0, troco = 0, precoT = 0, nEscolha = 0, qntMain = 0, salgMain = 0, nEscolhaMain = 0, text = "";

        //asks which produto the user wants
        nEscolha = parseInt(prompt("Em número, qual produto desejas?\nDigite 0 para cancelar\n\n" + DumpCustomers()));
        //exits the program
        if (nEscolha == 0) {
            break;
        }
        //safegard
        while (nEscolha < 1 || nEscolha > salgados.length) {
          nEscolha = parseInt(prompt("Lembre-se, deve ser um número entre " + 1 + " e " + salgados.length + "\n" + DumpCustomers()));
        }
        //to access the correct place of the vector
        nEscolha = nEscolha - 1;

        //checks if the product is available, prompts the user to input another product
        if (salgados[nEscolha].qnt == 0) {
          alert("Este produto infelizmente acabou, escolha outro");
        }
        //if it is available, enters else and calls function for buying
        else {
          Main();
        }
      }
      //to edit products
      else if (escolha == 4) {
        find = parseInt(prompt("Digite 0 para adicionar um novo produto\nDigite o número de algum produto\n" + DumpCustomers()));
        //safegard
        while (find < 0 || find > salgados.length) {
          find = parseInt(prompt("Lembre-se, 0 para adicionar um novo produto\nDigite o número de algum produto\n" + DumpCustomers()));
        }

        if (find >= 1) {
          //find -- for it to become our vector position
          find--;
          choice = parseInt(prompt("Você quer adicionar mais(1), subtrair(2) ou mudar o preço(3)?\nComo sempre, 0 para cancelar."));
          switch (choice) {
            //exits the program
            case 0:
              escolha = 0;
              break;
            //adds more products
            case 1:
              qnt = parseInt(prompt("Quantos produtos novos chegaram?"));
              while (qnt <= 0) {
                qnt = parseInt(prompt("Desculpe, o valor ha de ser positivo apenas."));
              }
              salgados[find].qnt += qnt;
              break;
            //subtracts products
            case 2:
              qnt = parseInt(prompt("Quantas quantidades desejas remover?"));
              while (qnt > salgados[find].qnt || qnt < 0) {
                qnt = parseInt(prompt("Desculpe, o valor ha de ser positivo e menor que a quantidade(" + find + ") do(a) " + salgados[find].name + "."));
              }
              salgados[find].qnt -= qnt;
              break;
            //fixes price
            case 3:
              choice = parseFloat(prompt("Qual o novo preço?"));
              while (choice < 0) {
                choice = parseFloat(prompt("Não existe preço vegativo, po. Coloque algo entre 0 e infinito."));
              }
              salgados[find].preco = choice;
              break;
            //in case the user tries to break everything
            default:
              while (choice != 3 || choice != 2 || choice != 1 || choice != 0) {
                choice = parseInt(prompt("Número errado. Para adicionar(1), remover(2) ou mudar o preço(3).\nComo sempre, 0 para sair."));
              }
          }
          //to add a new product to the list
        } else if (find == 0) {
          salgados.push({ nome: prompt("Insira o nome do produto."), preco: parseFloat(prompt("Insira o preço.")), qnt: parseInt(prompt("Insira a quantidade")) });
          escolha = parseInt(prompt("Deseja adicionar outro produto? Se sim, insira '4'.\nSe não, deixe em branco.\nPara cancelar, insira'0'."));
          //safegard
          while (escolha < 0 || escolha > 4) {
            escolha = parseInt(prompt("Quebre o programa n, macho.\n\nPara voltar ao início, deixe em branco.\nPara cancelar, insira'0'."));
          }
        }
      }
    }
}

function Main() {
  //checks if the user's product exists
  if (nEscolha >= 0 && nEscolha < salgados.length) {

    //"Main" variables to keep the first product from the multiple ones, if there is
    nEscolhaMain = nEscolha;
    salg = salgados[nEscolha].nome;
    salgMain = salgados[nEscolhaMain].nome;

    //how many salgs
    qntMain = parseInt(prompt("Quantos " + salgMain + " você desejas?"));

    //checks if qnt of products are valid, if so, prompts to enter a valid qnt
    while (qntMain > salgados[nEscolha].qnt || qntMain <= 0 || (qntMain == null && qntMain == "")) {
      qntMain = parseInt(prompt("Nao temos essa quantidade de " + salgMain + ". Digite algo menor ou igual a " + salgados[nEscolha].qnt));
    }

    //asks if user wants to add more things
    yesNo = parseInt(prompt("Você deseja adicionar outro item ao carrinho? '0'(para cancelar tudo), '1'(para sim) ou '2'(para nao)?"));

    //if yes, calls function to add as many salgs as the user desires '0'(para cancelar tudo)
    switch (yesNo) {
      case 0:
        escolha = 0;
        break;
      case 1:
        Multiple();
        break;
      case 2:
        break;
      default:
        while (yesNo != 0 || yesNo != 1 || yesNo != 2) {
          yesNo = parseInt(prompt("Você deseja realmente adicionar outro item ao carrinho? Então:  '0'(para cancelar tudo), '1'(para sim) ou '2'(para nao)?"));
          if (yesNo == 0 || yesNo == 1 || yesNo == 2) {
            break;
          }
        }
        break;
    }
    if (escolha != 0) {
      PayMent();
    }
  }
}
//function for the user to keep adding different kinds of products
function Multiple() {
  while (yesNo == 1) {
    nEscolha = 0, qnt = 0, salg = 0;

    nEscolha = parseInt(prompt("Em número, qual item desejas adicionar ao carrinho?\n" + DumpCustomers()));
    while (nEscolha < 0 || nEscolha > salgados.length) {
      nEscolha = parseInt(prompt("Lembre-se, deve ser um número entre " + 1 + " e " + salgados.length + "\n" + DumpCustomers()));
    }
    if (nEscolha == 0) {
      break;
    }
    nEscolha = nEscolha - 1;

    if (nEscolha >= 0 && nEscolha < salgados.length) {
      //to keep things small
      salg = salgados[nEscolha].nome;

      //how many salgs
      qnt = parseInt(prompt("Quantos " + salg + " você desejas?"));

      //checks if qnt of products is valid, if so, prompts to enter a valid qnt
      while (qnt > salgados[nEscolha].qnt) {
        qnt = parseInt(prompt("Nao temos essa quantidade toda de " + salg + ". Digite algo menor ou igual a " + salgados[nEscolha].qnt));
      }

      resultMulti = salgados[nEscolha].preco * qnt;

      //text holds and indents the quantity and name of the products

      text = text + qnt + " " + salg + " R$" + resultMulti + "\n";
      precoT = precoT + resultMulti;
      salgados[nEscolha].qnt -= qnt;
      //asks if user wants to add more things
      yesNo = parseInt(prompt("Você deseja adicionar outro item ao carrinho? '0'(para cancelar tudo)\n'1'(para sim) ou '2'(para nao)?"));
    }
  }
}

//obvious function, recieves the money and calculates the change
function PayMent() {
  //recieves the price times the quantity user wants
  precoTmain = precoT + (qntMain * salgados[nEscolhaMain].preco);

  //asks user for the payment
  recieved = parseFloat(prompt(qntMain + " " + salgMain + " R$" + salgados[nEscolhaMain].preco * qntMain + "\n" + text + " custarao R$" + precoTmain + "."));

  //checks if payment is indeed enough
  while (recieved < precoTmain) {
    recieved = parseFloat(prompt("Desculpe-me, mas ainda falta dinheiro para completar a compra. O total ficou R$" + precoTmain));
  }

  //removing the quantity bought and calculating change
  salgados[nEscolhaMain].qnt -= qntMain;
  troco = recieved - precoTmain;
  alert("Seu troco é R$" + troco + "\nObrigado por comprar, amigão!");
}

//to display the products and the quantity available
function DumpCustomers() {
  var qualquer = " ", text = " ";
  for (var i = 0; i < salgados.length; i++) {

    //usual display table of products, quantity and price
    if (salgados[i].qnt > 0) {
      qualquer = (i + 1) + " para " + salgados[i].nome + "(" + salgados[i].qnt + " restantes) - R$" + salgados[i].preco;
      text = text + qualquer + "\n";
    }

    //in case one of the products runs out
    else if (salgados[i].qnt <= 0) {
      qualquer = salgados[i].nome + " Acabou";
      text = text + qualquer + "\n";
    }
  }
  return text;
}
