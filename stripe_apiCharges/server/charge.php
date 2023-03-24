<?php
require_once '../vendor/autoload.php';
require_once '../config.php';

try {
  $token = json_decode(file_get_contents('php://input', true));

  $stripe = new \Stripe\StripeClient(STRIPE_CONFIG['secret_key']);                    // \Stripe\Stripe::setApiKey($stripe_config['secret_key']);

  // Create the customer in Stripe
  $customer = $stripe->customers->create([                                             // $customer = \Stripe\Customer::create([
    'name'          => $token[0],
    'email'         => $token[1],
    'source'        => $token[2],
  ]);

  // Charge the customer
  $charge = $stripe->charges->create([                                                 // $charge = \Stripe\Charge::create([
    'amount'        => 1500,
    'currency'      => 'eur',
    'description'   => 'Acheter le guide Gitlab Runner',
    'customer'      => $customer->id
  ]);

  echo json_encode($charge->status);
   
} catch(\Stripe\Exception\CardException $e ) {
  echo json_encode($e->getError()->message);

} catch (\Stripe\Exception\AuthenticationException $e) {
  echo json_encode("Authentication with Stripe's API failed");         

} catch (\Stripe\Exception\ApiConnectionException $e) {
  echo json_encode("Network communication with Stripe failed");
}




















/*
https://stripe.com/docs/api/charges/search?event_types-payment_intent.payment_failed=&lang=php


Avant, le code était :

 \Stripe\Stripe::setApiKey('sk_....');

 $customer = \Stripe\Customer::create([
    'email'     => 'youremail@yahoo.fr',
    'source'    => $token
 ]);

 $charge = \Stripe\Charge::create([
    'amount'        => 1500,
    'currency'      => 'eur',
    'description'   => 'Acheter le guide Gitlab Runner',
    'customer'      => $customer->id
 ])


https://stripe.com/docs/api/errors/handling?event_types-payment_intent.payment_failed=&lang=php
try {
  // Use Stripe's library to make requests...
} catch(\Stripe\Exception\CardException $e) {
  // Since it's a decline, \Stripe\Exception\CardException will be caught
  echo 'Status is:' . $e->getHttpStatus() . '\n';
  echo 'Type is:' . $e->getError()->type . '\n';
  echo 'Code is:' . $e->getError()->code . '\n';
  // param is '' in this case
  echo 'Param is:' . $e->getError()->param . '\n';
  echo 'Message is:' . $e->getError()->message . '\n';
} catch (\Stripe\Exception\RateLimitException $e) {
  // Too many requests made to the API too quickly
} catch (\Stripe\Exception\InvalidRequestException $e) {
  // Invalid parameters were supplied to Stripe's API
} catch (\Stripe\Exception\AuthenticationException $e) {
  // Authentication with Stripe's API failed
  // (maybe you changed API keys recently)
} catch (\Stripe\Exception\ApiConnectionException $e) {
  // Network communication with Stripe failed
} catch (\Stripe\Exception\ApiErrorException $e) {
  // Display a very generic error to the user, and maybe send
  // yourself an email
} catch (Exception $e) {
  // Something else happened, completely unrelated to Stripe


*/
