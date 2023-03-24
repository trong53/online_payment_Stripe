export default async function CheckoutPage() {
    
    return (`
        <div id="stripe-payment">

            <h2 class="heading-secondary" id="heading-stripe">Payer par carte</h2>

            <div id="payment">
                <div class="input-section">
                    <label for="card-holder-email"> Email </label>
                    <input type="email" class="input-field" id="card-holder-email" name="email" placeholder="your-email@exemple.fr ..." required />
                    <div id="email-error" class="input-error">&nbsp;</div>
                </div>
                
                <div class="input-section">
                    <label for="card-holder-name"> Nom du titulaire de la carte </label>
                    <input type="text" class="input-field" id="card-holder-name" name="cardName" placeholder="Alain Smith ..." required />
                    <div id="name-error" class="input-error">&nbsp;</div>
                </div>

                <div id="card-container">
                    <label for="card"> Informations de la carte </label>
                    <div id="card-element">
                        <div id="card"></div>
                    </div>
                    
                </div>
            </div>

            <div id="card_errors">&nbsp;</div>

            <div id="commands">
                <button type="button" id="btn-payment-validate">Valider</button>
                <button type="button" id="btn-payment-cancel">Annuler</button>
            </div>

            <div id="errors">&nbsp;</div>

        </div>
    `)
};



