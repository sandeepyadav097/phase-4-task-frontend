import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    getUser() {
        axios.get(`http://localhost:3001/notes`)
            .then(result => {
                const userList = result.data;
                this.setState({ notes: userList });
                console.log(this.state.notes);
            })
            .catch(error => console.log('there is some error ', error))
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div className="container">
             <hr/>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
           <span style={{fontSize:20}}>Notes Component</span>
            <button  className="btn  btn-success" onClick={() =>{this.props.history.push("/add/notes")}}>Add Note</button>

           </div>
         
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">S no.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Message</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.notes.map((listValue, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{listValue.title}</td>
                                    <td>{listValue.content}</td>
                                    <td><Link to={'/notes/edit/'+listValue._id}>Edit</Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to={'/notes/'+listValue._id}>Details</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}