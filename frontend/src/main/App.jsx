import React from 'react';
import Todo from '../todo/Todo';
import Container from '@material-ui/core/Container';
import './App.css';
import Menu from '../template/Menu';

export default function App() {
  return (
    <Container>
      <Todo />
      <Menu/>
    </Container>
  );
}
