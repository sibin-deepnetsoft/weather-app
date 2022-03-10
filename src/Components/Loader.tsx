import { Box, CircularProgress } from "@mui/material";

const Loader = ({loading}:{loading:boolean}) => {
    if(!loading){
        return null;
    }
    return (
            <div className="flex-center">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
    );
}


export default Loader;