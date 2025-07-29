import React from 'react'

function Loader() {
    return (
        <div className="flex justify-center items-center">
            <div class="relative">
                <div className="w-12 h-12 rounded-full absolute border-8 border-dashed border-gray-200"></div>

                <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-dashed border-purple-500 border-t-transparent">
                </div>
            </div>

        </div>
    )
}

export default Loader