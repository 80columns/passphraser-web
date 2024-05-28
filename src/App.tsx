import { useState } from 'react';

import { Button, Grid, Paper, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

/*
 * Normally the application routes are defined in this file, but this app only has
 * one route so for simplicity the root component is defined here
 */
function App() {
    const [passphrase, setPassphrase] = useState('');

    function generatePassphrase() {
        setPassphrase('foobar');
    }

    return (
        <Grid container
              direction='column'
              justifyContent='center'
              alignItems='center'
              gap={4}
              height='80vh'
        >
            <Typography variant='h3'>
                Passphraser
            </Typography>
            <Typography variant='subtitle2'>
                Generate secure and memorable passphrases
            </Typography>
            <Paper variant='elevation' square={false} style={{ width: '40%', height: 100, padding: 10 }}>
                <Grid container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      height='100%'
                >
                    <Typography variant='h5'>
                        {passphrase}
                    </Typography>
                </Grid>
            </Paper>
            <Button id='generate-passphrase'
                    variant='contained'
                    size='large'
                    onClick={generatePassphrase}
            >
                Generate
            </Button>
        </Grid>
    );
}

export default App;
