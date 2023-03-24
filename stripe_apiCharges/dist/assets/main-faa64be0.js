(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function s(){return`
        <h3> Formation de GitLab - Runner : 
            <span> 15 euro </span>
        </h3>

        <div id="card-payment">
            <label for="cardName">
                <input type="text" id="cardName" name="cardName" placeholder="Nom du titulaire de la carte ..." />
            </label>
        
            <div id="card"></div> 
        </div>
       

        <div id="card_errors"></div>

        <input type="button" id="btn-payment-validate" value="Valider le paiement" />

        <div id="errors"></div>
    `}const u={pk_key:"pk_test_51MZuZkC2Rf9cR96cF1BkcIsxbtU8ERWMoV1R8th5IF2yea2i8TqPDE3RnjRlvLw3yhWF58aBTUi5RtxMpjdzOnFQ007QvbcqlP"};console.log("trong");window.onload=()=>{const l=document.querySelector("#btn-payment");l.onclick=async()=>{document.querySelector("#formation").innerHTML=await s(),await fetch("/payment.php").then(r=>r.json()).then(r=>{let i=r.code,n=Stripe(u.pk_key);console.log(n);var e=n.elements(),t=e.create("card");t.mount("#card"),t.addEventListener("change",a=>{let c=document.querySelector("#card_errors");a.error?c.innerText=a.error.message:c.innerText=""});let o=document.querySelector("#btn-payment-validate"),d=document.querySelector("#cardName");o.onclick=()=>{n.handleCardPayment(i,t,{payment_method_data:{billing_details:{name:d.value,address:{city:"Paris",country:"Fr",line1:"1234 Fake Street",line2:null,postal_code:"94102",state:"CA"},email:"jenny@example.com",phone:"+15555555555"}}}).then(a=>{a.error?document.querySelector("#errors").innerText=a.error.message:(document.querySelector("#errors").innerText="Thank you for your payment.",setTimeout(()=>{location.reload()},3e3))})}})}};
