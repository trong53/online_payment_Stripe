(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&o(t)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();function u(i,n,a,o){const e={layout:"tabs"},r=i.create("payment",e);r.mount("#card"),r.addEventListener("change",t=>{t.error?(a.innerText=t.error.message,n.disabled=!0):(a.innerHTML="&nbsp;",o.innerHTML="&nbsp;",n.innerHTML="Valider",n.disabled=!1)})}async function p(){return`
        <div id="stripe-payment">

            <h2 class="heading-secondary" id="heading-stripe">Payer par carte</h2>

            <div id="payment">
                <div class="input-field">
                    <label for="card-holder-email"> Email </label>
                    <input type="email" id="card-holder-email" name="email" placeholder="your-email@exemple.fr ..." required />
                </div>
                
                <div class="input-field">
                    <label for="card-holder-name"> Nom du titulaire de la carte </label>
                    <input type="text" id="card-holder-name" name="cardName" placeholder="Alain Smith ..." required />
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
    `}const y={theme:"stripe"};let f=document.querySelector("#stripe-price"),b=+f.innerText;document.querySelector("#btn-payment").onclick=async()=>{document.querySelector("#btn-payment").disabled=!0,await fetch("./server/createPaymentIntent.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then(i=>i.json()).then(async i=>{if(i.error)document.querySelector("#stripe-payment").innerHTML="<h3> Erreur 404 ! Page en maintenance </h3> <p>Page actualisée dans 3s</p>",setTimeout(()=>location.reload(),3e3);else{const n=i[0];document.querySelector("#payment-section").innerHTML=await p();const a=document.querySelector("#card-holder-email"),o=document.querySelector("#card-holder-name"),e=document.querySelector("#card_errors"),r=document.querySelector("#errors"),t=document.querySelector("#btn-payment-validate");t.disabled=!0,document.querySelector("#btn-payment-cancel").onclick=()=>location.reload();const s=Stripe(i[1]),m=s.elements({clientSecret:n,appearance:y});u(m,t,e,r),a.onfocus=()=>{e.innerHTML="&nbsp;"},o.onfocus=()=>{e.innerHTML="&nbsp;"},t.onclick=()=>{e.innerHTML="&nbsp;";let c=a.value,l=o.value;l!=""&&c!=""?(t.innerHTML='<img src="./public/img/waitSpinner.gif" alt="wait payment spinner" />',t.disabled=!0,s.confirmPayment({elements:m,confirmParams:{receipt_email:"sebastien@sitedigital.fr",payment_method_data:{billing_details:{name:l,email:c}}},redirect:"if_required"}).then(async d=>{console.log(d),d.error?d.error.type==="card_error"||d.error.type==="validation_error"?r.innerText=d.error.message:r.innerText="An unexpected error occurred.":(await fetch("/server/updateCustomer.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify([l,c,d.paymentIntent.id])}),r.innerText="Merci de votre paiement. Re-dirigé dans 3s.",t.innerHTML="Valider",setTimeout(()=>location.reload(),3e3))})):e.innerText="Merci de remplir le nom et/ou l'email du titulaire de la carte"}}})};
