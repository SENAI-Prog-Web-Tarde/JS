const mainMenu = document.querySelector('.main-menu');

function toggleMenu() {
    mainMenu.style.visibility == '' ? mainMenu.style.visibility = 'hidden' : undefined;

    if(mainMenu.style.visibility == 'hidden'){
        mainMenu.style.opacity = '1';
        mainMenu.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    } else {
        mainMenu.style.opacity = '0';
        mainMenu.style.visibility = 'hidden'
        document.body.style.overflow = 'auto';
    }

    // mainMenu.classList.toggle('sidebar-open');
    // document.body.classList.toggle('hidden-scroll');
}

window.addEventListener('resize', (e) => {
    if(mainMenu.style.visibility == 'hidden'){
        mainMenu.style.opacity = '1';
        mainMenu.style.visibility = 'visible';
    }
})

const detailsElements = document.querySelectorAll('details');

document.addEventListener('click', (e) => {
    detailsElements.forEach((details) => {
        if(!details.contains(e.target)){
            details.removeAttribute('open');
        }
    })
})