import { useState } from 'react';

import { Button, Grid, Paper, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';

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
        setPassphrase('{QUARANTINENINETEENS7425intermarineninteens`bootleggedninteenss');
    }

    return (
        <Grid container
              id='content'
              direction='column'
              justifyContent='center'
              alignItems='center'
              gap={4}
              marginTop={25}
        >
            <Grid container
                  id='header'
                  direction='column'
                  justifyContent='center'
                  alignItems='center'
                  gap={0}
            >
                <Typography variant='h3'>
                    Passphraser
                </Typography>
                <Typography variant='subtitle1'
                            color='GrayText'
                >
                    Generate secure and memorable passphrases
                </Typography>
            </Grid>
            <Paper variant='elevation'
                   square={false}
                   style={{ minHeight: 180, padding: 30 }}
            >
                <Grid container
                      id='passphrase-container'
                      direction='column'
                      justifyContent='center'
                      alignItems='center'
                      height='100%'
                      gap={6}
                >
                    <Typography variant='h5' minHeight={40} textAlign='center' style={{ maxWidth: '75vw', overflowWrap: 'break-word' }}>
                        {passphrase}
                    </Typography>
                    <Grid container
                          id='passphrase-actions'
                          direction='row'
                          justifyContent='center'
                          alignItems='center'
                          gap={4}
                    >
                        <Button id='copy-passphrase'
                                variant='contained'
                                size='large'
                                onClick={() => navigator.clipboard.writeText(passphrase)}
                                startIcon={<ContentCopyIcon fontSize='small' />}
                        >
                            Copy
                        </Button>
                        <Button id='new-passphrase'
                                variant='contained'
                                size='large'
                                onClick={generatePassphrase}
                                startIcon={<AddIcon fontSize='small' />}
                        >
                            New
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default App;
