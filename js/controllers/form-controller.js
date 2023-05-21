import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import RequestException from '../services/exceptions/request-exception.js';

function State()
{
    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

export function init()
{
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.btnClear.addEventListener('click', handleBtnClearClick);

}

function handleInputNumberKeyUp(event)
{   
    state.address.number = event.target.value;
}

function handleInputNumberChange(event)
{
    if (event.target.value == "")
    {
        setFormError("number", "Campo Requerido");
    }
    else
    {
        setFormError("number", "");
    }
}

async function handleInputCepChange(event)
{
    const cep = event.target.value;

    try
    {
        const address = await addressService.findByCep(cep);

        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;

        setFormError("cep", "");
        state.inputNumber.focus();
    }
    catch (e)
    {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("cep", "CEP Inválido");
    }

}

function handleBtnClearClick(event)
{
    event.preventDefault();
    clearForm();
}

async function handleBtnSaveClick(event)
{
    event.preventDefault();
    console.log(state.address);
}

function clearForm()
{
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus();
}

function setFormError(key, value)
{
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

