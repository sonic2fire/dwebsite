import React, { Component } from 'react';
import logo from '../logo.svg';


export default function createCard(card) {

  console.log(card)

  return (

    <div className="card">
    
        <img className="App-logo" src={card.image64} alt="logo" />


      <div className="right">

        <h1 className="title"> {card.title} </h1>
        <ul>
        <li><p className="skills_title">Skills:</p></li>

        {card.skills.map(skill =>
        <li><p className="skills"> { skill } </p></li>
        )}

        </ul>

        <ul>
        <li><p className="links">Links:</p></li>

        {card.linkNames.map(name =>
        <li><p className="skills"> {name} </p></li>,
        )}

        </ul>

      </div>

      
      <p className="description"> {card.description}</p>
      
    </div>


  )
}