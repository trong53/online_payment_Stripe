export default async function CheckoutPage() {
    return (`
        <h2> Formation de GitLab - Runner [<span> 15 euro </span>]
        </h2>

        <div id="card-payment">

            <label for="email">
                <input type="email" id="email" name="email" placeholder="Youremail@exemple.fr ..." required />
            </label>

            <label for="cardName">
                <input type="text" id="cardName" name="cardName" placeholder="Nom du titulaire de la carte ..." required />
            </label>

            <div id="card-container">
                <div id="card"></div>
            </div>

        </div>
       

        <div id="card_errors">&nbsp;</div>

        <div id="commands">
            <button type="button" id="btn-payment-validate">Valider le paiement</button>
            <button type="button" id="btn-payment-cancel">Annuler</button>
        </div>

        <div id="errors">&nbsp;</div>
    `)
};



