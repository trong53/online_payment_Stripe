

0/ Git clone le projet

1/ Venir au dossier du projet, puis lancer le composer pour récupérer les dépendances : composer update     
            (Vous devez avoir le logiciel Composer sur votre ordinateur)

{ 2/ Installer Stripe : composer require stripe/stripe-php }

3/ Modifier les paramètres de votre compte Stripe :  config.php

4/ Pour ce projet, la partie Vite (javascript) de FrontEnd a été built (production), elle est prête pour l'utilisation.
Donc, vous juste lancez votre site web index.php

Note: les fichiers Javascript dans le dossier assets/js sont là comme la source code. 
Quand je fais la Production de Vite (npm run build), tous ces fichier js ont été compilés en un seul fichier d'éxecuation 
/dist/assets/main-bd25d221.js (qui assure la fonction de Stripe).
