import React, { useState } from 'react'
import { Link } from 'react-router'
import API from '../axios/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import open from '../assets/imgs/open.png'
import close from '../assets/imgs/closed.png'


function RegisterPage() {

    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (form.name === '') {
                setError('Error: Name is required')
                return
            }
            if (form.email === '') {
                setError('Error: Email is required')
                return
            }
            if (form.password === '') {
                setError('Error: Password is require')
                return
            }

            const res = await API.post('/auth/register', form)
            login(res.data)
            navigate('/')
            setForm({ name: '', email: '', password: '' })
            setError('')
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Interal Server Error')
            }
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-2">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
            >
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-700 tracking-wide drop-shadow">
                    Create Your Account
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        autoComplete="off"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <div className="w-full border border-gray-300 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-blue-400 transition">
                        <input
                            className="w-full p-3 bg-transparent focus:outline-none"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            placeholder="Enter your password"
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            className="px-2 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            style={{ width: "50px" }}
                        >
                            {showPassword ? <img src={open} alt="Show" /> : <img src={close} alt="Hide" />}
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center font-semibold">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                >
                    Register
                </button>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-2">
                    <span className="text-gray-600 text-sm">Already have an account?</span>
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold underline hover:text-purple-600 transition"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage