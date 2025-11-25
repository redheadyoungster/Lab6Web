<?php
header('Content-Type: application/json');

// Отримуємо JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data !== null) {
    // Зберігаємо у файл data.json
    // Важливо: на хостингу файл data.json повинен мати права на запис (777 або 666)
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