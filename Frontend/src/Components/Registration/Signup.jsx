import React, { useState } from 'react'
import './Signup.css';
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()
    const [toast, settoast] = useState(false)
    const [userExistToast, setuserExistToast] = useState(false)
    const [otpToggle, setotpToggle] = useState(false)
    const [otp, setotp] = useState()
    const [data, setdata] = useState({
        name: '', password: '', email: '', phone: ''
    })

    function handleChange(e) {
        let { name, value } = e.target;
        setdata({
            ...data,
            [name]: value || ''
        })
    }

    async function handlesubmit(e) {

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + 'signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            console.log(result);

            if (result.userExist) {
                // alert('exist')
                setuserExistToast(true)
            }

            if (result.otp) {
                settoast(true)
                setotpToggle(true)
            }

        } catch (error) {
            console.log(error);
        }
        console.log(data);
    }

    async function handlesubmitOTP() {

        try {

            let res = await fetch(import.meta.env.VITE_API_URL + 'otp', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ otp, data })
            })

            let result = await res.json();
            if (result.success) {
                navigate('/login')
            }
            else {
                alert('incorrect OTP')
            }
        } catch (error) {
            console.log('otp', error);

        }

    }


    return (
        <div className='signup'>
            <div className='innerDiv'>
                <div className="left">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/female-web-developer-working-on-project-5691620-4759502.png" alt="Signup Developer png" />
                </div>
                <div className="right">
                    <h1>New User Signup</h1>
                    <form>
                        {!otpToggle ? <>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Name</span>
                                <input type="text" className="form-control" onChange={handleChange} value={data.name} placeholder="Username" aria-label="Username" name='name' aria-describedby="basic-addon1" />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Email</span>
                                <input type="email" name='email' className="form-control" onChange={handleChange} value={data.email} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Phone</span>
                                <input type="number" name='phone' className="form-control" onChange={handleChange} value={data.phone} placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Password</span>
                                <input type="password" name='password' className="form-control" onChange={handleChange} value={data.password} placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
                        </>
                            : <>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">OTP</span>
                                    <input type="number" name='otp' value={otp} className="form-control" onChange={(e) => setotp(e.target.value)} placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handlesubmitOTP}>Submit</button>
                            </>
                        }
                    </form>
                </div>
            </div>
            <div className={`toast ${toast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.X96HZ4SK_kq-kETk2FxNXAHaHa&pid=Api&P=0&h=25" className="rounded me-2" alt="..." />
                    <strong className="me-auto">Notification 🔔</strong>
                    <small>Just Now</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    OTP sent to your email. ✅
                </div>
            </div>

            <div className={`toast ${userExistToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.cmTcUqX-2WFqJofdiwQLBQHaHa&pid=Api&P=0&h=30" className="rounded me-2" alt="X" />
                    <strong className="me-auto">Notification 🔔</strong>
                    <small>Just Now</small>
                    <button type="button" onClick={() => setuserExistToast(false)} className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Email is already Registered
                </div>
            </div>


        </div >
    )
}

export default Signup