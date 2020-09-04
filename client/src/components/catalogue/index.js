import React from 'react'
import Container from './Container'
import Selector from './Selector'
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  cont:{
    background:'#3D3D3D',
  },
}));

const pruebaObj = [{
  imagen : 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80',
   titulo:'CAMPERA',
   precio:'$9999'
 },{
   imagen : 'https://vansco.vteximg.com.br/arquivos/ids/220878-1200-1200/VN0A3WMAVNE-1-.jpg?v=637036794910600000',
   titulo:'Zapatillas', 
   precio:'$19999'}

]


export default function Catalogo(){
    const classes = useStyles();
    return(
      <ThemeProvider theme={darkTheme}>
        <div className={classes.cont}>
            <Grid container 
      		direction="row"
      		justify="space-between"
  		alignItems="flex-start">
            	<Grid item >
                    <Selector nom="talle"/>
      		</Grid>
                <Grid item >
                    <Selector  nom="ordenar"/>
      		</Grid>
            </Grid>
            <div>
                <Container prendas={pruebaObj} />
            </div>
        </div>
      </ThemeProvider>
      
    )
}
