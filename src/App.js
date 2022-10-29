import './App.css';

import * as React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function App() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [gistData, setGistData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);




  const maxSteps = !isLoaded ? 0 : gistData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  async function getQuotesFromGist() {

    return new Promise((resolve, reject) => {
      fetch(process.env.REACT_APP_QUOTES_URL, {
        headers: new Headers({
          'origin': 'http:localhost:3000'
        })
      },)
        .then(response => response.json())
        .then(data => {

          setGistData(data);
          resolve(data);
          setIsLoaded(true);
        })
        .catch(err => {
          // console.log('err', err);
          setError(error);
          reject(err);
        });
    })

  }






  useEffect(() => {
    getQuotesFromGist();

  }, [isLoaded, error]);


  return (
    <Container maxWidth="sm" sx={{ mt: 15 }} data-testid="container" >
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"

        container

      >
        <Grid item xs={12} minWidth="100%" >
          <Card sx={{ minWidth: '100%', minHeight: 250, maxHeight: 250 }} >
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {!isLoaded ? <Skeleton /> : ` Author: ${gistData[activeStep].author}`}
              </Typography>
              <Typography component="div" sx={{ mt: 2, mb: 2 }}>
                {!isLoaded ? <Skeleton wrapper={Box} count={5} /> : "Quote:"}
              </Typography>

              <Typography variant="body2">
                {!isLoaded ? <Skeleton wrapper={Box} count={5} /> : gistData[activeStep].quote}
              </Typography>
            </CardContent>
            <CardActions sx={{ position: 'static' }}>
              {
                !isLoaded ? <LoadingButton loading size="small" variant="outlined">
                  Submit
                </LoadingButton>
                  :
                  <Button href={`https://it.wikipedia.org/wiki/${gistData[activeStep].author}`} target="_blank" > Learn More </Button>
              }
              {/* <Button size="small">{gistData.length === 0 ? <Skeleton /> : "Learn More"}</Button> */}
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, alignItems: 'center', justifyContent: 'center', minWidth: '100%' }}  >
          <MobileStepper
            variant="progress"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />

        </Grid>
        {/* <Grid item xs={12} sx={{ mt: 2, pl: 22 }} minWidth="100%" >
          <TextField id="filled-basic" label={!isLoaded ? <Skeleton /> : `Choose from 0 ... ${maxSteps}`} variant="standard" />
        </Grid> */}
      </Grid>



    </Container >
  );
}

export default App;
