import { Card, CardContent } from "@mui/material";

const CityHeader = ({city}:{ city: string })=>{
    return (
        <Card className="result-card">
        <CardContent>
            <h1>City: {city}</h1>
        </CardContent>
      </Card>
      );
};

export default CityHeader;