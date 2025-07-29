import React from 'react'

function Loader() {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-50">
            <div className="relative flex justify-center items-center" style={{ minHeight: '5rem', minWidth: '5rem' }}>
                <div className="w-20 h-20 rounded-full absolute border-8 border-gray-300"></div>
                <div className="w-20 h-20 rounded-full animate-spin absolute border-8 border-purple-700 border-t-transparent"></div>
            </div>
        </div>
    )
}

export default Loader