import { Card, CardContent } from "@mui/material";

const BestDay = ({jacketDay, umbrellaDay}:{jacketDay:(string|null), umbrellaDay:(string|null)}) => {
    return (
        <Card className="result-card">
            <CardContent>
                {
                    umbrellaDay?<h1>Best day to sell Umbrella: {umbrellaDay}</h1>:null
                }
                 <br />
                {
                    jacketDay?<h1>Best day to sell Jacket: {jacketDay}</h1>:null
                }
            </CardContent>
        </Card>
    );
}


export default BestDay;