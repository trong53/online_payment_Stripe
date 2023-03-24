import 'vite/modulepreload-polyfill';
import HandlePaymentElement from './HandlePaymentElement';
import CheckoutPage from './CheckoutPage';
import { NameInputHandle, EmailInputHandle, HandleInputOnFocus } from './CheckInputValue';

const appearance = {
    theme: 'stripe'                  
};

let amountElement = document.querySelector('#stripe-price');
let amount = +(amountElement.innerText);

document.querySelector('#btn-payment').onclick = async () => {

    document.querySelector('#btn-payment').disabled = true;
    localStorage.setItem('NameValidation', false);
    localStorage.setItem('EmailValidation', false);

    await fetch('./server/createPaymentIntent.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(amount),
    })
        .then(response => response.json())
        .then(async (data) => {
            
            if (data['error']) {
                document.querySelector('#stripe-payment').innerHTML = '<h3> Erreur 404 ! Page en maintenance </h3> <p>Page actualisée dans 3s</p>';
                setTimeout(() => location.reload(), 3000);
                
            } else {
                const clientSecret = data[0];

                document.querySelector('#payment-section').innerHTML = await CheckoutPage() ;

                let emailElement = document.querySelector('#card-holder-email');
                emailElement.addEventListener('blur', () => EmailInputHandle(emailElement));
                emailElement.onfocus = () => HandleInputOnFocus(emailElement, displayCardError, document.getElementById('email-error'));

                let cardNameElement = document.querySelector('#card-holder-name');
                cardNameElement.addEventListener('blur', () => NameInputHandle(cardNameElement));  
                cardNameElement.onfocus = () => HandleInputOnFocus(cardNameElement, displayCardError, document.getElementById('name-error'));

                const displayCardError = document.querySelector('#card_errors');
                const displayPaymentError = document.querySelector('#errors');
                const cardButtonElement = document.querySelector('#btn-payment-validate');
                cardButtonElement.disabled = true;

                document.querySelector('#btn-payment-cancel').onclick = () => location.reload();
                
                const stripe = Stripe(data[1]);                                  
                const elements = stripe.elements({clientSecret, appearance});                             // Create an elements group from the Stripe instance

                HandlePaymentElement(elements, cardButtonElement, displayCardError, displayPaymentError);
    
                cardButtonElement.onclick = () => {
                    displayCardError.innerHTML = '&nbsp;';
                    let cardHolderEmail = (emailElement.value).trim();
                    let cardHolderName = (cardNameElement.value).trim();
                    
                    if (localStorage.getItem('NameValidation') === 'true' && localStorage.getItem('EmailValidation') === 'true') {

                        cardButtonElement.innerHTML =  '<img src="./public/img/waitSpinner.gif" alt="wait payment spinner" />';
                        cardButtonElement.disabled = true;

                        stripe.confirmPayment({       
                            elements,
                            confirmParams: {
                                receipt_email: 'sebastien@sitedigital.fr',
                                payment_method_data: {
                                    billing_details: {
                                        name: cardHolderName,
                                        email: cardHolderEmail
                                    }
                                }
                            },
                            redirect: "if_required"
                        })
                            .then(async (result) => {
                                // console.log(result)
                                if (result.error) {
                                    if (result.error.type === "card_error" || result.error.type === "validation_error") {
                                        displayPaymentError.innerText= result.error.message;
                                    } else {
                                        displayPaymentError.innerText= "Une erreur inattendue s'est produite !";
                                    }

                                } else {
                                    await fetch('/server/updateCustomer.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify([
                                            cardHolderName,
                                            cardHolderEmail,
                                            result.paymentIntent.id                                                                                            
                                        ])
                                    });

                                    displayPaymentError.innerHTML = "Merci de votre paiement. <br /> La page sera actualisée dans 3s.";
                                    cardButtonElement.innerHTML =  'Valider';
                                    setTimeout(() => location.reload(), 3000);
                                }
                            })
                    } else {
                        displayCardError.innerText = "Merci de bien remplir votre nom et/ou email";
                    }
                }
            }
        })
}



















/*
    // Create Element instances
    const linkAuthenticationElement = elements.create("linkAuthentication");
    // Passing in defaultValues is optional, but useful if you want to prefill consumer information to
    // ease consumer experience.
    
    const paymentElement = elements.create('payment', {
        defaultValues: {
            billingDetails: {
            name: 'John Doe',
            phone: '888-888-8888',
            address: {
                postal_code: '10001',
                country: 'US',
            },
            },
        },
    });

    https://stripe.com/docs/payments/link/save-and-reuse?platform=web&client=html&link-integration-type=at-payment
    const addressElement = elements.create("address", {
        mode: 'shipping',
        defaultValues: {
            name: 'Jane Doe',
            address: {
                line1: '354 Oyster Point Blvd',
                line2: '',
                city: 'South San Francisco',
                state: 'CA',
                postal_code: '94080',
                country: 'US',
            }
        }
    });

*/

/*
https://stripe.com/docs/payments/quickstart

Utilisez Stripe.js pour rester en conformité avec la norme PCI 
en veillant à ce que les informations de paiement soient envoyées directement à Stripe sans passer sur votre serveur. 
Chargez toujours Stripe.js directement à partir de js.stripe.com pour maintenir votre conformité. 
Vous ne devez pas inclure le script dans un lot ni en héberger de copie.

Initialiser Stripe Elements :
Initialisez la bibliothèque de l’interface utilisateur de Stripe Elements avec la clé secrète du client. 
Elements gère les composants d’interface dont vous avez besoin pour recueillir les informations de paiement.
*/

