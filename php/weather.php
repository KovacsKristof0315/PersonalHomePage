<?php
require_once 'config.php';

$limit_minutes = 0.5;
// $limit_seconds = $limit_minutes * 60;
$limit_seconds = $limit_minutes * 60;

$ip = $_SERVER['REMOTE_ADDR'];
$log_file = 'ip_log.json';

$log = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];

$now = time();

// ha az IP már szerepel, ellenőrizzük, hogy letelt-e az idő
if (isset($log[$ip])) {
    $last_request = $log[$ip];
    $elapsed = $now - $last_request;

    if ($elapsed < $limit_seconds) {
        $remaining = $limit_seconds - $elapsed;
        http_response_code(429);
        echo json_encode([
            "error" => "Túl sok kérés. Próbáld újra $remaining másodperc múlva."
        ]);
        exit;
    }
}

$log[$ip] = $now;
file_put_contents($log_file, json_encode($log));

$city = $_GET['city'];
$url = "http://api.weatherapi.com/v1/forecast.json?key=$apiKey&q=$city&days=3&aqi=yes";

// proxy kérés
$response = file_get_contents($url);

header("Content-Type: application/json");
echo $response;