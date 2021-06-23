<?php

use Validator\RequestValidator;
use Util\RecursosUtil;
use Util\JsonUtil;
use Util\ConstantesGenericasUtil;

require_once 'bootstrap.php';

try {
    $RequestValidator = new RequestValidator(RecursosUtil::getRecurso());
    $retorno = $RequestValidator->processarRequest();
    $JsonUtil = new JsonUtil();
    $JsonUtil->processarArrayParaRetornar($retorno);
} catch (Exception $exception) {
    if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] == APPS) {
        header('Content-Type: application/json, charset=UTF-8');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Origin: '.APPS);
        header('Access-Control-Allow-Headers: origin, content-type, accept');
    }
    echo json_encode([
        ConstantesGenericasUtil::TIPO => ConstantesGenericasUtil::TIPO_ERRO,
        ConstantesGenericasUtil::RESPOSTA => $exception->getMessage()
    ]);
    exit;
}
?>