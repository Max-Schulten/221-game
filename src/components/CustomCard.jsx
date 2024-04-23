/* eslint-disable react/prop-types */
import { Typography } from "@mui/joy"
import { Card } from "react-bootstrap"
import {BsFillSuitClubFill, BsFillSuitDiamondFill, BsFillSuitHeartFill, BsFillSuitSpadeFill} from 'react-icons/bs'

function CustomCard(props) {
    const decodeValue = new Map([
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['Jack', 'J'],
        ['Queen', 'Q'],
        ['King', 'K'],
        ['Ace', 'A']
    ])

    const decodeIcon = new Map([
        ['Spades', <BsFillSuitSpadeFill key='0'/>],
        ['Hearts', <BsFillSuitHeartFill key='0'/>],
        ['Diamonds', <BsFillSuitDiamondFill key='0'/>],
        ['Clubs', <BsFillSuitClubFill key='0'/>]
    ])

    return(
        <Card style={{margin:'5px', width: '100px', height: '150px', display: 'flex', justifyContent: 'center'}}>
        <Typography level="h2">{decodeValue.get(props.val)}</Typography>
        <Card.Body style={{ textAlign: 'center' }}>
        {decodeIcon.get(props.suit)}
      </Card.Body>
      <Typography textAlign={'right'} level="h2">{decodeValue.get(props.val)}</Typography>

    </Card>
    )
}

export default CustomCard