import { Card, CardContent } from "@mui/material";

const ResultData = ({day, temp, main, rain}:{day:string, temp:number, rain:number, main:string}) => {
    return (
        <Card className="result-card">
            <CardContent>
                    Day:{ day}<br />
                    Temp:{ temp}<br />
                    Main:{ main}<br />
                    Rain:{ rain}<br />
                    
            </CardContent>
        </Card>
    );
}


export default ResultData;