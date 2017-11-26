import React from 'react';

export default class Dropdown extends React.Component{
  choose=()=>{
    this.props.choose()
  }

  handleSelect = (event) =>  {

    this.props.onChange(event.target.value);
  }

  render(){
    let {types,id,name} = this.props;
    let options = types.map(type => {
      if(type instanceof Object)
        return <option key={type._id} value={type._id}>{type.name}</option>
      else
        return <option key={type} value={type}>{type}</option>    
    })
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
