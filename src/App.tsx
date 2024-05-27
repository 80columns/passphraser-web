import './App.css'

import { Button, Grid, TextField } from '@mui/material';

function App() {
    return (
        <Grid container
              direction='row'
              justifyContent='center'
              alignItems='center'
              height='90vh'
        >
            <TextField id='passphrase'
                       label='Passphrase'
                       variant='outlined'
            />
            <Button id='generate-passphrase'
                    variant='contained'
            >
                Generate
            </Button>
        </Grid>
    );
}

export default App
