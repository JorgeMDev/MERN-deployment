import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaidIcon from '@mui/icons-material/Paid';
import TaskIcon from '@mui/icons-material/Task';
import HardwareIcon from '@mui/icons-material/Hardware';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Statuses = (props) => {
    
    const matches = useMediaQuery('(min-width:600px)')
    

  return (
    <Grid display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Grid gridColumn="span 1">
        <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {matches? <Typography sx={{ fontSize: 10, textAlign: 'center' }} color="text.secondary" gutterBottom>
            SALES
        </Typography>:<LocalOfferIcon sx={{color: 'blue'}}/>}
        <Typography sx={{textAlign: 'center' }} color="text.secondary">
            {props.sold}
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
    </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {matches? <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            INSTALLATIONS
        </Typography>: <HardwareIcon sx={{color: 'brown'}}/>}
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            {props.installed}
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
  </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {matches? <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            VERIFICATIONS
        </Typography>:<TaskIcon sx={{color: 'purple'}}/>}
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            {props.contractSigned}
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
  </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90}}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       {matches? <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            WAITING FOR PAYMENT
        </Typography>: <PaidIcon sx={{verticalAlign: 'center', color: 'green'}}/>}
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            {props.paid}
        </Typography>
      
        </CardContent>
        <CardActions>
        </CardActions>
  </Card>
  </Grid>
  
    </Grid>
  )
}

export default Statuses



