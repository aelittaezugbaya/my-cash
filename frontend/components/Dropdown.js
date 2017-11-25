import React from 'react';

export default class Dropdown extends React.Component{
  choose=()=>{
    this.props.choose()
  }

  handleSelect = (event) =>  {
    console.log(event.target.value)

    this.props.onChange(event.target.value);
  }

  render(){
    let {types,id,name} = this.props;
    let options = types.map(type=><option key={type} value={type}>{type}</option>)
    return(
      <div className="form-group">
        <label htmlFor={id}>{name}</label>
        <select ref={ref=>this.select=ref} className="form-control" onChange={this.handleSelect} id={id} required>
          {options}
        </select>
      </div>
    )
  }
}