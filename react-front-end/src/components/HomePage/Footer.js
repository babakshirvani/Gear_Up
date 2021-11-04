import * as React from 'react';
import './Footer.css'

function Footer() {

  return (
    <div className="container-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>GEAR UP</h4>
              <ul className="list-unstyled">
                <li>+1(555)-555-5555</li>
                <li>Vancouver,BC</li>
                <li>111 street SE</li>
                <li>T2E E4Z</li>
              </ul>
          </div>
          <div className="col">
            <h4>HELP</h4>
              <ul className="list-unstyled">
                <li>Contact</li>
                <li>Privacy</li>
                <li>Support</li>
                <li>About Us</li>
              </ul>
          </div>
          <div className="col">
            <h4>ACCOUNT</h4>
              <ul className="list-unstyled">
                <li>Login</li>
              
              </ul>
          </div>
          
        </div>
        <hr/>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} GEAR UP | TERMS OF CONDITIONS | PRIVACY
          </p>
        </div>
      </div>
    </div>
  )


}
export default Footer;