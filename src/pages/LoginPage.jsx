import React, { useState } from 'react'
import { Link } from 'react-router'
import API from '../axios/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import open from "../assets/imgs/open.png"
import close from "../assets/imgs/closed.png"


function LoginPage() {

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

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
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Internal Server Error')
            }
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-2">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
            >
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-700 tracking-wide">
                    Welcome Back!
                </h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        autoComplete="username"
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
                    className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white p-3 rounded-lg font-bold shadow hover:from-blue-600 hover:to-green-500 transition"
                >
                    Login
                </button>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-2">
                    <span className="text-gray-600 text-sm">New here?</span>
                    <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-800 font-semibold underline text-sm transition"
                    >
                        Create Account
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage