<?php
header('Content-Type: application/json');

// Забороняємо кешування браузером, щоб polling працював коректно
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if (file_exists('data.json')) {
    echo file_get_contents('data.json');
} else {
    echo json_encode([]);
}
?>