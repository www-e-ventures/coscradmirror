import Typography from '@mui/material/Typography';
import { HashRouter, Route, Routes } from 'react-router-dom';
import About from '../Components/Pages/About/About';
import Apps from '../Components/Pages/Apps/Apps';
import Funders from '../Components/Pages/Funders/Funders';
import Greetings from '../Components/Pages/Greetings/Greetings';
import Home from '../Components/Pages/Home/Home';
import Links from '../Components/Pages/Links/Links';
import Songs from '../Components/Pages/Songs/Songs';
import Teachers from '../Components/Pages/Teachers/Teachers';
import Videos from '../Components/Pages/Videos/Videos';
import Navbar from '../Components/Widgets/Navbar/Navbar';

export function App() {
    return (
        <Typography component={'span'} variant={'body2'}>
            <HashRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Apps" element={<Apps />} />
                    <Route path="/Songs" element={<Songs />} />
                    <Route path="/Videos" element={<Videos />} />
                    <Route path="/Links" element={<Links />} />
                    <Route path="/Teachers" element={<Teachers />} />
                    <Route path="/Funders" element={<Funders />} />
                    <Route path="/Greetings" element={<Greetings />} />
                    <Route
                        path="*"
                        element={
                            <div style={{ minHeight: '100vh', textAlign: 'center' }}>
                                <h1>404</h1>
                                <p>Nothing to see here!</p>
                            </div>
                        }
                    ></Route>
                </Routes>
            </HashRouter>
        </Typography>
    );
}

export default App;
