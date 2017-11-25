import React from 'react';
import {ListGroup,ListGroupItem} from 'react-bootstrap';
import MainListItem from './MainListItem';
import Header from './Header';
import Item from './Item';
import {Doughnut,Pie} from 'react-chartjs-2';

  import {
  getAccounts
} from '../api/';





export default class MainView extends React.Component {
  constructor(props){
    super(props);
    this.state={
      income:2000,
      fractions:[{name:'Apartment',money:330},{name:'Food',money:150},{name:'Subscriptions:', money:50}],
      savings:1200,
      total:1200,
      rest:0
    }
  }

  componentWillMount(){
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
    }, () => this.getChartData())

  }

  getChartData(){
    let label = this.state.fractions.map(item=>item.name);
    label.push('Rest')
    let amount = this.state.fractions.map(item=>item.money);
    amount.push(this.state.rest);
    console.log(this.state.rest)
    let colors=['#00A399','#B2D969','#FAD02F','#CFCFCD','#E58826']
    let chosenColors = label.map( (item, index) => colors[index]);
    const data = {
      labels: label,
      datasets: [{
        data: amount,
        backgroundColor: chosenColors,
        hoverBackgroundColor: chosenColors
      }]
    };
    this.setState({
      chart:data
    })
    console.log(data)
  }

  render(){
    const {total,income,saving,fractions,chart}=this.state;
    let items = fractions.map(item =><Item name={item.name} money={item.money}/>);
    let data = chart;
    return(
      <div className="container-fluid">
        <Header>Manage your cash easily!</Header>
        <div className="col-md-5">
          <Pie data={data}
               width={500}
               height={500}
               options={{
                 maintainAspectRatio: false
               }}/>
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
