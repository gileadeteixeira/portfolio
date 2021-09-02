export const copyEmail = ()=>{
    const endereco = document.createElement('textarea');
    endereco.value = "gileadeateixeira@gmail.com";
    document.body.appendChild(endereco);
    endereco.select();
    document.execCommand("copy", false, `${endereco.value}`);
    document.body.removeChild(endereco);

    const contactContainer = document.querySelector('section#contact .contact__container')

    const emailModal = document.createElement('div');
    emailModal.classList.add('custom-modal__container');
    emailModal.innerHTML = `
    <div class="contact__email-modal">
        <span>
            <strong>Gmail copiado! </strong>(gileadeateixeira@gmail.com)
        </span>
    </div>
    `;
    contactContainer.appendChild(emailModal);
    setTimeout(() => {
        contactContainer.removeChild(emailModal);
    }, 2500);
}