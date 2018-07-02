import React, { Component } from 'react';
import '../App.css';
import resume from'../assets/resume.pdf';
import createCard from './createCard';
import Info from "../Info"
import { Link } from 'react-router-dom'


class Home extends Component {

  constructor() {
    super();
    this.state = {
      cards:[]
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/cards')
      .then(res => res.json())
      .then(cards => this.setState({ 
        cards: cards 
      }))
  }

  render() {
    return(

  <div className="App">
            <Link to={`/form`}>Form</Link>
            <div className="header">
              <ul className="homeList">
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

          <ul className="homeList">
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
            {this.state.cards.map(card =>
              <div>
              {createCard(card)}
              <div className="cardSpacing"></div>
              </div>
                )}
              </div>
            </li>
          </ul>
      </div>
    )
  }
}


export default Home