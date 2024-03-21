import { useState } from 'react';

interface ReturnIDValue {
    value: any;
    id: any;
    onToggleContent: (options: { value: any; id: any; }) => void;
}

const useSelectedIDValue_ = (
    initStateValue: any = null,
    initID: any = null,
): ReturnIDValue => {
    
    const [value, setValue] = useState(initStateValue);
    const [id, setID] = useState(initID);

    const onToggleContent = ({ value, id, }) => {
        setValue(value);
        if (id) setID(id);
    };

    return {
        value,
        id,
        onToggleContent,
    };
};

export default useSelectedIDValue_;
