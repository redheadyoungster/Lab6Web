<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data !== null) {
    if (file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Дані успішно збережено']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Помилка запису файлу']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некоректні дані']);
}
?>