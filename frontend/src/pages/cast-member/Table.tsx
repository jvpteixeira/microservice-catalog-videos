// @flow 
import { Chip } from '@material-ui/core';
import MUIDataTable, { MUIDataTableColumn } from 'mui-datatables';
import { useEffect, useState } from 'react';
import { httpVideo } from '../../utils/http';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

require('dotenv').config();

const CastMemberTypeMap = {
    1: 'Diretor',
    2: 'Ator'
}


const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "type",
        label: "Tipo",
        options:{
            customBodyRender(value, tableMeta, updateValue){
                console.log(value)
                return CastMemberTypeMap[value];
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
       httpVideo.get('/categories').then(
           res => setData(res.data.data)
       )
    }, [])

    
    return (
        <MUIDataTable 
            title="Listagem de membros do elenco"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table;