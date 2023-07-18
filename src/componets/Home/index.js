import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
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
    const [selectedYear, setSelectedYear] = useState("");
    const [filteredInvoiceData, setFilteredInvoiceData] = useState([]);
    const [filterNumber, setFilterNumber] = useState('')

    useEffect(() => {
        getData()
    }, [])


    // useEffect(() => {
    //     const filteredInvoiceData = invoiceData.filter((invoice) =>
    //         filteredData(invoice.date.slice(0, 10))
    //     );
    //     setFilteredInvoiceData(filteredInvoiceData);
    //     console.log('oktttykk');
    // }, []);



    const getYearValue = (e) => {
        setSelectedYear(e.target.value);


    };
    // const filteredData = (date) => {
    //     const financialYear = selectedYear.split("-");
    //     const financialYearStart = new Date(`${financialYear[0]}-04-01`);
    //     const financialYearEnd = new Date(`20${financialYear[1]}-03-31`);
    //     const objDate = new Date(date);
    //     return objDate >= financialYearStart && objDate <= financialYearEnd;
    // };

    const getData = async () => {
        const data = await axios.get('https://tech-apis.onrender.com/invoices')
        setinvoiceData(data.data)
        // console.log(data)
    }


    // const submitForm = async (event) => {
    //     event.preventDefault()
    //     const url = 'https://tech-apis.onrender.com/'
    //     const agentDetails = {
    //         date: date,
    //         amount: amount,
    //         number: number,
    //         id: uuidv4(),

    //     }
    //     const options = {
    //         method: "POST",
    //         body: JSON.stringify(agentDetails),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             accept: 'application/json',
    //         },
    //     }
    //     const response = await fetch(url, options)
    //     const data = await response.json()
    //     console.log(data,response.ok, 'data')
    //     if (response.ok===true) {
    //         setinvoiceData(data)
    //         setErrorMsz('')
    //     }
    //     else {
    //         setErrorMsz(data.error)
    //     }
    // }
    const submitForm = async (event) => {
        event.preventDefault();
        const url = 'https://tech-apis.onrender.com/';
        const agentDetails = {
            date: date,
            amount: amount,
            number: number,
            id: uuidv4(),
        };
        try {
            const response = await axios.post(url, agentDetails);
            const newData = [...invoiceData, response.data];
            setinvoiceData(newData);
            setErrorMsz('');
        } catch (error) {
            console.error(error);
            setErrorMsz(error.response.data.error);
        }
    };

    console.log(invoiceData,'invoice')


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
                number: updateNumber,
                amount: updateAmount,
                date: updateDate

            };
            await axios.put(`https://tech-apis.onrender.com/${updateNumber}`, updatedData);
            getData();
            setUpdateAmount("");
            setUpdateDate("");
            setUpdateNumber("");
            setUpdateErrorMsz("");
        }
        catch (error) {
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


    const filterInvoiceNumber = (e) => {
        setFilterNumber(e.target.value)
    }

    const sendBtn = () => {
        const filteredData = invoiceData.filter((invoice) =>
            parseInt(invoice.number) === parseInt(filterNumber)
        );
        setFilteredInvoiceData(filteredData);
    };

    const sendYearBtn =()=>{
        const filteredInvoiceData = invoiceData.filter((invoice) => 
        (invoice.date.slice(0, 4) === selectedYear)
            // console.log(typeof (invoice.date.slice(0, 4)))
            // filteredData(invoice.date.slice(0, 10))
        );
        console.log(filteredInvoiceData)
        setFilteredInvoiceData(filteredInvoiceData);

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
                        {errMsz.length > 0 ? <span className='err-msz'>{errMsz}</span> : ''}
                    </div>
                </form>
            </div>
            <div className='update-form-container'>
                <div className='search-tool-container'>
                    <div className='d-flex'>
                        <button onClick={clickUpdate} className='update-btn'>update Invoice &nbsp;<BsFillArrowDownCircleFill /></button>
                        <div className='expenses-filter__control'>
                                <label className='label'>Filter By year:</label>
                            <select className='option' value={selectedYear} onChange={getYearValue} onClick={sendYearBtn}>
                                    <option value='2025' >2025-26</option>
                                    <option value='2024' >2024-25</option>
                                    <option value='2023'>2023-24</option>
                                    <option value='2022'>2022-23</option>
                                    <option value='2021'>2021-22</option>
                                    <option value='2020'>2020-21</option>
                                    <option value='2019'>2019-20</option>
                                </select>
                        </div>
                        {/* <div className='nbr__container'>
                            <input type='number' placeholder='Search year' id="filter__nbr"
                                className='filter__nbr' value={selectedYear} onChange={getYearValue} />
                            <button className='send__btn' onClick={sendYearBtn}>Send</button>
                        </div> */}
                    </div>
                    <div className='nbr__container'>
                        <input type='number' placeholder='Search Number' id="filter__nbr"
                            className='filter__nbr' value={filterNumber} onChange={filterInvoiceNumber} />
                        <button className='send__btn' onClick={sendBtn}>Send</button>
                    </div>
                </div>
                {toggle &&
                    <form onSubmit={submitUpdateForm}>
                        <table>
                            <thead>
                                <tr>
                                    <th className='th-title'>Send Invoice number</th>
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
                                            type="number"
                                            value={updateNumber}
                                            placeholder="Invoice Number"
                                            onChange={(e) => setUpdateNumber(e.target.value)}
                                        />
                                    </td>
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
                                        <button type="submit" className='updateBtn' >Update</button>
                                        {updateErrorMsz && <span className="err-msz">{updateErrorMsz}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                }
            </div>

            {
                filteredInvoiceData.length > 0 ? (
                    <table>
                        <thead>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Invoice Amount</th>
                        </thead>
                        <tbody>
                            {filteredInvoiceData.map((invoice, index) => (
                                <tr key={invoice.id}>
                                    <td>{invoice.number}</td>
                                    <td>{invoice.date.slice(0, 10)}</td>
                                    <td>{invoice.amount}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteInvoice(invoice.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>)}
        </div>
    )
}
export default Home




