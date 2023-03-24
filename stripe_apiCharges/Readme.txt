

0/ Git clone le projet

1/ Venir au dossier du projet, puis lancer le composer pour récupérer les dépendances : composer update     
            (Vous devez avoir le logiciel Composer sur votre ordinateur)

2/ Installer Stripe : composer require stripe/stripe-php

3/ Initialiser npm : npm init         (Vous devez avoir le logiciel Nodejs sur votre ordinateur)

4/ Installer le package Vite (gérer le fonctionnement du javascript de la partie FrontEnd): npm i vite

5/ Créer le fichier vite.config.js à la racine du dossier du projet (ce fichier est important pour la production de Vite) :

            import { defineConfig } from "vite"
            export default defineConfig({
              build: {
                // generate manifest.json in outDir
                manifest: true,
                rollupOptions: {
                  // overwrite default .html entry
                  input: './assets/js/main.js'
                }
              }
            })

6/ Lancer Vite pour que votre javascript soit pris en compte :  npm run dev 
Et laisser le Terminal ouvert (car si vous fermez votre terminal, Vite ne fonctionne plus et Javascript non plus)

7/ Modifier les paramètres de votre compte Stripe :  config.php

8/ Lancer votre site web : index.php






pk_test_51MZuZkC2Rf9cR96cF1BkcIsxbtU8ERWMoV1R8th5IF2yea2i8TqPDE3RnjRlvLw3yhWF58aBTUi5RtxMpjdzOnFQ007QvbcqlP

sk_test_51MZuZkC2Rf9cR96cKKcnKld79Bm3PdSpLqt4Llc48qaUe3zlqJp7h6hPnRVLuJryryGu4QTT4dphk43tU3rmanmO00HebLiqyb


