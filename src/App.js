import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import resume from'./resume.pdf';
import createCard from './createCard';


class App extends Component {
  


  info = {
      picture: logo,
      title:"Title of project",
      skills: [
        <li><p className="skills"> one </p></li>,
        <li><p className="skills"> two </p></li>,
        ],
      links: [
      <li><p className="skills"> three </p></li>,
      <li><p className="skills"> four </p></li>,
      ],
      description: "some description test test test test test test test twst ests tste tsstf hsjf haehwiuhaiuhsi uanina dsiuh fiuhi uhiuh bvi biuvhaiuha iuhia uhiuah eiuhaiuhaihkjh hfiuah iuhi uahihi fahi hiuh"
    };

  render() {
    
    return (
      <div className="App">
            <a href="form.js"> form </a>
            <div className="header">
              <ul>
                <li>
                  <div className="name">
                    <p> Dainger Adams </p>
                    <p> Engineered Coder </p>
                  </div>
                </li>
                <li>
                  <div className="contact">
                    <p> email: adamsda96@gmail.com </p>
                    <p> phone: (801) 388-4185 </p>
                  </div>
                </li>
              </ul>
            </div>

          <ul>
            <li>
              <div className="nav">
                <div className="directions">
                  <p> About Me </p>
                  <a href={resume}>Resume </a>
                </div>
              </div>
            </li>
            <li>
            <div id="cards">
              {createCard(this.info)}
              <div className="cardSpacing"></div>
              {createCard(this.info)}
              <div className="cardSpacing"></div>
              {createCard(this.info)}
              </div>
            </li>
          </ul>
      </div>
    );
  }
}

export default App;

