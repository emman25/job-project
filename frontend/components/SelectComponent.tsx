'use client'
import React from 'react';
import { Select } from 'antd';

export default function SelectComponent({ data, onChange }) {
    return (
        <Select
            allowClear
            style={{ width: 120 }}
            onChange={(x: { value: string; label: React.ReactNode }) => onChange(x)}
            options={data}
        />
    )
}

