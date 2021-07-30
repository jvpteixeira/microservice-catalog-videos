import { Box, Button, Checkbox, TextField, ButtonProps, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
type Props = {
    
};

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
})

export const Form = (props: Props) => {
    const classes = useStyles()

    const buttonProps: ButtonProps = {
        className: classes.submit,
        variant: "outlined"
    }

    return (
        <form>
            <TextField
                name="name"
                label="Nome"
                fullWidth
                variant={"outlined"}
            />
            <TextField
                name="description"
                label="Descrição"
                multiline
                rows="4"
                fullWidth
                variant={"outlined"}
                margin={"normal"}
            />
            <Checkbox
                name="is_active"
            />
            Ativo?
            <Box dir={"rtl"}>
                <Button {...buttonProps}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};