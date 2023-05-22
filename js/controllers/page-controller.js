import * as modalController from './modal-controller.js'

export function init()
{
    const contactLink = document.querySelector(".contact-link").addEventListener('click', handleContactLinkClick);
}

function handleContactLinkClick(event)
{
    event.preventDefault();
    console.log("click");
    modalController.showModal();
}