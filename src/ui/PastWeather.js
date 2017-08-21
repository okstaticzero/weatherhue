import React, { Component } from 'react';
import { DateRangePicker} from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates'
import Select from 'react-select';
import moment from "moment"
import 'react-dates/lib/css/_datepicker.css';
import 'react-select/dist/react-select.css';

class PastWeather extends Component {
  constructor(props){
    super(props)
    this.state={
      interval:"21600",
      startDate: new moment().subtract(1, "day"),
      endDate : new moment()
    }
  }

  componentWillUpdate(){
    //console.log(this.state)
  }

  onSumbmit = (e) =>{
    e.preventDefault()
    let start = this.state.startDate
    let end = this.state.endDate
    if(!start || !end){
       alert("Please select both a start and end date")
       return
    }
    start = Number(start.format('X'))
    end = Number(end.format('X'))
    let int = Number(this.state.interval)
    console.log("start: "+ start)
    console.log("end: "+ end)
    if((end - start) < int){
      alert("Interval is greater than date range. Please change range or interval")
       return
    }
    this.props.setRangeInterval(start, end, int)
  }
  selectChange = (val) =>{
    this.setState({interval: val.value})
  }

  render() {
   var options = [
      { value: '3600', label: 'Every Hour' },
      { value: '7200', label: 'Every 2 Hour' },
      {value:  '21600', label: 'Every 6 Hour' },
      { value: '43200', label: 'Every 12 Hour' },
      { value: '86400', label: 'Every 24 Hour' },
      { value: '604800', label: 'Every 7 days' },
      { value: '2592000', label: 'Every 30 days' }
    ];

    
    return (
      <div className="past-form">
        <div className="date-pickers">
          <div className="date-wrapper">
            <form onSubmit={this.onSumbmit}>
            <h4 className="range-title">View weather by range / interval</h4>
            <h5 className="select-label">Date range:</h5>
              <DateRangePicker
                numberOfMonths={1}
                isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
              <br/>
              <h5 className="select-label">Interval:</h5>
               <Select
                className="select-field"
                name="form-field-name"
                value={this.state.interval}
                options={options}
                onChange={this.selectChange}
                />
                <br/>
                <button className="btn btn-default">VIEW RESULTS</button>
            </form>  
          </div>
         
          
        </div>  
      </div>
    );
  }
}

export default PastWeather
