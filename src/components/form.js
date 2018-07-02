import React from 'react';
import Card from '../Db/cardFunctions.js'

var jsonfile = require('jsonfile')
var file = './cards.json'

export default class Form extends React.Component {

  constructor() {
    super();
    this.state = {
      title: null,
      description:null,
      image:null,
      image64:null,
      skills:[],
      links:[],
      linkNames:[],
      files:[],
      fileNames:[],
      hidden:false
    }

    this.fileInput = React.createRef();
 }


  handleTitle = (event) => {
    this.setState({title: event.target.value})
  };

  handleDescription = (event) => {
    this.setState({description: event.target.value})
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
  handleImage = (event) => {

    this.getBase64(event.target.files[0], (result) => {
     this.setState({image64: result})
    });

    var file = URL.createObjectURL(event.target.files[0])

    this.setState({
      image: file
    })
  };

  addSkill = () => {
    this.setState({
      skills: this.state.skills.concat([''])
    });
  };

  addLink = () => {
    this.setState({
      linkNames: this.state.linkNames.concat(['']),
      links: this.state.links.concat(['']),
    });
  };

  addFile = () => {
    this.setState({
      files: this.state.files.concat([null]),
      fileNames: this.state.fileNames.concat(['']),
    });
  };

  removeSkill = (idx) => () => {
    console.log(idx)
    this.setState({
      skills: this.state.skills.filter((s, sidx) => idx !== sidx)
    });
  };

  removeLink = (idx) => () => {
    console.log(idx)
    this.setState({
      links: this.state.links.filter((l, lidx) => idx !== lidx),
      linkNames: this.state.linkNames.filter((l, lidx) => idx !== lidx)
    });
  };

  removeFile = (idx) => () => {
    console.log(idx)
    this.setState({
      files: this.state.files.filter((f, fidx) => idx !== fidx),
      fileNames: this.state.fileNames.filter((f, fidx) => idx !== fidx)
    });
  };

  changeSkill = (idx) => (event) => {
    
    this.state.skills[idx] = event.target.value;
  }

  changeLink = (idx) => (event) => {
    this.state.links[idx] = event.target.value;
  }

  changeLinkName = (idx) => (event) => {
    this.state.linkNames[idx] = event.target.value;
  }

  changeFile = (idx) => (event) => {
    var obj = URL.createObjectURL(event.target.files[0]) 
    
    this.state.files[idx] = obj;
  }

  changeFileName = (idx) => (event) => {
    this.state.fileNames[idx] = event.target.value;
  }

  validate = (val) => {
    if (val == null) { 
      return false
    }
    
    return true

  }
  validateS = (val) => {
    for (var i=0; i<val.length; i++){
      if (val[i] == null) { 
        return false
      }
    } 
    
    return true

  }

  validateL = (val) => {
    for (var i=0; i<this.state.links.length; i++){
      if (this.state.links[i].length > 0) { 
        return false
      }
      if (this.state.linkNames[i].length > 0) {
        return false
      }
    } 
    
    return true

  }

  validateF = (val) => {
    for (var i=0; i<this.files.length; i++){
      if (this.files[i] == null) { 
        return false
      }
      if (this.filesNames[i].length > 0) {
        return false
      }
    } 
    
    return true

  }

  clear = () => {
    var form = this.state
    this.saveCard(form)
    this.setState({
      title: '',
      description:'',
      image:null,
      skills:[],
      links:[],
      files:[],
    })
  }

  handleSubmit = (event) => {
    /*var title = this.validate(this.state.title)
    var des = this.validate(this.state.description)
    var im = this.validate(this.state.image)
    var sk = this.validateS(this.state.skills)
    var ln = this.validateL(this.state.links)
    var fl = this.validateF(this.state.files)

    console.log(this.state)
    if (!title) {
      alert('Missing Title')
    }
    else if (!des) {
      alert('Missing Description')
    }
    else if (!im) {
      alert('Missing Image')
    }
    else if (!sk) {
      alert('Missing Skill')
    }
    else if (!ln) {
      alert('Missing Link')
    }
    else if (!fl) {
      alert('Missing fl')
    }
    else {*/

    console.log(JSON.stringify(this.state))
    this.saveCard(this.state)
    var string = 'A name was submitted: ' + this.state.title+'\nwith description: '+this.state.description+'\n with these skills\n '
    this.state.skills.map((skill,idx) => {
      string = string + skill.skill + '\n'
    })
    //this.clear()
    alert(string);
    
    event.preventDefault();
  };

  saveCard = (form) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('http://localhost:3001/cards', {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(form),
    })
  }


  render() {
    return (

          <form onSubmit={this.handleSubmit}>
          <ul className='formList'>
            <li>
              <label> Title: </label>
              <input type="text" value={this.state.title} onChange={this.handleTitle} require/>

            <label> Description: </label>
              <textarea value={this.state.description} onChange={this.handleDescription} />
            </li>
            <li>
            <label> Image: </label>
              <input type='text' id="base64" hidden/>
              <input type="file" onChange={this.handleImage} ref={this.fileInput}/>
              <img className="App-logo" src={this.state.image}/>
            </li>
            <li>
              <label> Skills: </label>
                

                {this.state.skills.map((skills, idx) => (
                  <div>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeSkill(idx)}
                      value = {skills.skill}
                    />
                    <button type="button" onClick={this.removeSkill(idx)} className="rmvSkills">-</button>
                  </div>
                  ))}
                <input type="button" value="Add Skill" onClick={this.addSkill}/>
              </li>

              <li>
              <label> Links: </label>
                

                {this.state.links.map((links, idx) => (
                  <div>
                  <label> Link Title: </label>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeLinkName(idx)}
                    />
                    <label> Link: </label>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeLink(idx)}
                      //value = {links}
                    />
                    <button type="button" onClick={this.removeLink(idx)} className="rmvSkills">-</button>
                  </div>
                  ))}
                <input type="button" value="Add Link" onClick={this.addLink}/>
              </li>

              <li>
              <label> Files: </label>
                

                {this.state.files.map((files, idx) => (
                  <div>
                  <label> File Title: </label>
                    <input
                      type="text"
                      className='Formfiles'
                      onChange={this.changeFileName(idx)}
                      //value={this.state.fileNames[idx]}
                    />
                    <label> File: </label>
                    <input
                      type="file"
                      className='Formfiles'
                      onChange={this.changeFile(idx)}
                      //value = {files.file}
                    />
                    <button type="button" onClick={this.removeFile(idx)} className="rmvFiles">-</button>
                  </div>
                  ))}
                <input type="button" value="Add File" onClick={this.addFile}/>
              </li>
                
            </ul>

            <div id="submitLine">

            <input type="submit" value="Submit"/>
            <button type="button" id="clear" onClick={this.clear}> clear </button>
            
            </div>

          </form>
        );
    }
}