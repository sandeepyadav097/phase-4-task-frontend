import React, {Component} from 'react'
import axios from 'axios'
import Select from 'react-select';


const formvalid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}


export default class Add extends Component {

    constructor(props){
        super(props)
        this.state={
            listOfCompanies:[],
            formErrors: {
                title: "",
                content: ""
            }

        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.type)
        this.getOptions();
    }

    getOptions =() =>{
        axios.get("http://localhost:8081/api/selectCompanies").then((result) =>{
            this.setState({listOfCompanies:result.data})
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    handleChange = (newValue, action) => {

           if(action && action.action!='clear'){
            console.log(action, newValue)
            this.setState({id:newValue.value})
           } 
        else if(!action && this.props.match.params.type!=="notes"){
        console.log(newValue.target.name+" "+newValue.target.value)

            this.setState({[newValue.target.name]:newValue.target.value})

        }
        else  if(!action && this.props.match.params.type==="notes"){


         //   newValue.preventDefault();
            const { name, value } = newValue.target;
            let formErrors = this.state.formErrors;
            switch (name) {
                case "title":
                    formErrors.title = value.length < 3  ? "Must be atleast 3 characters long" : "";
                    break;
                case "content":
                    formErrors.content = value.length <5 ? "Must be atleast 5 characters long" : "";
                    break;
                default:
                    break;
            }
            this.setState({ [name]: value });
            console.log(this.state)

        }
       
       // console.log(event.target.name+" "+event.target.value)
    }

    handleSubmit = (event) =>{
        event.preventDefault()
if(this.props.match.params.type=="company"){

    var data={name:this.state.name, street:this.state.street, phone:this.state.phone}
    axios.post('http://localhost:8081/api/companies',data ).
    then((result)=> {
        console.log("Added")
        alert("added")
        this.props.history.goBack();

    }).catch((err) =>{
        console.log(err)
    })

}else if(this.props.match.params.type=="product"){

    var data={name:this.state.name, code:this.state.code, details:this.state.details, company:this.state.id}
    axios.post('http://localhost:8081/api/products',data ).
    then((result)=> {
        console.log("Added")
        alert("added")
        this.props.history.goBack();

    }).catch((err) =>{
        console.log(err)
    })
}
else{


    if (formvalid(this.state.formErrors)) {
        console.log('Valid form');
        const note = {
            title: this.state.title,
            content: this.state.content
        };
        var data={title:this.state.title, content:this.state.content}
    axios.post('http://localhost:3001/notes',data ).
    then((result)=> {
        console.log("Added")
        alert("added")
        this.props.history.goBack();

    }).catch((err) =>{
        console.log(err)
    })
    } else {
        alert("Please fill the form properly")
    }



   
}

    }

    render(){
        if(this.props.match.params.type=="product"){
                return(
                    <div className="container">
                    <hr/>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
               <span style={{fontSize:20}}>Add {this.props.match.params.type}</span>
                <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

               </div>
              <form className="container" onSubmit={this.handleSubmit}>
 <div className="form-group">

 <label >Company Name</label>
 <Select required maxMenuHeight={250} isClearable name="company" options={this.state.listOfCompanies}  onChange={this.handleChange}
        />
   <label >Product Name</label>
   <input required type="text" name="name" onChange={this.handleChange} className="form-control" placeholder="Name"/>

   <label >Code</label>
   <input required type="text" name="code" onChange={this.handleChange} className="form-control" placeholder="Street"/>

   <label >Details</label>
   <input required type="text" name="details" onChange={this.handleChange} className="form-control" placeholder="Phone"/>

<br/>
   <button type="submit" className="btn btn-primary">Submit</button>

   </div>
 
  
</form>

              </div>
         
                )
        }
        else if(this.props.match.params.type=="company"){
            return(
               <div className="container">
                     <hr/>
                   <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
                <span style={{fontSize:20}}>Add {this.props.match.params.type}</span>
                 <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

                </div>
               <form className="container" onSubmit={this.handleSubmit}>
  <div className="form-group">
    <label >Name</label>
    <input required type="text" name="name" onChange={this.handleChange} className="form-control" placeholder="Name"/>

    <label >Street</label>
    <input  required  type="text" name="street" onChange={this.handleChange} className="form-control" placeholder="Street"/>

    <label >Contact</label>
    <input  required  type="number" name="phone" onChange={this.handleChange} className="form-control" placeholder="Phone"/>

<br/>
    <button type="submit" className="btn btn-primary">Submit</button>

    </div>
  
   
</form>

               </div>
            )
        }
        else {
            const { formErrors } = this.state;
            return(
               <div className="container">
                     <hr/>
                   <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:10}}>
                <span style={{fontSize:20}}>Add {this.props.match.params.type}</span>
                 <button  className="btn  btn-warning" onClick={() =>{this.props.history.goBack()}}>Go Back</button>

                </div>
               <form className="container" onSubmit={this.handleSubmit}>
  <div className="form-group">
    <label >Title</label>
    <input required type="text" name="title" onChange={this.handleChange} className={`form-control ${formErrors.title.length > 0 ? 'is-invalid' : null}`} placeholder="Name"/>
    {formErrors.title.length > 0 && <span className='error text-danger'>{formErrors.title}</span>}
    <br/>
    <label >Content</label>
    <input  required  type="text" name="content" onChange={this.handleChange} className={`form-control ${formErrors.content.length > 0 ? 'is-invalid' : null}`} placeholder="Street"/>
    {formErrors.content.length > 0 && <span className='error text-danger'>{formErrors.content}</span>}
   
<br/>
    <button type="submit" className="btn btn-primary">Submit</button>

    </div>
  
   
</form>

               </div>
            )
        }
    }
}