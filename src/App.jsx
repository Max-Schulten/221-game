import { useState, useEffect } from 'react'
import { Button, Navbar, Container, Nav} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Stack } from '@mui/joy';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import Earn from './pages/Earn'
import Play from './pages/Play';


const App = () => {

  const [bucks, setBucks] = useState(() => {
    const savedBucks = localStorage.getItem('bucks');
    return savedBucks ? parseInt(savedBucks, 10) : 0;
  });

  // Save the bucks value to local storage when it changes
  useEffect(() => {
    localStorage.setItem('bucks', bucks.toString());
  }, [bucks]);

  
  return (
    <Router>
      <Stack>
        <Navbar className='bg-dark'>
          <Container>
            <Navbar.Brand className='text-white'>Boredom Casino</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className='me-auto'>
                <Nav.Link><Link to={'/'}><Button className='btn-secondary'>Home</Button></Link></Nav.Link>
                <Nav.Link><Link to={'/earn'}><Button className='btn-secondary'>Earn</Button></Link></Nav.Link>
                <Nav.Link><Link to={'/play'}><Button className='btn-secondary'>Play</Button></Link></Nav.Link>                
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className='justify-content-end'>
                <Navbar.Text className='text-white'>Balance: {bucks}</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <div>
        <Routes>
          <Route path="/" index element={<Home bucks={bucks}/>} />
          <Route path="/earn" element={<Earn bucks={bucks} setBucks={setBucks}/>} />
          <Route path="/play" element={<Play bucks={bucks} setBucks={setBucks}/>}/>
        </Routes>
      </div>
      </Stack>
    </Router>
  );
};

export default App;
