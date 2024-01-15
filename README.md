## L’objectif du projet:
Sur le site web de l’agence, lors du paiement, les clients seront dirigés vers une page Checkout de Stripe avec la mise en page prédéfinie, et puis redirigés vers la page initiale après le paiement. Cette procédure est moins appréciée en termes de l’UX. L’objectif du projet est d’intégrer le paiement de Stripe dans la page de vente de l’agence. 

Pour pouvoir mettre en place l’API Stripe, l’API PaymentIntent de Stripe a été choisi, qui est à jour et permet la vérification de 3D Secure des paiements par carte bancaire alors que l’API Charges de Stripe ne la permet pas. Le Fetch API de Javascript a permis les requêtes HTTP entre le front-end et le back-end. Après le paiement, les informations nécessaires de la vente, telles que l’identification du paiement, le nom et l’émail du client, ont été enregistrées dans un fichier .csv qui sera servi pour envoyer la formation (en vidéos) au client. 

A la fin du stage, j’ai pu déployer mon travail en ligne : https://stage.abdigitalbusiness.fr/

## Site en ligne : https://stage.abdigitalbusiness.fr/   (user: creation , pass: creation)  

### Pour pouvoir mettre en place l’API Stripe, l’API PaymentIntent de Stripe a été choisi, qui est à jour et permet la vérification de 3D Secure des paiements par carte bancaire alors que l’API Charges de Stripe ne la permet pas

![cap6](https://user-images.githubusercontent.com/107623849/227533133-86694e38-a720-48c8-92ac-27302af7260e.jpg)

## Fenêtre de payement:
![1](https://github.com/trong53/online_payment_Stripe/assets/107623849/62df6c05-4641-4035-8dd3-f411f6d736a9)

## Click on 'Procéder au paiement':
![2](https://github.com/trong53/online_payment_Stripe/assets/107623849/872f00f5-3875-4285-ab3e-35f4cfdb060e)

## Après le paiement: (la vérification du numéro de la carte, du tuteur de la carte, de CVC, ... est en place)
![3](https://github.com/trong53/online_payment_Stripe/assets/107623849/ec739fd6-6ec5-4805-9cbc-0d1e47fad3c1)
## et le montant est enregistré dans le compte Stripe du vendeur.
