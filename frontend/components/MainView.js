import React from 'react';
import {ListGroup,ListGroupItem,Button} from 'react-bootstrap';
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
    this.add=this.add.bind(this)
    this.state={
      income:this.props.income,
      fractions:[],
      savings:0,
      transactions: [],
      debtors: [],
      total:7000,
      rest:0
    }
  }
  componentWillMount(){
    this.getFractions();
    this.getTransactions();
  }

  getTransactions() {
    return window.fetch('/api/transactions', {headers: {Accept: 'application/json'}})
      .then(data => data.json())
      .then(data => this.setState({transactions: data}));
  }

  getFractions = () => {
    console.log('getting fractions')
    window.fetch('/api/fractions',
      {headers: {Accept: 'application/json'}})
      .then(data => data.json())
      .then(data=>{
        this.setState({
          fractions:data
        },()=>{
          this.getTransactions()
            .then(this.update)
        })
      })
  }

  update = () => {
    
    let {income} =this.state;
    let spendings = 0;
    for(let item of this.state.fractions){
      spendings += parseInt(item.amount)
    }

    let save =  income - spendings;
    this.setState({
      rest: save,

      saving: this.state.total - spendings
    }, () => this.getChartData())

  }

  getChartData(){
    let label = this.state.fractions.map(item=>item.name);
    label.push('Rest')
    let amount = this.state.fractions.map(item=>item.amount);
    amount.push(this.state.rest);
    let colors=['#00A399','#B2D969','#FAD02F','#CFCFCD','#E58826','#0569A6','#F2EBBF']
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
  }
  add(){
    let array = this.state.fractions;
    array.push({name:'Ikea',money:100})
    this.setState({
      fractions:array
    },() => this.update())

  }
  clean(){
    localStorage.removeItem('income');
    window.location.reload()
  }

  sumTransactions() {
    if(this.state.transactions.length == 0)
      return 0;
    
    return this.state.transactions
      .filter(transaction => transaction.fractionId == 'Unfiltered')
      .reduce((total = 0, item) => {
        if(total instanceof Object) total = 0;
        return total = total + parseFloat(item.amount);
      });
  }

  render(){
    const {total,income,saving,fractions,chart}=this.state;
    let items = fractions.map(item => (
      <Item 
        key={item._id}
        name={item.name}
        id={item._id}
        money={item.amount}
        onDelete={this.getFractions}
        transactions={
          this.state.transactions.filter(transaction => transaction.fractionId == item._id)
        }
      />
    ));
    let data = chart;
    return(
      <div className="container-fluid">

        <div className="col-md-5">
          <Pie data={data}
               width={500}
               height={500}
               options={{
                 maintainAspectRatio: false
               }}/>
        </div>
        <div className="col-md-7">
          <ListGroup condensed>
            <MainListItem amount={income} onModalChange={this.getFractions}/>
            {items}
            <Item name="Unsorted" bsStyle="" onDelete={this.getFractions} money={this.sumTransactions()} transactions={this.state.transactions.filter(transaction => transaction.fractionId == 'Unfiltered')}/>            
            <Item name="Rest" bsStyle="info" money={this.state.rest}/>
          </ListGroup>
          <ListGroup>
            <Item name="Total" bsStyle="danger" money={total}/>
            <Item name="Savings" bsStyle="warning" money={saving}/>
          </ListGroup>
          <Button bsStyle="primary" onClick={()=>this.clean()}>Change income</Button>
        </div>

      </div>
    );
  }
}
