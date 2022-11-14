import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

const Statuses = () => {

  return (
    <Grid display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
        <Grid gridColumn="span 1">
        <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent>
        <Typography sx={{ fontSize: 10, textAlign: 'center' }} color="text.secondary" gutterBottom>
            SALES
        </Typography>
        <Typography sx={{textAlign: 'center' }} color="text.secondary">
            4
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
    </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent>
        <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            INSTALLATIONS
        </Typography>
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            5
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
  </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent>
        <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            VERIFICATIONS
        </Typography>
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            6
        </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
  </Card>
  </Grid>
  <Grid gridColumn="span 1">
    <Card sx={{ minWidth:50, maxHeight: 90 }}>
        <CardContent>
        <Typography sx={{ fontSize: 10, textAlign: 'center'  }} color="text.secondary" gutterBottom>
            WAITING FOR PAYMENT
        </Typography>
        <Typography sx={{textAlign: 'center'  }} color="text.secondary">
            3
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



