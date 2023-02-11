// ======== iniciar display block da parte css ========
const botaoComecar = document.getElementById('btnIniciar');

document.getElementById('menu').style.display = 'none';

botaoComecar.addEventListener('click', () => {
    console.log('entrou no iniciar caixa');
    document.getElementById('btnIniciar').style.display = 'none';
    setTimeout(() => {
        document.getElementById('menu').style.display = 'flex';
    }, 500);
});

// ============== validação  ==============

const formOpcao = document.getElementById('formOpcao');


formOpcao.addEventListener('submit', (event) => {
    event.preventDefault();
    caixaEletronico();
    formOpcao.reset();

});

function caixaEletronico() {
    let inputMenu = document.getElementById('inputMenu')
    let msg = document.getElementById('msg')
    let saldo = 1000
    msg.innerHTML = `<p>Seu saldo é R$ ${saldo}. </p>`

    switch (inputMenu.value) {
        case '4':
            console.log('entrou no case 4');
            msg.innerHTML = `<br> Obrigada por usar nossos serviços. até breve ou não.`;
            setTimeout(() => {
                msg.innerText = ''
            }, 3500)

            break;
        case '1':
            let deposito = fazerDeposito()
            if (deposito) {
                saldo += deposito
                msg.innerHTML = ` Seu saldo ficou ${saldo}`
            }
            break
        case '2':
            let saldoAtualizado = fazerSaque(saldo)
            if (saldoAtualizado) {
                saldo = saldoAtualizado
            }
            break
        case '3':
            let saldoAtualizadoTransf = fazerTransferencia(saldo)
            if (saldoAtualizadoTransf) {
                saldo = saldoAtualizadoTransf
            }
            break;
        default:
            msg.innerHTML = `<p>Operação invalida</p>`;
            setTimeout(() => {
                msg.innerText = ''
            }, 3500)
            break;
    }
}
function fazerDeposito() {
    let deposito = Number(prompt(` Qual o valor que deseja depositar ?`))
    if (deposito <= 0 || deposito == '' || (isNaN(deposito))) {
        msg.innerHTML = 'Algo de errado não está certo, verifique novamente o valor digitado.'
    } else {
        return deposito;
    }
}
function fazerSaque(saldoAtual) {
    let saque = Number(prompt(`Qual o valor que deseja sacar ? `))
    if (saque <= 0 || saque == '' || (isNaN(saque))) {
        msg.innerHTML += `Valor tem que ser maior que zero.`
    } else if (saque > saldoAtual) {
        msg.innerHTML += `Você não tem todo esse valor.`
    } else {
        saldoAtual = saldoAtual - saque
        msg.innerHTML = ` Seu saldo ficou ${saldoAtual}`
        return saldoAtual;
    }
}
function fazerTransferencia(saldoAtualTransf) {
    let transferencia = Number(prompt(`Qual o valor que deseja transferir?`))

    if (transferencia <= 0 || isNaN(transferencia)  ||transferencia == '') {
        msg.innerHTML = `Digite um numero valido.`
    } else if (transferencia > 0 && transferencia < saldoAtualTransf) {

        let destino = prompt(`Escreva o destinatario: `)
        if (destino == '') {
            msg.innerHTML = 'destinario vazio, tente novamente'
        } else {
            saldoAtualTransf -= transferencia
            msg.innerHTML = `Transferencia no valor de R$ ${transferencia} foi realizada com sucesso !!!<br>
            Seu saldo ficou: R$ ${saldoAtualTransf}.<br> 
            Conta destino: ${destino}. `
        }

    } else {
        msg.innerHTML += `Você não tem saldo para essa operação. `
    }
}