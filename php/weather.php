<?php
require_once 'config.php';

$daily_limit = 30;
$ip = $_SERVER['REMOTE_ADDR'];
$log_file = 'ip_log.json';

$log = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];

$today = date('Y-m-d');

if (!isset($log[$ip])) {
    $log[$ip] = [];
}

if (!isset($log[$ip]['date']) || $log[$ip]['date'] !== $today) {
    $log[$ip]['date'] = $today;
    $log[$ip]['count'] = 0;
}

if ($log[$ip]['count'] >= $daily_limit) {
    http_response_code(429);
    echo json_encode([
        "error" => "Elérted a napi lekérési limitet ($daily_limit kérés/nap)."
    ]);
    exit;
}

$log[$ip]['count']++;
file_put_contents($log_file, json_encode($log));


$city = $_GET['city'];
$url = "http://api.weatherapi.com/v1/forecast.json?key=$apiKey&q=$city&days=3&aqi=yes";
$response = file_get_contents($url);

header("Content-Type: application/json");
echo $response;
