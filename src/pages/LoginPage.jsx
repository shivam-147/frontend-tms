import React, { useState } from 'react'
import { Link } from 'react-router'
import API from '../axios/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


function LoginPage() {

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (form.email === '') {
                setError('Error: Email is required')
                return
            }
            if (form.password === '') {
                setError('Error: Password is require')
                return
            }
            const res = await API.post('/auth/login', form)
            login(res.data)
            navigate('/')
            setForm({ email: '', password: '' })
            setError('')
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow w-80'>
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input className="w-full border p-2 mb-3" type="text" placeholder="Enter your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input className="w-full border p-2 mb-4" type="password" value={form.password} placeholder="Enter your password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                <div className="flex flex-row justify-between">
                    <p className='text-red-700'>{error}</p>
                    <Link to='/register' className="underline">Not Regitered</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage