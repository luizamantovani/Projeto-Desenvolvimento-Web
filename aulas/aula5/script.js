const botaoCodigo = document.querySelector('#btnCodigo');

if (botaoCodigo) {
    botaoCodigo.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://github.com/luizamantovani/Projeto-Desenvolvimento-Web', '_blank');
    });
}

const botaoCodigo2 = document.querySelector('#btnCodigo2');

if (botaoCodigo2) {
    botaoCodigo2.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/joão-vitor-martinelle-160b73272?utm_source=share_via&utm_content=profile&utm_medium=member_ios', '_blank');
    });
}