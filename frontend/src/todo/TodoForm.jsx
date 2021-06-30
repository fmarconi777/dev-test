import React from 'react';
import { Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TodoForm(props) {
  const classes = useStyles();

  return (
    <Container >
      {
        props.tipo &&
        <div className={props.tipo === true ? "error" : ""} >
          <p>{props.error}</p>
        </div>
      }
      <form onSubmit={props.submitForm} className={classes.root} noValidate autoComplete="off" >
        <div>
          <TextField required id="standard-required" label="Tarefa" value={props.task} onChange={props.onChangeValue} name="task" />
          <TextField required id="standard-multiline-static" label="Descrição" multiline value={props.description} onChange={props.onChangeValue} name="description" rows={5} cols={20} />
          <button className="Cadastrar" type="submit" >Cadastrar</button>
        </div>
      </form>
    </Container>
  );
}