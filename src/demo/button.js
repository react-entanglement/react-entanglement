import React from 'react'

export default function Button ({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}
