import {ComponentNameToClassKey} from '@material-ui/core/styles/overrides'
import { PaletteOptions, Palette} from "@material-ui/core/styles/createPalette";

declare module '@material-ui/core/styles/overrides'{
    interface ComponentNameToClassKey {
        MUIDataTable: any;
        MUIDataTableToolbar: any;
        MUIDataTableHeadCell: any;
        MuiTableSortLabel: any;
        MUIDataTableSelectCell: any;
        MUIDataTableBodyCell: any;
        MUIDataTableToolbarSelect: any;
        MUIDataTableBodyRow: any;
        MUIDataTablePagination: any;
    }
}

declare module '@material-ui/core/styles/createPalette' {
    import {PaletteOptions} from '@material-ui/core/styles';
    

    interface Palette {
        success: PaletteColor
    }

    interface PaletteOptions {
        success?: PaletteOptions
    }
}