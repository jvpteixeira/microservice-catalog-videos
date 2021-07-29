// @flow 
import { Chip } from '@material-ui/core';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useEffect, useState } from 'react';
import { httpVideo } from '../../utils/http';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

require('dotenv').config();

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "categories",
        label: "Categorias",
        options:{
            customBodyRender(value, tableMeta, updateValue){
                return value.map(value => value.name).join(', ')
            }
        }
    },
    {
        name: "created_at",
        label: "Created at",
        options:{
            customBodyRender(value, tableMeta, updateValue){
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>
            }
        }
    }
]

type Props = {
    
};

const Table = (props: Props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
       httpVideo.get('/genres').then(
           res => setData(res.data.data)
       )
    }, [])

    
    return (
        <MUIDataTable 
            title="Listagem de gêneros"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table;