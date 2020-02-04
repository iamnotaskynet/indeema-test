const btnAdd = document.querySelector('.btn');
const body = document.querySelector('body');

const createModal = () => {
    const modalHTML = document.createElement('div');
    modalHTML.className = "modalWindow";
    modalHTML.innerHTML = `<p>MODAL WINDOW</p><button class="btnClose">X</button> `;
    return modalHTML;
}

btnAdd.addEventListener('click', event => {
    //console.log(event);
    const modal = createModal();
    body.appendChild(modal);

    addCloseEvent();
});

const addCloseEvent = () => {
    const btnsClose = document.querySelectorAll('.btnClose');
    console.log(btnsClose);
    
    btnsClose[btnsClose.length - 1 ].addEventListener('click', event => {
        event.currentTarget.parentNode.remove();
    });
};
