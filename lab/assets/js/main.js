// Função utilitária para registrar logs
function registrarLog(mensagem) {
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0];
    const $feed = $('#feed-logs');
    $feed.append(`<div>[${horaFormatada}] ${mensagem}</div>`);
    $feed.scrollTop($feed[0].scrollHeight);
}

// ==========================================================
// PARTE 1: MANIPULAÇÃO DO DOM & EVENTOS (VANILLA JS / JQUERY)
// ==========================================================
document.getElementById('form-dispositivo').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputNome = document.getElementById('input-nome-disp');
    const nomeVal = inputNome.value.trim();

    if (nomeVal !== '') {
        // Criando o elemento dinamicamente no DOM
        const novoCard = document.createElement('div');
        novoCard.className = 'p-2 border border-secondary rounded d-flex justify-content-between align-items-center bg-dark item-disp mb-2';
        novoCard.innerHTML = `
            <div>
                <span class="status-indicator status-online"></span>
                <strong class="small text-light">${nomeVal}</strong>
            </div>
            <div>
                <button class="btn btn-outline-warning btn-sm py-0 px-2 btn-toggle-status"><i class="fa-solid fa-power-off"></i></button>
                <button class="btn btn-outline-danger btn-sm py-0 px-2 btn-remover"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        document.getElementById('lista-dispositivos').appendChild(novoCard);
        registrarLog(`Novo dispositivo adicionado ao DOM: "${nomeVal}".`);
        inputNome.value = '';
    }
});

// Event Delegation para Botões Remover e Toggle
$(document).on('click', '.btn-remover', function() {
    const $card = $(this).closest('.item-disp');
    const nome = $card.find('strong').text();
    $card.fadeOut(300, function() {
    $(this).remove();
    registrarLog(`Dispositivo removido do DOM: "${nome}".`);
    });
});

$(document).on('click', '.btn-toggle-status', function() {
    const $indicator = $(this).closest('.item-disp').find('.status-indicator');
    const nome = $(this).closest('.item-disp').find('strong').text();
    
    if ($indicator.hasClass('status-online')) {
        $indicator.removeClass('status-online').addClass('status-alert');
        registrarLog(`Status alterado: Dispositivo "${nome}" DESATIVADO/ALERTA.`);
    } else {
        $indicator.removeClass('status-alert').addClass('status-online');
        registrarLog(`Status alterado: Dispositivo "${nome}" ATIVADO.`);
    }
});

// ==========================================================
// PARTE 2: TEMPORIZADORES & TELEMETRIA (ENCONTRO 42)
// ==========================================================
let timerTempAlert = null;

setInterval(function() {
    // Gerando temperatura simulada entre 20.0°C e 34.0°C
    const tempSimulada = (Math.random() * 14 + 20).toFixed(1);
    const consumoSimulado = Math.floor(Math.random() * 80 + 100);

    const $elTemp = $('#valor-temp');
    $elTemp.text(`${tempSimulada} °C`);
        $('#valor-consumo').text(`${consumoSimulado} W`);

    if (tempSimulada > 30.0) {
        $elTemp.removeClass('text-success text-warning').addClass('text-danger');
        $('#alerta-temp').removeClass('d-none');
        registrarLog(`⚠️ ATENÇÃO: Pico de temperatura detectado (${tempSimulada} °C)!`);

        // setTimeout para remover a mensagem após 4 segundos
        clearTimeout(timerTempAlert);
        timerTempAlert = setTimeout(function() {
            $('#alerta-temp').addClass('d-none');
        }, 4000);
    } else {
    $elTemp.removeClass('text-danger text-warning').addClass('text-success');
    }
}, 3000);

// ==========================================================
// PARTE 3: JQUERY, MÁSCARAS & VALIDAÇÃO (ENCONTROS 43 A 46)
// ==========================================================
$(document).ready(function() {
    
    // Efeito SlideToggle (Encontro 44)
    $('#btn-toggle-config').on('click', function() {
        $('#painel-config').slideToggle(300);
        $(this).find('.icon-arrow').toggleClass('fa-chevron-down fa-chevron-up');
    });

    // Aplicação das Máscaras de Entrada com jQuery Mask Plugin (Encontro 46)
    $('#input-ip').mask('000.000.000.000');
    $('#input-porta').mask('00000');
    $('#input-tel').mask('(00) 00000-0000');
    $('#input-data').mask('00/00/0000');

    // Validação de Formulário com Regex (Encontro 45)
    $('#form-config-rede').on('submit', function(e) {
        e.preventDefault();
        let valido = true;

        const ip = $('#input-ip').val();
        const porta = $('#input-porta').val();
        const tel = $('#input-tel').val();
        const data = $('#input-data').val();

        // Expressão Regular simples para formato IP
        // const regexIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const regexIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!regexIP.test(ip)) {
            $('#input-ip').addClass('is-invalid');
            valido = false;
        } else {
            $('#input-ip').removeClass('is-invalid').addClass('is-valid');
        }

        if (porta === '' || parseInt(porta) > 65535) {
            $('#input-porta').addClass('is-invalid');
            valido = false;
        } else {
            $('#input-porta').removeClass('is-invalid').addClass('is-valid');
        }

        if (tel.length < 14) {
            $('#input-tel').addClass('is-invalid');
            valido = false;
        } else {
            $('#input-tel').removeClass('is-invalid').addClass('is-valid');
        }

        if (data.length < 10) {
            $('#input-data').addClass('is-invalid');
            valido = false;
        } else {
            $('#input-data').removeClass('is-invalid').addClass('is-valid');
        }

        if (valido) {
            $('#msg-sucesso-config').removeClass('d-none');
            registrarLog(`Configurações de rede salvas e validadas com sucesso! IP: ${ip}:${porta}`);
            setTimeout(function() {
                $('#msg-sucesso-config').addClass('d-none');
            }, 4000);
        } else {
            registrarLog(`❌ Falha na validação das configurações de rede. Verifique os campos.`);
        }
    });

});