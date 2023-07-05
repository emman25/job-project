'use client'
import React from 'react';
import { Select } from 'antd';



export default function SelectComponent({ data, onChange }) {
    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    };

    return (
        <Select
            allowClear
            style={{ width: 120 }}
            onChange={x => onChange(x)}
            options={data}
        />
    )
}

