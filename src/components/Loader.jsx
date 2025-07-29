import React from 'react'

function Loader() {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-50">
            <div className="relative">
                <div className="w-20 h-20 rounded-full absolute border-8 border border-gray-300"></div>
                <div className="w-20 h-20 rounded-full animate-spin absolute border-8 border border-purple-700 border-t-transparent"></div>
            </div>
        </div>
    )
}

export default Loader