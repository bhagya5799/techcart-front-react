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
    const [toggle, setToggle] = useState(false)

    const [updateNumber, setUpdateNumber] = useState('')
    const [updateAmount, setUpdateAmount] = useState('')
    const [updateDate, setUpdateDate] = useState('')
    const [updateErrorMsz, setUpdateErrorMsz] = useState("");
    const [selectedYear, SetSelectYear] = useState('')

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const data = await axios.get('https://tech-apis.onrender.com/invoices')
        setinvoiceData(data.data)
        // console.log(data)
    }


    const submitForm = async (event) => {
        event.preventDefault()
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
        // console.log(data, 'data')
        if (data.length > 1) {
            setinvoiceData(data)
           
            setErrorMsz('')
        }
        else {
            setErrorMsz(data.error)
        }
    }


    const deleteInvoice = async (id) => {
        
        try {
            await axios.delete(`https://tech-apis.onrender.com/${id}`);
            // Refresh the invoice data after deletion
            getData();
        } catch (error) {
            console.error(error);
        }
    };


    const submitUpdateForm = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                amount: updateAmount,
                date: updateDate,
            };
            await axios.put(`https://tech-apis.onrender.com/${updateNumber}`, updatedData);
            getData();
            setUpdateAmount("");
            setUpdateDate("");
            setUpdateNumber("");
            setUpdateErrorMsz("");
        } catch (error) {
            console.error(error);
            setUpdateErrorMsz(error.response.data.error);
        }
    };


    const clickUpdate = () => {
        if (!toggle) {
            setToggle(true)
        } else {
            setToggle(false)
        }

    }

    return (
        <div className='home'>
            <h1 className='title-invoice'>Invoice Dashboard</h1>
            <div className='form-container'>
                <form onSubmit={submitForm} className='form'>
                    <h3 className='new-invoice'>Enter new invoice details.</h3>
                    <div className='input-card'>
                        <label htmlFor='date' className='label'>Date</label>
                        <input type='date' id='date' value={date} onChange={((e) => setDate(e.target.value))} />
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

            </div>
            <div className='update-form-container'>
                <div className='d-flex'>
                    <button onClick={clickUpdate} className='update-btn'>update Invoice</button>
                    <div className='expenses-filter__control'>
                        <label className='label'>Filter By year:</label>
                        <select className='option' value={''} onChange={((e) => console.log(e.target.value))}>
                            <option value='2024-25' >2024-25</option>
                            <option value='2023-24'>2023-24</option>
                            <option value='2022-23'>2022-23</option>
                            <option value='2021-22'>2021-22</option>
                            <option value='2020-21'>2020-21</option>
                        </select>
                    </div>
                </div>
                {toggle &&
                    // <form className='update-form' >
                    //     <label htmlFor='numbers' className='label'>InvoiceNumber:</label>
                    //     <input type='number' id='numbers' value={updateNumber} placeholder='InvoiceNumber' onChange={((e) => setUpdateNumber(e.target.value))} />
                    //     <label htmlFor='amounts' className='label'>InvoiceAmount:</label>
                    //     <input type='number' id='amounts' value={updateAMount} placeholder='InvoiceAmount' onChange={((e) => setUpdateAmount(e.target.value))} />
                    //     <label htmlFor='dates' className='label'>Date:</label>
                    //     <input type='date' id='dates' value={updateDate} onChange={((e) => setUpdateDate(e.target.value))} />
                    //     <div className='expenses-filter__control'>
                    //         <label className='label'>year:</label>
                    //         <select className='option' value={''} onChange={((e) => console.log(e.target.value))}>
                    //             <option value='2024-25' >2024-25</option>
                    //             <option value='2023-24'>2023-24</option>
                    //             <option value='2022-23'>2022-23</option>
                    //             <option value='2021-22'>2021-22</option>
                    //             <option value='2020-21'>2020-21</option>
                    //         </select>
                    //     </div>
                    // </form>
                    <form onSubmit={submitUpdateForm}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Updated Invoice Date</th>
                                    <th>Updated Invoice Amount</th>
                                    <th>Update Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            className="td-input"
                                            type="date"
                                            value={updateDate}
                                            onChange={(e) => setUpdateDate(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="td-input"
                                            type="number"
                                            value={updateAmount}
                                            placeholder="Update Amount"
                                            onChange={(e) => setUpdateAmount(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="td-input"
                                            type="number"
                                            value={updateNumber}
                                            placeholder="Invoice Number"
                                            onChange={(e) => setUpdateNumber(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button type="submit">Update</button>
                                        {updateErrorMsz && <span className="err-msz">{updateErrorMsz}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    }
            </div>
            <table className='table-all-data'>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Invoice Amount</th>
                        <th>Delete Invoice Number</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData.map((invoice, index) => (
                        <tr key={invoice.id}>
                            <td>{invoice.number}</td>
                            <td>{invoice.date.slice(0, 10)}</td>
                            <td>{invoice.amount}</td>
                            <td><button className='delete-btn' onClick={() => deleteInvoice(invoice.number)}>Delete</button></td>
                            {/* <td>
                                <div className="update-form">
                                    <input
                                        type="number"
                                        value={updateNumber}
                                        placeholder="Update Amount"
                                        onChange={(e) => setUpdateAmount(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={updateDate}
                                        onChange={(e) => setUpdateDate(e.target.value)}
                                    />
                                    <button onClick={() => (invoice.id)}>Update</button>
                                    {updateErrorMsz && <span className="err-msz">{updateErrorMsz}</span>}
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Home


