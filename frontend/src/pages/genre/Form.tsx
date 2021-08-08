import { Box, Button, TextField, Theme, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import {ButtonProps} from '@material-ui/core/Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import genreHttp from '../../utils/http/genre-http';
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
    const classes = useStyles()
    const buttonProps: ButtonProps = {
        className: classes.submit,
        variant: "outlined"
    };

    const [categories, setCategories] = useState<any[]>([]);
    const {register, handleSubmit, getValues, setValue, watch} = useForm();
    const category = getValues()['categories_id'];
    
    // useEffect(() => {
    //     register("type")
    // }, [register])

    useEffect(() => {
        categoryHttp
            .list()
            .then(response => setCategories(response.data.data))
    },[])

    function onSubmit(formData, event){
        console.log(event);
        genreHttp
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
                select
                value={watch('categories_id')}
                defaultValue= {[]}
                label="Categorias"
                margin={'normal'}
                variant={'outlined'}
                fullWidth
                onChange={(e) => {
                    setValue('categories_id', e.target.value);
                }}
                SelectProps={{
                    multiple: true
                }}
            >
                <MenuItem value="" disabled>
                    <em>Selecione categorias</em>
                </MenuItem>
                {
                    categories.map(
                        (category, key) => (
                            <MenuItem key={key} value={category.id}>{category.name}</MenuItem>
                        )
                    )
                }
            </TextField>
            
            <Box dir={"rtl"}>
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};