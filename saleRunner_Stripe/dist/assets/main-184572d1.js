(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();function f(t,a,r,i){const e={layout:"tabs"},n=t.create("payment",e);n.mount("#card"),n.addEventListener("change",o=>{o.error?(r.innerText=o.error.message,a.disabled=!0):(r.innerHTML="&nbsp;",i.innerHTML="&nbsp;",a.innerHTML="Valider",a.disabled=!1)})}async function y(){return`
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
    `}function b(t){const a=/^[A-zÀ-ÿ]{1,}\s?([A-zÀ-ÿ]{1,}\'?\-?[A-zÀ-ÿ]{1,}\s?)+([A-zÀ-ÿ]{1,})?$/;let r=t.value.trim();const i=document.getElementById("name-error");r==""||r==null?(i.innerText="Merci de saisir votre nom et prénom.",localStorage.setItem("NameValidation",!1),s(t)):a.test(r)?(i.innerHTML="&nbsp;",localStorage.setItem("NameValidation",!0)):(i.innerText="Votre nom n'est pas correct.",localStorage.setItem("NameValidation",!1),s(t))}function v(t){const a=/^[A-z][A-z0-9_\.\-]{2,32}@([A-z0-9\.\-]{3,15})(\.[A-z]{2,8}){1,2}$/;let r=t.value.trim();const i=document.getElementById("email-error");r==""||r==null?(i.innerText="Merci de saisir votre email",localStorage.setItem("EmailValidation",!1),s(t)):a.test(r)?(i.innerHTML="&nbsp;",localStorage.setItem("EmailValidation",!0)):(i.innerText="Votre email n'est pas correct.",localStorage.setItem("EmailValidation",!1),s(t))}function s(t){t.classList.add("input-error-css")}function p(t,a,r){a.innerHTML="&nbsp;",t.innerHTML="&nbsp;",t.classList.remove("input-error-css"),r.innerHTML="&nbsp;"}const g={theme:"stripe"};let h=document.querySelector("#stripe-price"),S=+h.innerText;document.querySelector("#btn-payment").onclick=async()=>{document.querySelector("#btn-payment").disabled=!0,localStorage.setItem("NameValidation",!1),localStorage.setItem("EmailValidation",!1),await fetch("./server/createPaymentIntent.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(S)}).then(t=>t.json()).then(async t=>{if(t.error)document.querySelector("#stripe-payment").innerHTML="<h3> Erreur 404 ! Page en maintenance </h3> <p>Page actualisée dans 3s</p>",setTimeout(()=>location.reload(),3e3);else{const a=t[0];document.querySelector("#payment-section").innerHTML=await y();let r=document.querySelector("#card-holder-email");r.addEventListener("blur",()=>v(r)),r.onfocus=()=>p(r,e,document.getElementById("email-error"));let i=document.querySelector("#card-holder-name");i.addEventListener("blur",()=>b(i)),i.onfocus=()=>p(i,e,document.getElementById("name-error"));const e=document.querySelector("#card_errors"),n=document.querySelector("#errors"),o=document.querySelector("#btn-payment-validate");o.disabled=!0,document.querySelector("#btn-payment-cancel").onclick=()=>location.reload();const d=Stripe(t[1]),c=d.elements({clientSecret:a,appearance:g});f(c,o,e,n),o.onclick=()=>{e.innerHTML="&nbsp;";let m=r.value.trim(),u=i.value.trim();localStorage.getItem("NameValidation")==="true"&&localStorage.getItem("EmailValidation")==="true"?(o.innerHTML='<img src="./public/img/waitSpinner.gif" alt="wait payment spinner" />',o.disabled=!0,d.confirmPayment({elements:c,confirmParams:{receipt_email:"sebastien@sitedigital.fr",payment_method_data:{billing_details:{name:u,email:m}}},redirect:"if_required"}).then(async l=>{l.error?l.error.type==="card_error"||l.error.type==="validation_error"?n.innerText=l.error.message:n.innerText="Une erreur inattendue s'est produite !":(await fetch("/server/updateCustomer.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify([u,m,l.paymentIntent.id])}),n.innerHTML="Merci de votre paiement. <br /> La page sera actualisée dans 3s.",o.innerHTML="Valider",setTimeout(()=>location.reload(),3e3))})):e.innerText="Merci de bien remplir votre nom et/ou email"}}})};
