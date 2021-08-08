import * as React from 'react';
import { Page } from '../../components/Page';
import { Form } from './Form';

export const PageForm = (props) => {
    return (
        <Page title={"Criar membro de elenco"}>
            <Form/>
        </Page>
    );
};

export default PageForm;