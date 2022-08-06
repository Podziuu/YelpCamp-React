import React from 'react'

const Error = (props) => {
    console.log(props.data)
    const error = props.data.data;
    console.log(error)
  return (
    <div className="bg-red-400 w-96 mx-auto p-4">
        <h4 className="text-red-900 font-bold text-xl">{error.name}</h4>
        <p className="text-red-800 font-semibold text-lg">{error.message}</p>
    </div>
  )
}

export default Error