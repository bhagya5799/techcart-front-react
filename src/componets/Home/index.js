import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const Home = () => {


    const [invoiceData, setinvoiceData] = useState([])
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [number, setNumber] = useState('')
    const [errMsz, setErrorMsz] = useState('')

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const data = await axios.get('https://tech-apis.onrender.com/invoices')
        setinvoiceData(data.data)
        console.log(data)
    }


    const submitForm = async (event) => {
        event.preventDefault()
        // const ID = localStorage.getItem("ID")
        const url = 'https://tech-apis.onrender.com/'
        const agentDetails = {
            date: date,
            amount: amount,
            number: number,
            id: uuidv4(),

        }
        const options = {
            method: "POST",
            body: JSON.stringify(agentDetails),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data, 'data')
        if (data.length > 1) {
            console.log(data, 'dat')
            setErrorMsz('')
            localStorage.setItem("status", false,)
            localStorage.setItem("id", data.id)

        }
        else {
            setErrorMsz(data.error)
        }
    }

    return (
        <div className='home'>
            <h1 className='title-invoice'>Invoice Dashboard</h1>
            <div className='form-container'>
                <form onSubmit={submitForm}>
                    <h3 className='new-invoice'>Enter new invoice details.</h3>
                    <div className='input-card'>
                        <label htmlFor='date' className='label'>Date</label>
                        <input type='date' id='date'  value={date} onChange={((e) => setDate(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <label htmlFor='amount' className='label'>InvoiceAmount</label>
                        <input type='number' id='amount' value={amount} placeholder='InvoiceAmount' onChange={((e) => setAmount(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <label htmlFor='number' className='label'>InvoiceNumber</label>
                        <input type='number' id='number' value={number} placeholder='InvoiceNumber' onChange={((e) => setNumber(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <button type='submit' className='submit-btn' onSubmit={getData}>Submit</button><br />
                        {errMsz.length > 1 ? <span className='err-msz'>{errMsz}</span> : ''}
                    </div>

                </form>
                {/* <form onSubmit={submitForm}>
                    <h2 className=''>Enter</h2>
                    <div className='input-card'>
                        <label htmlFor='date' className='label'>Date</label>
                        <input type='date' id='date' onChange={((e) => setDate(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <label htmlFor='amount' className='label'>InvoiceAmount</label>
                        <input type='number' id='amount' placeholder='InvoiceAmount' onChange={((e) => setAmount(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <label htmlFor='number' className='label'>InvoiceNumber</label>
                        <input type='number' id='number' placeholder='InvoiceNumber' onChange={((e) => setNumber(e.target.value))} />
                    </div>
                    <div className='input-card'>
                        <button type='submit' className='submit-btn'>Submit</button><br />
                        {errMsz.length > 1 ? <span className='err-msz'>{errMsz}</span> : ''}
                    </div>

                </form> */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Invoice Amount</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {invoiceData.map((invoice,index) => (
                        <tr key={invoice.id}>
                            <td>{invoice.number}</td>
                            <td>{invoice.date.slice(0,10)}</td>
                            <td>{invoice.amount}</td>
                         
                        </tr>
))}
                </tbody>
            </table>

        </div>
    )
}
export default Home


