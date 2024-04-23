/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/joy";

function Home(props) {
    return(
        <>
            <Stack padding={5} alignItems={'center'}>
                <Typography sx={{color:'white'}} level="h2">Welcome to the</Typography>
                <Typography sx={{color: '#3e9c35'}} level="h1">Casino of Boredom</Typography>
            </Stack>
            <Stack padding={5} alignItems={'center'}>
                <Typography sx={{color:'white'}} level="h2">You currently have <Typography sx={{color: '#3e9c35'}}>{props.bucks}</Typography> Boredom Buck(s).
                Spend them wisely, they&apos;re kinda boring to get! </Typography>
            </Stack>
        </>
    );
}

export default Home