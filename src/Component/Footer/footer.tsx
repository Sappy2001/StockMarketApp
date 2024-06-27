import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';


const Footer = () => {
    const [value, setValue] = React.useState();
    return (
        <div id="footer">
            <div id="footer-containers">
                <div id="footer-links-containers">
                    <div id="footer-links" style={{ color: 'white' }}>
                        <h6>ACCOUNT FEATURES</h6>
                        <a href="https://fxgt.com/contact/">
                            <u><p>Contact Us</p></u>
                        </a>

                    </div>

                    <div id="footer-links" style={{ color: 'white' }}>
                        <h6>COMPANY</h6>
                        <a href="https://fxgt.com/about-fxgt/">
                            <u><p>About FXGT.com</p></u>
                        </a>

                    </div>

                    <div id="footer-links" style={{ color: 'white' }}>
                        <h6>PROMOTIONS & PARTNERS</h6>

                        <a href="https://fxgt.com/legal/">
                            <u><p>Legal</p><br/></u>
                        </a>
                    </div>
                </div>

                <div id="app-icons">
                    <h6>Payment <br/>Methods</h6>
                    
                <img height="35px" src="https://live.cdn-fxgt.com/2023/01/Master.png"/>
                <img height="35px" src="https://live.cdn-fxgt.com/2023/01/Visa.png"/>
                <img height="35px" src="https://live.cdn-fxgt.com/2023/01/Instant-EFT.png"/>
                <img height="35px" src="https://live.cdn-fxgt.com/2023/01/Local-bank.png"/>
                <img height="35px" src="https://live.cdn-fxgt.com/2023/01/Cryptos.png"/>
                
                </div><br/>
            </div>

            <div id="footer-credits" style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);

                        }}
                        sx={{ position: "relative", bottom: 0 }}
                    >
                        <a href="https://www.instagram.com"><BottomNavigationAction sx={{ backgroundColor: '#0F2167', color: 'white' }} label="instagram" icon={<InstagramIcon />} /></a>
                        <a href="https://www.facebook.com"><BottomNavigationAction sx={{ backgroundColor: '#0F2167', color: 'white' }} label="facebook" icon={<FacebookIcon />} /></a>
                        <a href="https://twitter.com"><BottomNavigationAction sx={{ backgroundColor: '#0F2167', color: 'white' }} label="twitter" icon={<TwitterIcon />} /></a>
                        <a href="https://www.youtube.com/"><BottomNavigationAction sx={{ backgroundColor: '#0F2167', color: 'white' }} label="youtube" icon={<YouTubeIcon />} /></a>
                        <a href="https://www.linkedin.com"><BottomNavigationAction sx={{ backgroundColor: '#0F2167', color: 'white' }} label="linkedin" icon={<LinkedInIcon />} /></a>
                    </BottomNavigation>
            </div>
        </div>
    )
}

export default Footer;