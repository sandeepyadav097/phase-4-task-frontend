
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import User from "./User"
import Details from "./notesDetails"
import Edit from "./edit"
import Company from "./company"
import Products from "./products"
import CompanyProducts from "./companyProducts"
import ProductDetails from "./productDetails"
import EditComp from "./EditComp"
import Add from "./add.js"

const home = () => {
    return (
        <div className="container">
            <h3>Welcome to home page</h3>
            <h5>Navigate using the nav links !!</h5>
        </div>
    )
}

const users = () => {
    return (
        <div>
            <User />
        </div>
    )
}
class Main extends Component {
    render() {
        return (
         
              <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to={'/'} className="navbar-brand">Admin Portal</Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/notes'} className="nav-link">Notes</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={'/companies'} className="nav-link">Companies</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={'/products'} className="nav-link">Products</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav> <br />
                        </div>
                        <Switch>
                     
                        <Route exact path="/" component={home}/>
                        <Route exact path="/notes" component={User}/>
                        <Route exact path="/notes/:id" component={Details}/>
                        <Route exact path="/notes/edit/:id" component={Edit}/>
                        <Route exact path="/companies" component={Company}/>
                        <Route exact path="/products" component={Products}/>
                        <Route exact path="/products/id/:id" component={ProductDetails}/>

                        <Route exact path="/add/:type" component={Add}/>
                        <Route exact path="/companyProducts/:id" component={CompanyProducts}/>
                        <Route exact path="/edit/:type/:id" component={EditComp}/>
                        
                        </Switch>
                            </Router>
          
            )
    }
}

export default Main;