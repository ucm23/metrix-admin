import React from "react";

import { Switch  } from 'antd'

const SwitchLabel = ({ checked, onChange }) => {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <div>
                <h1><strong>{checked ? 'Habilitar' : 'Deshabilitar'}</strong></h1>
            </div>
            <Switch checked={checked} onChange={onChange} />
        </div>
    )
}

export default SwitchLabel;