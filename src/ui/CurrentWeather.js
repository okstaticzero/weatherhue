import React, { Component } from 'react';


export class CurrentWeather extends Component {
  constructor(props){
    super(props)
    this.state={
      input:""
    }
  }

  onSubmit = (e) =>{
    this.props.getCurrentWeather(this.state.input)  
    e.preventDefault()
  }
  handleChange=(e) =>{
    this.setState({input:e.target.value})
  }
  render() {
    return (
      <div className="current-form">
        <h4 className="current-title">View current weather</h4>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" 
              onChange={this.handleChange} 
              value={this.state.input} 
              placeholder="Enter Address or zip" 
            />
            <button className="btn btn-default">GO</button>
          </div>  
        </form>
      </div>
    );
  }
}

export default CurrentWeather