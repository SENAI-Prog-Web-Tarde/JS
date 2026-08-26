// Função utilitária para registrar logs
function registrarLog(mensagem) {
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0];
    const feed = document.getElementById('feed-logs');
    
    if (feed) {
        const item = document.createElement('div');
        item.textContent = `[${horaFormatada}] ${mensagem}`;
        feed.appendChild(item);
        feed.scrollTop = feed.scrollHeight;
    }
}

// ==========================================================
// PARTE 1: MANIPULAÇÃO DO DOM & EVENTOS (VANILLA JS)
// ==========================================================
const formDispositivo = document.getElementById('form-dispositivo');

if (formDispositivo) {
    formDispositivo.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputNome = document.getElementById('input-nome-disp');
        const nomeVal = inputNome.value.trim();

        if (nomeVal !== '') {
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
}

// Event Delegation para Botões Remover e Toggle no Documento
document.addEventListener('click', function(e) {
    // Ação: Botão Remover
    const btnRemover = e.target.closest('.btn-remover');
    if (btnRemover) {
        const card = btnRemover.closest('.item-disp');
        const nome = card.querySelector('strong').textContent;

        // Transição de fadeOut nativa via CSS
        card.style.transition = 'opacity 300ms ease';
        card.style.opacity = '0';

        setTimeout(() => {
            card.remove();
            registrarLog(`Dispositivo removido do DOM: "${nome}".`);
        }, 300);
        return;
    }

    // Ação: Botão Toggle Status
    const btnToggle = e.target.closest('.btn-toggle-status');
    if (btnToggle) {
        const card = btnToggle.closest('.item-disp');
        const indicator = card.querySelector('.status-indicator');
        const nome = card.querySelector('strong').textContent;

        if (indicator.classList.contains('status-online')) {
            indicator.classList.replace('status-online', 'status-alert');
            registrarLog(`Status alterado: Dispositivo "${nome}" DESATIVADO/ALERTA.`);
        } else {
            indicator.classList.replace('status-alert', 'status-online');
            registrarLog(`Status alterado: Dispositivo "${nome}" ATIVADO.`);
        }
    }
});

// ==========================================================
// PARTE 2: TEMPORIZADORES & TELEMETRIA
// ==========================================================
let timerTempAlert = null;

setInterval(function() {
    const tempSimulada = (Math.random() * 14 + 20).toFixed(1);
    const consumoSimulado = Math.floor(Math.random() * 80 + 100);

    const elTemp = document.getElementById('valor-temp');
    const elConsumo = document.getElementById('valor-consumo');
    const elAlerta = document.getElementById('alerta-temp');

    if (elTemp) elTemp.textContent = `${tempSimulada} °C`;
    if (elConsumo) elConsumo.textContent = `${consumoSimulado} W`;

    if (tempSimulada > 30.0) {
        if (elTemp) elTemp.classList.remove('text-success', 'text-warning');
        if (elTemp) elTemp.classList.add('text-danger');
        if (elAlerta) elAlerta.classList.remove('d-none');
        
        registrarLog(`⚠️ ATENÇÃO: Pico de temperatura detectado (${tempSimulada} °C)!`);

        clearTimeout(timerTempAlert);
        timerTempAlert = setTimeout(function() {
            if (elAlerta) elAlerta.classList.add('d-none');
        }, 4000);
    } else {
        if (elTemp) elTemp.classList.remove('text-danger', 'text-warning');
        if (elTemp) elTemp.classList.add('text-success');
    }
}, 3000);

// ==========================================================
// PARTE 3: ANIMAÇÃO, MÁSCARAS & VALIDAÇÃO (DOMContentLoaded)
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {

    // Efeito SlideToggle NATIVO
    const btnToggleConfig = document.getElementById('btn-toggle-config');
    const painelConfig = document.getElementById('painel-config');

    if (btnToggleConfig && painelConfig) {
        btnToggleConfig.addEventListener('click', function() {
            const icon = this.querySelector('.icon-arrow');
            
            if (painelConfig.style.maxHeight && painelConfig.style.maxHeight !== '0px') {
                painelConfig.style.maxHeight = '0px';
                painelConfig.style.overflow = 'hidden';
            } else {
                painelConfig.style.transition = 'max-height 0.3s ease-in-out'
                painelConfig.style.maxHeight = (painelConfig.scrollHeight + 100) + 'px';
            }

            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    }

    // Máscaras de Entrada Embutidas (Substituindo jQuery Mask)
    const inputIp = document.getElementById('input-ip');
    const inputPorta = document.getElementById('input-porta');
    const inputTel = document.getElementById('input-tel');
    const inputData = document.getElementById('input-data');

    if (inputIp) {
        function splitIp(value){
            if (value.length > 9) {
                value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}.${value.slice(9, 12)}`
            } else if (value.length > 6){
                value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}`
            } else if (value.length > 3){
                value = `${value.slice(0, 3)}.${value.slice(3, 6)}`
            }
            return value.split('.');
        }

        inputIp.addEventListener('input', (e) => {
            let v = e.target.value.replace(/[^0-9]/g, '');
            let parts = splitIp(v);
            
            if (parts.length > 4) {
                parts = parts.slice(0, 4);
            }
            
            parts = parts.map((part) => {
                if (part === '') return '';

                let num = parseInt(part, 10);
                if (num > 255) num = 255;

                return num.toString();
            })

            let formatted = parts.join('.');
            
            if (v.endsWith('.') && parts.length < 4 && parts[parts.length - 1] !== '') {
                formatted += '.';
            }
            
            e.target.value = formatted;
        });
    }

    if (inputPorta) {
        inputPorta.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
        });
    }

    if (inputTel) {
        inputTel.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 11);
            
            if (v.length > 6) {
                v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
            } else if (v.length > 2) {
                v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(${v}`;
            }

            e.target.value = v;
        });
    }

    if (inputData) {
        inputData.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 8);

            if (v.length > 4) {
                v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
            } else if (v.length > 2) {
                v = `${v.slice(0, 2)}/${v.slice(2)}`;
            }

            e.target.value = v;
        });
    }

    // Validação de Formulário
    const formConfig = document.getElementById('form-config-rede');
    if (formConfig) {
        formConfig.addEventListener('submit', function(e) {
            e.preventDefault();
            let valido = true;

            const ipVal = inputIp ? inputIp.value : '';
            const portaVal = inputPorta ? inputPorta.value : '';
            const telVal = inputTel ? inputTel.value : '';
            const dataVal = inputData ? inputData.value : '';

            // Regex IP
            const regexIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!regexIP.test(ipVal)) {
                inputIp.classList.add('is-invalid');
                inputIp.classList.remove('is-valid');
                valido = false;
            } else {
                inputIp.classList.remove('is-invalid');
                inputIp.classList.add('is-valid');
            }

            // Validação Porta
            if (portaVal === '' || parseInt(portaVal, 10) > 65535) {
                inputPorta.classList.add('is-invalid');
                inputPorta.classList.remove('is-valid');
                valido = false;
            } else {
                inputPorta.classList.remove('is-invalid');
                inputPorta.classList.add('is-valid');
            }

            // Validação Telefone
            if (telVal.length < 14) {
                inputTel.classList.add('is-invalid');
                inputTel.classList.remove('is-valid');
                valido = false;
            } else {
                inputTel.classList.remove('is-invalid');
                inputTel.classList.add('is-valid');
            }

            // Validação Data
            if (dataVal.length < 10) {
                inputData.classList.add('is-invalid');
                inputData.classList.remove('is-valid');
                valido = false;
            } else {
                inputData.classList.remove('is-invalid');
                inputData.classList.add('is-valid');
            }

            const msgSucesso = document.getElementById('msg-sucesso-config');

            if (valido) {
                if (msgSucesso) msgSucesso.classList.remove('d-none');
                registrarLog(`Configurações de rede salvas e validadas com sucesso! IP: ${ipVal}:${portaVal}`);
                
                setTimeout(function() {
                    if (msgSucesso) msgSucesso.classList.add('d-none');
                }, 4000);
            } else {
                registrarLog(`❌ Falha na validação das configurações de rede. Verifique os campos.`);
            }
        });
    }
});