<?php

namespace Repository;

use DB\MySQL;

class TasksRepository
{

    /**
     * @var object|MySQL
     */
    private object $MySQL;
    public const TABELA = "Tasks";

    /**
     * FuncionarioRepository constructor
     */

    public function __construct()
    {
        $this->MySQL = new MySQL();
    }

    /**
     * @param $task
     * @param $description
     * @param $finished
     * @return int
     */

    public function insertTask($task, $description)
    {
        $consultaInsert = 'INSERT INTO ' . self::TABELA . ' (task, description) VALUES (:task, :description)';
        $this->MySQL->getDb()->beginTransaction();
        $stmt = $this->MySQL->getDb()->prepare($consultaInsert);
        $stmt->bindParam(':task', $task);
        $stmt->bindParam(':description', $description);
        $stmt->execute();
        return $stmt->rowCount();
    }

    /**
     * @param $id
     * @param $dados
     * @return int
     */

    public function updateTask($id, $dados)
    {
        $consultaUpdate = 'UPDATE ' . self::TABELA . ' SET task = :task, description = :description, finished = :finished WHERE id =:id';
        $this->MySQL->getDb()->beginTransaction();
        $stmt = $this->MySQL->getDb()->prepare($consultaUpdate);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':task', $dados['task']);
        $stmt->bindParam(':description', $dados['description']);
        $stmt->bindParam(':finished', $dados['finished']);
        $stmt->execute();
        return $stmt->rowCount();
    }

    /**
     * @return MySQL|object
     */

    public function getMySQL()
    {
        return $this->MySQL;
    }
}