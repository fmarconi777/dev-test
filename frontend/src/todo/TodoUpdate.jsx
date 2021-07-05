import React, { useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import { history } from '../history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function TodoUpdate(props) {

    const id = props.id;

    const [open, setOpen] = React.useState(false);

    const [state, setState] = useState([]);
    const [tipo, setTipo] = useState(null);
    const [error, setError] = useState("");

    const getTasks = useCallback(function (id) {
        Axios.get(`http://localhost:8080/listar/${id}`).then(resposta => setState(resposta.data.resposta));
    }, []
    );

    useEffect((self: id) => {
        getTasks(id)
    }, [getTasks])

    const onChangeValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const atualizar = async () => {
        const resposta = await Axios.put("http://localhost:8080/atualizar", state);
        return resposta.data;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const resposta = await atualizar();
        if (resposta.tipo === "sucesso") {
            setTipo(false);
            setState([]);
            getTasks();
            history.push('/');
        } else {
            setTipo(true)
            setError(resposta.resposta)
        };
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Chip label="Editar" clickable color="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    {
                        props.tipo &&
                        <div className={tipo === true ? "error" : ""} >
                            <p>{error}</p>
                        </div>
                    }
                    <form onSubmit={submitForm} noValidate autoComplete="off" >
                        <TextField id="standard-required" label="Tarefa" value={state.task} onChange={onChangeValue} name="task" defaultValue={state.task} />
                        <TextField id="standard-multiline-static" label="Descrição" multiline value={state.description} onChange={onChangeValue} name="description" defaultValue={state.description} rows={5} cols={20} />
                        <FormControlLabel control={<Checkbox checked={state.finished} onChange={handleChange} name="finished" />} label="Finalizar" defaultChecked={state.finished} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" onClick={submitForm} >
                        Editar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};