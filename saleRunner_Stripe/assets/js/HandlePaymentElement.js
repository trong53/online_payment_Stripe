
export default function HandlePaymentElement(elements, cardButtonElement, displayCardError, displayPaymentError) 
{
    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create('payment', paymentElementOptions);                                  //  elements.create('card');
    paymentElement.mount('#card');

    paymentElement.addEventListener('change', (event) => {
        if (event.error) {
            displayCardError.innerText = event.error.message;
            cardButtonElement.disabled = true;
            
        } else {
            displayCardError.innerHTML = '&nbsp;';
            displayPaymentError.innerHTML = '&nbsp;';
            cardButtonElement.innerHTML = 'Valider';
            cardButtonElement.disabled = false;
        }
    });
}