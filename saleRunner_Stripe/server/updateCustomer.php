<?php

require '../vendor/autoload.php';
require '../config.php';
require './validation.php';

try {
    $validation = true;

    $customer_infos = json_decode(file_get_contents('php://input', true));

    if (!is_array($customer_infos) || count($customer_infos) !== 3) die;

    $client_name = $customer_infos[0];
    $client_email = $customer_infos[1];
    $payment_id = $customer_infos[2];

    $validation = nameValidation($client_name) * emailValidation($client_email);

    session_start();
    $initial_payment_id = $_SESSION['payment_id'];
    $validation = ($payment_id === $initial_payment_id) ? ($validation * true) : false;
    
    if ($validation) {
        date_default_timezone_set('Europe/Paris');
        $date = date("d-m-Y H:i:s");
    
        $csv_file_path = '../paymentArchive/client_ebook.csv';
        $csv_file = fopen($csv_file_path, 'a');                 // open in write only mode (with pointer at the end of the file)
        fputcsv($csv_file, [$payment_id, $client_name, $client_email, $date]);
        fclose($csv_file);
        
        echo json_encode(['message' =>  "Le paiement a été enregistré"]);
        session_unset();
    } else {
        echo json_encode(['error'   =>  'Erreur 400']);
    }

} catch(Exception $e ) {
    echo json_encode(['error'   =>  $e->message]);
}

?>