import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

/*
 * Normally the application routes are defined in this file, but this app only has
 * one route so for simplicity the root component is defined here
 */
function App() {
  const [passphrase, setPassphrase] = useState("");
  const [wordCount, setWordCount] = useState(3);

  function generatePassphrase() {
    setPassphrase(
      "{QUARANTINENINETEENS7425intermarinenineteen`bootleggednineteens",
    );
  }

  return (
    <Grid
      container
      id="content"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      minHeight="400px"
      height="80vh"
      marginTop="20px"
      marginBottom="20px"
      wrap="nowrap"
    >
      <Grid
        container
        id="header"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={0}
      >
        <Typography variant="h3">Passphraser</Typography>
        <Typography variant="subtitle1" color="GrayText">
          Generate secure and memorable passphrases
        </Typography>
      </Grid>
      <Paper
        variant="elevation"
        square={false}
        style={{ minHeight: 180, height: "max-content", padding: 30 }}
      >
        <Grid
          container
          id="passphrase-container"
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={180}
          gap={6}
        >
          <Typography
            variant="h5"
            minHeight={40}
            textAlign="center"
            style={{ maxWidth: "50vw", overflowWrap: "break-word" }}
          >
            {passphrase}
          </Typography>
          <Grid
            container
            id="passphrase-actions"
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Button
              id="copy-passphrase"
              variant="contained"
              size="large"
              onClick={() => navigator.clipboard.writeText(passphrase)}
              startIcon={<ContentCopyIcon fontSize="small" />}
            >
              Copy
            </Button>
            <Button
              id="new-passphrase"
              variant="contained"
              size="large"
              onClick={generatePassphrase}
              startIcon={<AddIcon fontSize="small" />}
            >
              New
            </Button>
          </Grid>
        </Grid>
        <Grid container id="slider-container">
          <Typography id="input-slider" gutterBottom>
            {wordCount} words
          </Typography>
          <Slider
            id="word-count-slider"
            min={3}
            max={100}
            value={wordCount}
            onChange={(_, value) => setWordCount(value as number)}
            valueLabelDisplay="off"
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default App;
