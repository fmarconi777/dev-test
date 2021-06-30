import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Fab } from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <Box
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
            justifyContent="center"
            alignItems="center"
        >

            <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                <PlaylistAddCheckIcon className={classes.extendedIcon} />
                Selecionar Todos
            </Fab>
            <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                <CheckCircleIcon className={classes.extendedIcon} />
                Finalizar Selecionados
            </Fab>

        </Box>
    );
}