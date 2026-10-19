<?php
/**
 * Receptor del formulario de contacto (opcional) para hostings con PHP.
 *
 * Configuración por variables de entorno (nunca en el repositorio):
 *   CE_CONTACTO_EMAIL    Correo que recibe las consultas (modo "correo").
 *   CE_CONTACTO_MODO     "correo" (por defecto) o "archivo" (guarda JSONL; útil para pruebas o integraciones).
 *   CE_CONTACTO_ARCHIVO  Ruta del JSONL fuera de la carpeta pública (modo "archivo").
 *   CE_ORIGENES          Orígenes permitidos separados por coma (p. ej. https://www.camaracomercioexterior.org).
 *
 * En el sitio: PUBLIC_FORM_ENDPOINT=https://<dominio>/api/contacto.php y volver a compilar.
 * Ver docs/formularios.md.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function responder(int $codigo, array $cuerpo): never {
    http_response_code($codigo);
    echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE);
    exit;
}

// CORS: solo orígenes configurados
$origenes = array_filter(array_map('trim', explode(',', getenv('CE_ORIGENES') ?: '')));
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen !== '') {
    if (!in_array($origen, $origenes, true)) responder(403, ['ok' => false, 'error' => 'origen_no_permitido']);
    header("Access-Control-Allow-Origin: $origen");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') responder(204, []);
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') responder(405, ['ok' => false, 'error' => 'metodo_no_permitido']);

// Límite de tamaño y frecuencia (5 envíos cada 10 minutos por IP)
$crudo = file_get_contents('php://input', false, null, 0, 16384) ?: '';
$datos = json_decode($crudo, true);
if (!is_array($datos)) responder(400, ['ok' => false, 'error' => 'json_invalido']);

$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconocida';
$marca = sys_get_temp_dir() . '/ce_rl_' . hash('sha256', $ip);
$ahora = time();
$registros = array_filter(json_decode(@file_get_contents($marca) ?: '[]', true) ?: [], fn($t) => $t > $ahora - 600);
if (count($registros) >= 5) responder(429, ['ok' => false, 'error' => 'demasiados_envios']);
$registros[] = $ahora;
@file_put_contents($marca, json_encode(array_values($registros)), LOCK_EX);

// Campo trampa: los bots lo completan. Se responde OK sin procesar.
if (trim((string)($datos['web'] ?? '')) !== '') responder(200, ['ok' => true]);

$limpiar = fn($v, int $max) => mb_substr(trim(preg_replace('/[\x00-\x1F\x7F]/u', ' ', (string)$v)), 0, $max);
$c = [
    'modo'          => in_array($datos['modo'] ?? '', ['persona', 'empresa'], true) ? $datos['modo'] : 'persona',
    'nombre'        => $limpiar($datos['nombre'] ?? '', 80),
    'correo'        => $limpiar($datos['correo'] ?? '', 120),
    'telefono'      => $limpiar($datos['telefono'] ?? '', 20),
    'pais'          => $limpiar($datos['pais'] ?? '', 40),
    'interes'       => $limpiar($datos['interes'] ?? '', 120),
    'empresa'       => $limpiar($datos['empresa'] ?? '', 120),
    'colaboradores' => $limpiar($datos['colaboradores'] ?? '', 40),
    'mensaje'       => mb_substr(trim((string)($datos['mensaje'] ?? '')), 0, 1000),
    'origen'        => $limpiar($datos['origen'] ?? '', 200),
];

$errores = [];
if (mb_strlen($c['nombre']) < 3) $errores['nombre'] = 'requerido';
if (!filter_var($c['correo'], FILTER_VALIDATE_EMAIL)) $errores['correo'] = 'invalido';
if (strlen(preg_replace('/\D/', '', $c['telefono'])) < 7) $errores['telefono'] = 'invalido';
if (($datos['acepto'] ?? '') !== 'on') $errores['acepto'] = 'requerido';
if ($c['modo'] === 'empresa') {
    if (mb_strlen($c['empresa']) < 2) $errores['empresa'] = 'requerido';
    if ($c['colaboradores'] === '') $errores['colaboradores'] = 'requerido';
} elseif ($c['interes'] === '') {
    $errores['interes'] = 'requerido';
}
if ($errores) responder(422, ['ok' => false, 'error' => 'validacion', 'campos' => $errores]);

$c['fecha'] = gmdate('c');
$modo = getenv('CE_CONTACTO_MODO') ?: 'correo';

if ($modo === 'archivo') {
    $archivo = getenv('CE_CONTACTO_ARCHIVO');
    if (!$archivo || @file_put_contents($archivo, json_encode($c, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) === false) {
        responder(500, ['ok' => false, 'error' => 'no_se_pudo_guardar']);
    }
    responder(200, ['ok' => true]);
}

$destino = getenv('CE_CONTACTO_EMAIL');
if (!$destino || !filter_var($destino, FILTER_VALIDATE_EMAIL)) responder(500, ['ok' => false, 'error' => 'destino_no_configurado']);

$asunto = '=?UTF-8?B?' . base64_encode(($c['modo'] === 'empresa' ? 'Empresa: ' : 'Consulta: ') . $c['nombre']) . '?=';
$cuerpo = '';
foreach ($c as $k => $v) if ($v !== '') $cuerpo .= ucfirst($k) . ': ' . $v . "\n";
$cabeceras = "Content-Type: text/plain; charset=UTF-8\r\nReply-To: " . $c['correo'];

if (!@mail($destino, $asunto, $cuerpo, $cabeceras)) responder(502, ['ok' => false, 'error' => 'no_se_pudo_enviar']);
responder(200, ['ok' => true]);
