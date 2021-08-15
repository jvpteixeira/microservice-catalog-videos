import { Box, Button, Checkbox, TextField, Theme, FormControlLabel, RadioGroup, FormControl, FormLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import {ButtonProps} from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import castMemberHttp from '../../utils/http/cast-member-http';
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

    const {register, handleSubmit, getValues, setValue} = useForm();

    useEffect(() => {
        register("type")
    }, [register])

    function onSubmit(formData, event){
        formData.is_active = checkBox;
        castMemberHttp
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
            <FormControl margin={"normal"}>
                <FormLabel component="legend">Tipo</FormLabel>
                <RadioGroup 
                    name="type"
                    onChange={(e) =>{
                        setValue('type', parseInt(e.target.value))
                    }}
                >
                    <FormControlLabel value = "1" control={<Radio color={"primary"}/>} label="Director"/>
                    <FormControlLabel value = "2" control={<Radio color={"primary"}/>} label="Ator"/>                                    
                </RadioGroup>
            </FormControl>

            
            <Box dir={"rtl"}>
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};