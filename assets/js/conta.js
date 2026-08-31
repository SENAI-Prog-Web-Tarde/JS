const defaultEmail = 't@teste.com';
const defaultSenha = 'pass1234';
const defaultUsername = 'Teste';
let url = new URL(window.location.href);

window.addEventListener('load', () => {
    const viewParam = url.searchParams.get('view');
    if (viewParam === 'cadastro') {
        mudarContainer(document.querySelector('#btn-cadastro'));
    } else {
        mudarContainer(document.querySelector('#btn-login'));
    }
});

function mudarContainer(botao) {
    const containerLogin = document.querySelector('.container-login');
    const containerCadastro= document.querySelector('.container-cadastro');

    if (containerLogin.contains(botao)) {
        containerLogin.classList.remove('active');
        containerCadastro.classList.add('active');
        containerCadastro.style.animation = 'toRight 1s -0.3s cubic-bezier(0, 1.5, 1, 0.9) normal forwards'
        url.searchParams.set('view', 'cadastro');
        window.history.pushState({}, "", url);
    } else {
        containerCadastro.classList.remove('active');
        containerLogin.classList.add('active');
        containerLogin.style.animation = 'toLeft 1s -0.3s cubic-bezier(0, 1.5, 1, 0.9) normal forwards'
        url.searchParams.set('view', 'login');
        window.history.pushState({}, "", url);
    }
}

function validarCredenciais(email, senha) {
    if (email === defaultEmail && senha === defaultSenha) {
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha incorretos. Por favor, tente novamente.');
    }
}

function validarCamposVazios(form) {
    const elements = form.querySelectorAll('.input-field');
    let camposVazios = false;

    elements.forEach((element) => {
        let label = element.labels[0];
        if (element.value.trim() === '' || ((element.type === 'checkbox' || element.type === 'radio') && element.checked === false)) {
            element.classList.add('error');

            let labelText = element.labels[0].innerHTML;
            if (!labelText.includes('<span style="color: red;"> (*)</span>')) {
                element.labels[0].innerHTML += '<span style="color: red;"> (*)</span>';
            }

            // if(label.childElementCount < 1){
            //     let errorSpan = document.createElement('span');
            //     errorSpan.innerText = " (*)";
            //     errorSpan.classList.add('color-error');
            //     label.append(errorSpan);
            // }

            camposVazios = true;
        } else {
            element.classList.remove('error');

            element.labels[0].innerHTML = element.labels[0].innerHTML.replace('<span style="color: red;"> (*)</span>', '');

            // label.children[0].remove();
        }
    });

    return camposVazios;
}

const formLogin = document.querySelector('#form-login');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validarCamposVazios(formLogin)) {
        return;
    }

    const email = formLogin.querySelector('#login-email').value;
    const senha = formLogin.querySelector('#login-senha').value;

    validarCredenciais(email, senha);
})

formLogin.addEventListener('input', (e) => {
    console.log(e.target)
    if (e.target.classList.contains('error')) {
        validarCamposVazios(formLogin);
    }
});

const formCadastro = document.querySelector('#form-cadastro');
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validarCamposVazios(formCadastro)) {
        return;
    }
})

formCadastro.addEventListener('input', (e) => {
    if (e.target.classList.contains('error')) {
        validarCamposVazios(formCadastro);
    }
});