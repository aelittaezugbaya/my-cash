import React from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import MainListItem from './MainListItem';
import Header from './Header';
import Item from './Item';
import ModalFraction from './ModalFraction';

  import {
  getAccounts
} from '../api/';



export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state={
      income:2000,
      fractions:[{name:'Apartment',money:330},{name:'Food',money:150}],
      savings:1200,
      total:1200
    }
  }

  componentDidMount(){
    let amount =this.state.income;
    let tot=this.state.total;
    for(let item of this.state.fractions){
      amount-=item.money;

    }
    tot+=this.state.income;
    let save = this.state.savings+amount;
    getAccounts()
      .then(data => console.log(data))
    this.setState({
      rest:amount,
      total:tot,
      saving:save
    })
  }

  render(){
    const {total,income,saving,fractions}=this.state;
    let items = fractions.map(item =><Item name={item.name} money={item.money}/>);
    return(
      <div className="container-fluid">
        <Header>Manage your cash easily!</Header>
        <div className="col-md-5">
          <h4>Graph</h4>
        </div>
        <div className="col-md-7">
          <ListGroup>
            <MainListItem money={income}/>
            {items}
            <Item name="Rest" bsStyle="info" money={this.state.rest}/>
          </ListGroup>
          <ListGroup>
            <Item name="Total" bsStyle="danger" money={total}/>
            <Item name="Savings" bsStyle="warning" money={saving}/>
          </ListGroup>
        </div>
      </div>
    );
  }
}
