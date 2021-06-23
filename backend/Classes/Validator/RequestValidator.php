<?php

namespace Validator;

use Util\JsonUtil;
use Service\TasksService;
use Util\ConstantesGenericasUtil;

class RequestValidator
{

    public $request;
    private array $dadosRequest = [];

    private const TIPO_REQUEST = ['GET', 'POST', 'DELETE', 'PUT'];
    private const GET = 'GET';
    private const DELETE = 'DELETE';

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function processarRequest()
    {
        $retorno = ConstantesGenericasUtil::MSG_ERRO_TIPO_METODO;

        if (in_array($this->request['metodo'], self::TIPO_REQUEST, true)) {
            $retorno = $this->direcinarRequest();
        }

        return $retorno;
    }

    public function direcinarRequest()
    {
        if ($this->request['metodo'] !== self::GET && $this->request['metodo'] !== self::DELETE) {
            $this->dadosRequest = JsonUtil::tratarCorpoRequisicaoJson();
        }

        $metodo = $this->request['metodo'];
        return $this->$metodo();
    }

    private function get()
    {
        $TasksService = new TasksService($this->request);
        $retorno = $TasksService->validarGet();
        return $retorno;
    }

    private function delete()
    {
        $TasksService = new TasksService($this->request);
        $retorno = $TasksService->validarDelete();
        return $retorno;
    }

    private function post()
    {
        $TasksService = new TasksService($this->request);
        $TasksService->setDadosCorpoRequest($this->dadosRequest);
        $retorno = $TasksService->validarPost();
        return $retorno;
    }

    private function put()
    {
        $TasksService = new TasksService($this->request);
        $TasksService->setDadosCorpoRequest($this->dadosRequest);
        $retorno = $TasksService->validarPut();
        return $retorno;
    }

}
