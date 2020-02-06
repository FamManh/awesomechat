import React from 'react';
import { Spin } from 'antd';

const Spinner = () => (
    <div
        style={{
            width: '100%',
            margin: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>
        <Spin/>
    </div>
)

export default Spinner;
