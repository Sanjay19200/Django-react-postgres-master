import React, { Component} from "react";
import axios from 'axios'
import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logedin: false,
            token: ''
        };
        this.fetchUser = this.fetchUser.bind(this)
    }
    fetchUser (){
        if(this.state.logedin){
            this.setState({
                logedin: false
            })
        } else {
              try {
               const data = axios.post(
                  process.env.REACT_APP_API_URL + '/users/login',
                    JSON.stringify({
                        'email': 'testtwo@test.com',
                        'password': 'testpassword'
                    }),
                    {
                            headers: { "Content-Type": "application/json" }
                        }
                    
                  ).then(response =>{
                      console.log(response)
                      this.setState({
                          logedin: true,
                          token: response.data.token
                      })
                  })
              } catch (err) {
                return err
              }
        }
    }
  render(){
    return(
      <div className="App">
        { this.state.logedin ? (
            <div className="unlogged">
              <h1>{this.state.token}</h1>
               <button className="button" onClick={(e)=> this.fetchUser(e)}>clear</button>
            </div>
        ) : (
            <div className="unlogged">
                <h1> testtwo@test.com</h1>
                <h1>testpassword</h1>
                <button className="button" onClick={(e)=> this.fetchUser(e)}>Send database</button>
            </div>
        )
        }
      </div>
    );
  }
}

export default hot(module)(App);
