<?php
require '../vendor/autoload.php';
require '../config.php';

try {
    $customer_infos = json_decode(file_get_contents('php://input', true));
    $client_name = $customer_infos[0];
    $client_email = $customer_infos[1];
    $payment_id = $customer_infos[2];

    date_default_timezone_set('Europe/Paris');
    $date = date("d-m-Y H:i:s");

    $csv_file_path = '../paymentArchive/client_ebook.csv';
    $csv_file = fopen($csv_file_path, 'a');                 // open in write only mode (with pointer at the end of the file)
    fputcsv($csv_file, [$payment_id, $client_name, $client_email, $date]);
    fclose($csv_file);

    echo json_encode("Payment a été enregistré");

} catch(Exception $e ) {
    echo json_encode($e->message);
}