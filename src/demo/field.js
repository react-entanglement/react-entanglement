import React from 'react'

export default function Field ({ value, onChange }) {
  return <input onChange={(e) => onChange(e.target.value)} value={value} />
}
