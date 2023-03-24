import 'vite/modulepreload-polyfill';
import CheckoutPage from './CheckoutPage';
import { PK_KEY } from './config';

document.querySelector('#btn-payment').onclick = async () => {

    document.querySelector('#formation').innerHTML = await CheckoutPage();

    const displayCardError = document.querySelector('#card_errors');
    const displayPaymentError = document.querySelector('#errors');
    const cardButtonElement = document.querySelector('#btn-payment-validate');
    cardButtonElement.disabled = true;
    document.querySelector('#btn-payment-cancel').onclick = () => location.reload();
    
    const stripe = Stripe(PK_KEY['pk_key']);
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card');
 
    card.addEventListener('change', (event) => {
        
        if (event.error) {
            displayCardError.innerText = event.error.message;
            cardButtonElement.disabled = true;
        } else {
            displayCardError.innerHTML = '&nbsp;';
            displayPaymentError.innerHTML = '&nbsp;';
            cardButtonElement.innerText =  'Valider le paiement';
            cardButtonElement.disabled = false;
        }
    });

    cardButtonElement.onclick = () => {
        displayCardError.innerHTML = '&nbsp;';
        let cardHolderName = document.querySelector('#cardName').value;
        let cardHolderEmail = document.querySelector('#email').value;

        if (cardHolderName != '' && cardHolderEmail != '') {
            cardButtonElement.innerHTML =  '<img src="./public/img/waitSpinner.gif" alt="" />';
            cardButtonElement.disabled = true;

            stripe.createToken(card)
                .then(result => {
                    
                    if (result.error) {
                        displayPaymentError.innerText = result.error.message;
                    } else {
                        fetch('/server/charge.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify([cardHolderName, cardHolderEmail, result.token.id]),
                        })
                        .then (response => response.json())
                        .then (data => {
                            if (data === 'succeeded') {
                                cardButtonElement.innerText =  'Valider le paiement';
                                displayPaymentError.innerText = "Merci de votre paiement. Re-dirigé dans 3s.";
                                setTimeout(() => {
                                    location.reload();
                                }, 3000)
                            }else{
                                displayPaymentError.innerText = data;
                            }
                        })
                    }
                })
        } else {
            displayCardError.innerText = "Merci de remplir le nom et/ou l'email du titulaire de la carte";
        }
        
    }
}




















/*
{token: {…}}
    token: 
        card: {id: 'card_1MbNiRC2Rf9cR96cBH6PBXVB', object: 'card', address_city: null, address_country: null, address_line1: null, …}
        client_ip: "176.128.201.2"
        created: 1676378075
        id: "tok_1MbNiRC2Rf9cR96c9uRy0pOA"
        livemode: false
        object: "token"
        type: "card"
        used: false
        [[Prototype]]:Object
    [[Prototype]]: Object

*/