import React, { useState, useCallback } from 'react';
import Axios from 'axios';
import { history } from '../history';
import { Container } from '@material-ui/core';
import TodoForm from './TodoForm';
import TodoTable from './TodoTable';

export default function Todo() {

    const initialState = {
        task: '',
        description: '',
        finished: ''
    };

    const [state, setState] = useState(initialState);
    const [table, setTable] = useState([])
    const [tipo, setTipo] = useState(null);
    const [error, setError] = useState("");

    const onChangeValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const cadastrar = async () => {
        const resposta = await Axios.post("http://localhost:8080/cadastrar", state);
        return resposta.data;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const resposta = await cadastrar();
        if (resposta.tipo === "sucesso") {
            setTipo(false);
            setState({ ...initialState });
            getTasks();
            history.push('/');
        } else {
            setTipo(true)
            setError(resposta.resposta)
        };
    };

    const getTasks = useCallback(function () {
        Axios.get("http://localhost:8080/listar").then(resposta => setTable(resposta.data.resposta));
    }, []
    );

    const deleteTask = useCallback(function (id) {
        Axios.delete(`http://localhost:8080/deletar/${id}`).then(resposta => getTasks());
    }, []
    );

    const finishTask = useCallback(function (id) {
        state.finished = 1;
        Axios.put(`http://localhost:8080/finalizar/${id}`, { finished: state.finished }).then(resposta => getTasks());
        state.finished = '';
    }, [state]
    );

    return (
        <Container>
            <TodoForm onChangeValue={onChangeValue}
                      task={state.task}
                      description={state.description}
                      submitForm={submitForm}
                      tipo={tipo}
                      error={error} />
            
            <TodoTable table={table}
                       getTasks={getTasks}
                       deleteTask={deleteTask} 
                       finishTask={finishTask} />
        </Container>
    )

}