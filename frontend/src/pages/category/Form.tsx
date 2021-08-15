import { Box, Button, Checkbox, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import {ButtonProps} from '@material-ui/core/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import categoryHttp from '../../utils/http/category-http';
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
    const [checkBox, setCheckBox] = useState(true);

    const classes = useStyles()

    const buttonProps: ButtonProps = {
        className: classes.submit,
        variant: 'contained',
        color: 'secondary'
    };

    const {register, handleSubmit, getValues} = useForm();

    function onSubmit(formData, event){
        formData.is_active = checkBox;
        categoryHttp
            .create(formData)
            .then((response) => console.log(response))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Nome"
                fullWidth
                variant={"outlined"}
                {...register("name")}
            />
            <TextField
                label="Descrição"
                multiline
                rows="4"
                fullWidth
                variant={"outlined"}
                margin={"normal"}
                {...register("description")}
            />
            
            <Checkbox
                {...register("is_active")}
                color={"primary"}
                onClick={() => setCheckBox(!checkBox)}
                defaultChecked
            />
            Ativo?
            
            <Box dir={"rtl"}>
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};