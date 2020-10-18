import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

let k = 0
let m = 0
const Createform = () => {
    const history = useHistory()

    let [start, changestart] = useState([])
    let [str, changestr] = useState({
        name: "",
        email: "",
        phone: ""
    })

    let { name, email, phone } = str

    const fetchdata = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
            let data = res.data
            changestart(data)
        })
    }

    useEffect(() => {
        fetchdata()
        toast.success("Welcome in the world of Axios")
    }, [])

    let emp = []

    const Delete = (j) => {
        let cnf = window.confirm("Are U Want to Delete")
        if (cnf) {
            for (let i = 0; i < start.length; i++) {
                if (i === j) {
                    start.splice(i, 1)
                    emp.push(...start)
                    changestart(emp)
                }

            }
            toast.info("Successfully Deleted!")
        } else {
            emp.push(...start)
            changestart(emp)
        }
    }

    const Edit = (p) => {
        k = 1
        for (let i = 0; i < start.length; i++) {
            if (i === p) {

                changestr(start[i])
            }
        }
        m = p
    }

    const getvalue = (q, e) => {
        changestr({ ...str, [e.target.name]: q })
       
    }


    const submitform = (e) => {
        e.preventDefault()
        for (let i = 0; i < start.length; i++) {
            if (i === m) {
                start.splice(i, 1, str)
                emp.push(...start)
            }
            k = 0;
            
            changestart(emp)
           
        }
        toast.success("Successfully Updated!")
    }


    const returnpage = (e) => {
        e.preventDefault()
        emp.push(...start)
        k = 0
        changestart(emp)
        toast.dark("Return successfully!")
    }

    return (
        <>
            {
                k === 0 ? <div className="row">
                    {
                        start !== "" ?
                            <Table striped bordered hover>
                                <thead>
                                    <tr style={{ color: "red" }}>
                                        <th>Sr.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        start.map((value, index) =>
                                            <tr key={index}>
                                                <td style={{ color: "blue" }}>{index + 1}</td>
                                                <td>{value.name}</td>
                                                <td>{value.email}</td>
                                                <td>{value.phone}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => { Delete(index) }}>Delete</button>&nbsp;&nbsp;
                                               <button className="btn btn-primary" onClick={() => { Edit(index) }}>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                            : null
                    }
                </div>
                    : <form onSubmit={submitform}>
                        <label>Name : </label>&nbsp;<input type="text" name="name" value={name} placeholder="Enter your name" onChange={(e) => { getvalue(e.target.value, e) }} /><br /><br />
                        <label>Email : </label>&nbsp;<input type="text" name="email" value={email} placeholder="Enter your Email" onChange={(e) => { getvalue(e.target.value, e) }} /><br /><br />
                        <label>Contact : </label>&nbsp;<input type="text" name="phone" value={phone} placeholder="Enter your contact" onChange={(e) => { getvalue(e.target.value, e) }} /><br /><br />
                        <input type="submit" className="btn btn-success" value="Update" /> &nbsp;<button onClick={(e) => { returnpage(e) }} className="btn btn-info">Return</button>
                    </form>       
            }
          <ToastContainer 
           position="top-center"
          />
        </>
    )
}

export default Createform;