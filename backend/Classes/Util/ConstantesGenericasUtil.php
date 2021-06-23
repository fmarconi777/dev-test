<?php

namespace Util;

abstract class ConstantesGenericasUtil {

    /* ERROS */
    public const MSG_ERRO_TIPO_METODO = 'Método não permitido!';
    public const MSG_ERRO_RECURSO_INEXISTENTE = 'Recurso inexistente!';
    public const MSG_ERRO_GENERICO = 'Algum erro ocorreu na requisição!';
    public const MSG_ERRO_SEM_RETORNO = 'Nenhum registro encontrado!';
    public const MSG_ERRO_NAO_AFETADO = 'Nenhum registro afetado!';
    public const MSG_ERR0_JSON_VAZIO = 'O Corpo da requisição não pode ser vazio!';

    /* SUCESSO */
    public const MSG_DELETADO_SUCESSO = 'Registro deletado com Sucesso!';
    public const MSG_ATUALIZADO_SUCESSO = 'Registro atualizado com Sucesso!';

    /* RECURSO USUARIOS */
    public const MSG_ERRO_ID_OBRIGATORIO = 'ID é obrigatório!';
    public const MSG_ERRO_CADASTRO_COMPLETO_OBRIGATORIO = 'Todos os campos são obrigatórios!';

    /* RETORNO JSON */
    const TIPO_SUCESSO = 'sucesso';
    const TIPO_ERRO = 'erro';

    /* OUTRAS */
    public const TIPO = 'tipo';
    public const RESPOSTA = 'resposta';
}