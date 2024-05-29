import {Button, Rating, TextField} from '@mui/material';


export default function Review(){
    return(
        <div className="reviewSection">
                        <TextField multiline rows={4} label="Lasa o recenzie acestui anunț!" sx={{ width: 600, marginBottom: 2 }}></TextField>
                        <div className="reviewRateSection">
                            <Button variant="contained">Ofera recenzie!</Button>
                            <Rating></Rating>
                        </div>
                    </div>
    )
}