import React, { Component } from 'react';
import './App.css';

class App extends Component {
  employeeFields = '';

  constructor(props) {
    super(props);
    this.employeeFields = `{id, name, email, organization,profile, designation}`;
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getDataFromServer('employees', this.employeeFields);
  }

  async getDataFromServer(schema, fields) {
    const query = `{${schema} ${fields}}`;
    const response = await fetch('http://localhost:3005/graphql', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }),
      body: JSON.stringify({query})
    });

    if(response.status === 200) {
      const respData = await response.json();
      console.log('Final:',respData);
      this.setState({ data: respData.data.employees})
    }
  }
  

  render() {
    return (
      <div className="App">
        {this.state.data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    );
  }
}

export default App;
