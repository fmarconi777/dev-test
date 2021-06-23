<?php

namespace Service;

use InvalidArgumentException;
use Repository\TasksRepository;
use Util\ConstantesGenericasUtil;

class TasksService{

    public const TABELA = 'Tasks';
    public const ORDEM = 'created_at';
    public const RECURSOS_GET = ['listar'];
    public const RECURSOS_DELETE = ['deletar'];
    public const RECURSOS_POST = ['cadastrar'];
    public const RECURSOS_PUT = ['atualizar', 'finalizar'];

    private array $dados;
    private array $dadsoCorpoRequest = [];
    private object $TasksRepository;

    /**
     * TasksService constructor
     * @param array $dados
     */

    public function __construct($dados = [])
    {
        $this->dados = $dados;
        $this->TasksRepository = new TasksRepository;
    }

    public function setDadosCorpoRequest($dadosRequest)
    {
        $this->dadsoCorpoRequest = $dadosRequest;
    }

    public function validarGet()
    {

        $retorno = null;
        $recurso = $this->dados['recurso'];

        if (in_array($recurso, self::RECURSOS_GET, true)) {
            $retorno = $this->dados['id'] > 0 ? $this->getOneByKey() : $this->$recurso();
        } else {
            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_RECURSO_INEXISTENTE);
        }

        $this->validarRetornoRequest($retorno);
        
        return $retorno;
    }

    public function validarDelete()
    {
        $retorno = null;
        $recurso = $this->dados['recurso'];

        if (in_array($recurso, self::RECURSOS_DELETE, true)) {
            if ($this->dados['id'] > 0) {
                $retorno = $this->$recurso();
            } else {
                throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_ID_OBRIGATORIO);
            }
        } else {
            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_RECURSO_INEXISTENTE);
        }

        $this->validarRetornoRequest($retorno);

        return $retorno;
    }

    public function validarPost()
    {
        $retorno = null;
        $recurso = $this->dados['recurso'];

        if (in_array($recurso, self::RECURSOS_POST, true)) {
            $retorno = $this->$recurso();
        } else {
            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_RECURSO_INEXISTENTE);
        }

        $this->validarRetornoRequest($retorno);

        return $retorno;
    }
    public function validarPut()
    {
        $retorno = null;
        $recurso = $this->dados['recurso'];

        if (in_array($recurso, self::RECURSOS_PUT, true)) {
            if ($this->dados['id'] > 0) {
                $retorno = $this->$recurso();
            } else {
                throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_ID_OBRIGATORIO);
            }
        } else {
            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_RECURSO_INEXISTENTE);
        }

        $this->validarRetornoRequest($retorno);

        return $retorno;
    }

    private function validarRetornoRequest($retorno): void
    {
        if ($retorno === null) {
            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_GENERICO);
        }
    }

    private function getOneByKey()
    {
        return $this->TasksRepository->getMySQL()->getOneByKey(self::TABELA, $this->dados['id']);
    }

    private function listar()
    {
        return $this->TasksRepository->getMySQL()->getAll(self::TABELA, self::ORDEM);
    }

    private function deletar()
    {
        return $this->TasksRepository->getMySQL()->delete(self::TABELA, $this->dados['id']);
    }

    private function cadastrar()
    {
        [$task, $description] = [
            $this->dadsoCorpoRequest['task'], $this->dadsoCorpoRequest['description']
        ];
        if ($task && $description) {
            if ($this->TasksRepository->insertTask($task, $description) > 0) {   
                $idInserido = $this->TasksRepository->getMySQL()->getDb()->lastInsertId();
                $this->TasksRepository->getMySQL()->getDb()->commit();
                return ['id_inserido' => $idInserido];
            }
            $this->TasksRepository->getMySQL()->getDb()->rollBack();

            throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_GENERICO);
        }

        throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_CADASTRO_COMPLETO_OBRIGATORIO);
    }

    private function atualizar()
    {
        if ($this->TasksRepository->updateTask($this->dados['id'], $this->dadsoCorpoRequest) > 0) {
            $this->TasksRepository->getMySQL()->getDb()->commit();
            return ConstantesGenericasUtil::MSG_ATUALIZADO_SUCESSO;
        }
        $this->TasksRepository->getMySQL()->getDb()->rollBack();
        throw new InvalidArgumentException(ConstantesGenericasUtil::MSG_ERRO_NAO_AFETADO);
    }

    private function finalizar()
    {
        return $this->TasksRepository->getMySQL()->setFinished(self::TABELA, $this->dadsoCorpoRequest['finished'], $this->dados['id']);
    }

}