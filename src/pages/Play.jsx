/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Stack from "@mui/joy/Stack"
import { useEffect, useState } from "react"
import { Button, Box, Typography, Input, ButtonGroup } from "@mui/joy"
import CustomCard from "../components/CustomCard"
import { Wheel } from 'react-custom-roulette'

const buttonLabels = Array.from({ length: 16 }, (_, i) => i);


const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '2', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '4', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '6', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '11', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '12', style: { backgroundColor: 'black', textColor: 'white' } },
    { option: '13', style: { backgroundColor: 'red', textColor: 'white' } },
    { option: '14', style: { backgroundColor: 'black', textColor: 'white' } },
  ];
  
  

function Play(props) {

    const gamble = (number) => {
        console.log(number)
        setIndex(number)
    }

    function sleep(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      }

    const [gameplay, setGameplay] = useState('false')
    const [dealer, setDealer] = useState([])
    const [player, setPlayer] = useState([])
    const [playerCount, setPlayerCount] = useState(0)
    const [dealerCount, setDealerCount] = useState(0)
    const [playerStatus, setPlayerStatus] = useState('rest')
    const [dealerStatus, setDealerStatus] = useState('rest')
    const [wager, setWager] = useState(0)
    const [index, setIndex] = useState(-1)
    const [winner, setWinner] = useState(-1)

    const [bet, setBet] = useState(0)

    const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
    const values = ['2', '3', '4', '5', '6', '7', '8','9', '10', 'Jack', 'Queen', 'King', 'Ace']
    const decode = new Map([
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['7', 7],
        ['8', 8],
        ['9', 9],
        ['10', 10],
        ['Jack', 10],
        ['Queen', 10],
        ['King', 10],
        ['Ace', 11]
    ])

    const [spin, setSpin] = useState(false)

    let played = new Map()

    const reset = () => {
        played = new Map();
        setWager(0)
        setGameplay('false')
        setDealer([])
        setPlayer([])
    }

    const checkwon = () => {
        if(index == winner) {
            props.setBucks(props.bucks + bet * 2); 
            alert(`You won Roulette! Congrats! You made ${bet*2} bucks`)
        } else console.log('loser')
    }

    const finishGame =  async () => {
        let count = dealerCount
        let arr = []
        if(playerStatus != 'bust'){
        while(count < 17){
            const card = generateCard()
            arr.push(card)
            count += decode.get(card.value)
        }
    }
        setDealer([...dealer,...arr])
        await sleep(500)
        setGameplay('complete')
    }

    const generateCard = () => {
        const suit = suits[(Math.floor(Math.random() * suits.length))]
        const value = values[(Math.floor(Math.random() * values.length))]
        const temp = JSON.stringify({suit: suit, value: value})
        if(played.get(temp) == undefined) {
            played.set(temp, true)
            return ({suit: suit, value: value})
        }
        else return generateCard();
    }

    const deal = (count, target) => {
        console.log('dealing ' + count + ' cards to ' + target)
        let temp = []
        for (let i = 0; i < count; i++) {
            const card = generateCard();
            temp.push(card)
        }
        if(target=='dealer'){
            setDealer([...dealer, ...temp])
        } else {
            setPlayer([...player, ...temp])
        }
    }

    useEffect(()=>{
        if(gameplay == 'complete'){
        if(dealerStatus !== 'bust' && playerStatus !== 'bust'){
            if(playerCount > dealerCount){
                console.log('player has won!')
                props.setBucks(Math.ceil(props.bucks + 1.5 * wager))
                alert(`You won Blackjack! Congrats! You made ${wager * 1.5} bucks`)
            } else if (playerCount < dealerCount){
                console.log('dealer wins!')
                alert('Dealer wins!')
            } else{
                console.log("it's a tie!")
                props.setBucks(props.bucks + wager)
                alert("It's a tie, no money was lost.")
            }
        } else if(playerStatus == 'bust') {
            console.log('dealer has won')
            alert('Dealer wins!')
        } else {
            console.log('player has won')
            props.setBucks(Math.ceil(props.bucks + 1.5 * wager))
            alert(`You won Blackjack! Congrats! You made ${Math.ceil(wager * 1.5)} bucks`)
        }
        }
    }, [gameplay])

    useEffect(()=>{
        let count = 0;
        dealer.forEach((card)=>{
            const val = decode.get(card.value);
            count += val;
        })
        setDealerCount(count);
        if(count > 21) setDealerStatus('bust');
        if(count < 21) setDealerStatus('playing')
        if(count == 21) setDealerStatus('blackjack')
    }, [dealer])

    useEffect(()=>{
        let count = 0;
        player.forEach((card)=>{
            const val = decode.get(card.value);
            count += val;
        })
        setPlayerCount(count);
        if(count > 21) setPlayerStatus('bust');
        if(count < 21) setPlayerStatus('playing')
        if(count == 21) setPlayerStatus('blackjack')
    }, [player])


    useEffect(()=>{
        if(playerStatus == 'done' || playerStatus=="bust"  || playerStatus=='blackjack') {
            finishGame();
        }
    },[playerStatus])

    const handleWagerChange = (event) => {
        setWager(event.target.value)
    }

    return(
        <Stack>
            <Stack alignItems={'center'} marginTop={4} >
            <Typography level="h1" sx={{color:'gold', margin:'5px'}}>Blackjack</Typography>
            {gameplay == 'false' ? 
            <Stack direction={'column'} spacing={2}>
                <Button sx={{backgroundColor:'black', borderColor:'#e54128'}} onClick={()=>{
                    let temp = parseInt(wager)
                    console.log(temp)
                    if(isNaN(temp) || temp > props.bucks || temp < 1) {
                        alert('Please enter a valid wager')
                    } else {
                    props.setBucks(props.bucks - wager)
                    deal(2, 'player');
                    deal(1, 'dealer');
                    setGameplay('true')
                    setDealerStatus('playing')
                    setPlayerStatus('playing')
                    } 
                }}>Play</Button>
                <Input sx={{backgroundColor:'black', color:'white', borderColor:'#e54128'}} placeholder="Wager" onChange={handleWagerChange} value={wager}></Input>
            </Stack>
            :<></>}
            <Stack direction={'column'} spacing={3}>
                <Stack direction={'row'}>
                    {dealer.map((card, index) => {
                        return (
                            <CustomCard key={index} val={card.value} suit={card.suit}/>
                            )
                    })}
                </Stack>
                <Box textAlign={'center'}>
                {gameplay == 'true' && <Typography level="h3" sx={{color:'#e54128'}}>Dealer has: {dealerCount == 21 ? "blackjack": dealerCount}</Typography>}
                </Box>
                <Stack direction={'row'}>
                    {player.map((card, index) => {
                        return (
                            <CustomCard key={index} val={card.value} suit={card.suit}/>
                            )
                    })}
                </Stack>
                <Box textAlign={'center'}>
                {gameplay == 'true' && <Typography level="h3" sx={{color:'#e54128'}}>You have: {playerCount == 21 && "blackjack"}{playerCount > 21 && "bust"}{playerCount < 21 && playerCount}</Typography>}
                </Box>
            </Stack>
            <Stack alignItems={'center'} margin={5}>
            {gameplay == 'complete' && <Button onClick={reset}>Reset</Button>}
            {playerStatus === 'playing' && gameplay == 'true' && 
            <Stack direction={'row'} spacing={2}>
            <Button onClick={()=>{deal(1, 'player')}}>Hit!</Button>
            <Button onClick={()=>{setPlayerStatus('done')}}>Stand...</Button>
            </Stack>
            }
            </Stack>
            </Stack>
            <Stack alignItems={'center'} direction={'column'}>
            <Typography level="h1" sx={{color:'gold', margin:'5px'}}>Roulette</Typography>
            <Wheel
      mustStartSpinning={spin}
      prizeNumber={winner}
      data={data}
      backgroundColors={['#3e3e3e', '#df3428']}
      textColors={['#ffffff']}
      onStopSpinning={()=>{
        setSpin(false); 
        checkwon();
      }}
    />
    <ButtonGroup variant="solid" orientation="horizontal">
      {buttonLabels.map((label) => (
        <Button key={label} onClick={() => gamble(label)}
        sx={label === index ? {background:'red', color:'green'} : {background:'black', color:'white'}}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
    <Stack margin={2} alignItems={'center'}>
    <Input sx={{margin: '5px',backgroundColor:'black', color:'white', borderColor:'#e54128'}} placeholder="Bet" onChange={(e) => {setBet(e.target.value)}} value={bet}></Input>
            {spin == false && <Button sx={{backgroundColor:'black', color:'white'}} onClick={()=>{
                if(bet < props.bucks+1 && bet > 0){
                    setWinner(Math.floor(Math.random() * 15))
                    props.setBucks(props.bucks - bet)
                    setSpin(true);
                } else alert('Please Enter a valid Bet')
                }}>Spin!</Button>}
    </Stack>
    </Stack>
        </Stack>
    )

}

export default Play