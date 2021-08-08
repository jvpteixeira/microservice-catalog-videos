import { colors, createMuiTheme } from "@material-ui/core";
import red from '@material-ui/core/colors/red';


const theme = createMuiTheme({
    palette:{
        primary: {
            main: '#79aec8',
            contrastText: '#fff'
        },
        secondary: {
            main: '#4db5ab',
            contrastText: '#fff'
        },
        background: {
            default: '#fafafa'
        }
    },
    overrides:{
        MUIDataTable:{
            
        }
    }
})

export default theme;