<?php

require '../vendor/autoload.php';
require '../config.php';

try {
    $stripe = new \Stripe\StripeClient(STRIPE_CONFIG['secret_key']);
    
    $amount = json_decode(file_get_contents('php://input', true));

    $payment_intent = $stripe->paymentIntents->create([    
        'amount'                    => $amount*100,
        'currency'                  => 'eur',
        // 'automatic_payment_methods' => [
        //     'enabled' => true,
        // ],
        'payment_method_types' => ['card'],
        'description' => 'client for Formation Gitlab Runner'
    ]);

    echo json_encode([$payment_intent->client_secret, STRIPE_CONFIG['public_key']]);
    
    session_start();
    $_SESSION['payment_id'] = $payment_intent->id;

} catch(\Stripe\Exception\CardException $e ) {
    echo json_encode(['error' =>    $e->getError()->message]);
 
} catch (\Stripe\Exception\AuthenticationException $e) {
    echo json_encode(['error' =>    "Authentication with Stripe's API failed"]);          

} catch (\Stripe\Exception\ApiConnectionException $e) {
    echo json_encode(['error' =>    "Network communication with Stripe failed"]);
}

?>