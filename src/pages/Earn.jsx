/* eslint-disable react/prop-types */
import {Button, ButtonGroup, Stack, Typography} from '@mui/joy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function Earn(props) {

    const defaultAvailableItems = [
        {
          name: 'Bitcoin Miner',
          cost: 20,
          profit: 1,
        },
        {
          name: 'Dropshipping Business',
          cost: 50,
          profit: 5,
        },
        {
          name: 'Internship at FANG',
          cost: 100,
          profit: 10,
        },
        {
          name: 'Become a LinkedIn Influencer',
          cost: 500,
          profit: 25,
        },
        {
          name: 'Tech Startup Actually Becomes Profitable',
          cost: 1000,
          profit: 50,
        },
        {
          name: 'Born a 10x developer',
          cost: 10000,
          profit: 250,
        },
        {
          name: "Sort an array in O(1)",
          cost: 50000,
          profit: 500,
        },
        {
          name: "Explain why JS converts everything to a string",
          cost: 100000,
          profit: 1000,
        },
      ];

    const [availableItems, setAvailableItems] = useState(() => {
        const stored = localStorage.getItem('availableItems');
        return stored ? JSON.parse(stored) : defaultAvailableItems;
      });
    
      const [items, setItems] = useState(() => {
        const stored = localStorage.getItem('items');
        return stored ? JSON.parse(stored) : [];
      });
    
      const [income, setIncome] = useState(() => {
        const stored = localStorage.getItem('income');
        return stored ? parseInt(stored, 10) : 1;
      });
    
      // Save to local storage when state changes
      useEffect(() => {
        localStorage.setItem('availableItems', JSON.stringify(availableItems));
      }, [availableItems]);
    
      useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
      }, [items]);
    
      useEffect(() => {
        localStorage.setItem('income', income.toString());
      }, [income]);

    const buy = (item, index) => {
        if(item.cost < props.bucks){
        setItems([...items, item])
        setAvailableItems((prevItems) => [
            ...prevItems.slice(0, index),
            ...prevItems.slice(index + 1),
          ]);
        props.setBucks(props.bucks-item.cost)
        } else {
            alert('Too expensive!!!')
        }
    }
    
    useEffect(()=>{
        let count = 1;
        items.forEach((item) => {
            count += parseInt(item.profit)
        })
        setIncome(count)
    },[items])

    return(
        <>
            <Stack alignItems={'center'} direction={'column'} margin={3}>
            <Typography sx={{color:'white'}} level='h1'>Click Here to Start Making the Big Bucks</Typography>
            <Button color='success' onClick={()=>props.setBucks(props.bucks + income)}><FontAwesomeIcon style={{fontSize: '100px', padding: '10px'}} icon={faMoneyBillTrendUp}/></Button>
            </Stack>
            <Stack alignItems={'center'} textAlign={'center'} direction={'column'} margin={5}>
                <Typography level='h1' sx={{color:'white'}}>Buy Items</Typography>
                <ButtonGroup orientation='vertical'>
                    {availableItems.map((item, index) => {
                        return <Button sx={{backgroundColor:'white'}} onClick={()=>buy(item, index)} key={index}>{item.name}, Bucks/Click:{item.profit}, Cost: {item.cost}</Button>
                    })}
                </ButtonGroup>
            </Stack>
        </>
    )
}

export default Earn