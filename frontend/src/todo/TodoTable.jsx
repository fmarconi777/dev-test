import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TodoTableHead from './TodoTableHead';
import TodoUpdate from './TodoUpdate';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, Box, Tooltip, Chip, IconButton, Checkbox, Paper, Typography, Toolbar, TableRow, TableContainer, TablePagination } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        background: '#64b5f6',
        borderRadius: 15
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                borderRadius: 15
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
                borderRadius: 15
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { handleDelete } = props;
    const { handleDone } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selecionado
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    My TODO List
                </Typography>
            )}

            {numSelected > 0 ? (
                <Box display="flex">
                    <Tooltip title="Deletar">
                        <IconButton aria-label="delete" onClick={() => handleDelete()} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Finalizar">
                        <IconButton aria-label="done" onClick={() => handleDone()} >
                            <DoneAllIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : (
                <div></div>

            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        borderRadius: 15
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    isDone: {
        background: theme.done.main
    },
    open: {
        background: theme.done.light
    },
}));



function TodoTable(props) {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const getTasks = props.getTasks;
    const deleteTask = props.deleteTask;

    const handleDelete = () => {
        selected.map((n) => deleteTask(n));
        setSelected([]);
    };

    const handleDone = () => {
        selected.forEach((n) => {
            props.finishTask(n);
        });
        setSelected([]);
    };

    useEffect(() => {
        getTasks()
    }, [getTasks])

    const renderRows = () => {
        const list = Array.isArray(props.table) ? props.table : [];
        return list.map(table => (
            {
                id: table.id,
                task: table.task,
                description: table.description,
                finished: table.finished,
                created: table.created_at
            }
        ))
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = renderRows().map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const isDone = (done) => {
        if (done === '1') {
            return (
                <Chip
                    className={classes.isDone}
                    label="Finalizado"
                    color="primary"
                    deleteIcon={<DoneIcon />}
                />
            )
        }
        return (
            <Chip
                className={classes.open}
                label="Aberto"
                color="secondary"
                deleteIcon={<DoneIcon />}
            />
        )
    }


    return (
        <div className={classes.root}>
        {props.children}
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete} handleDone={handleDone} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TodoTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={renderRows().length}
                        />
                        <TableBody>
                            {stableSort(renderRows(), getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    selected={isItemSelected}
                                                    key={row.id}
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.task}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">
                                                <Box display="flex">
                                                    {isDone(row.finished)}
                                                    <TodoUpdate id={row.id} />
                                                </Box>
                                            </TableCell>
                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={renderRows().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );

}

export default React.memo(TodoTable);