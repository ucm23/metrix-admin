import { useState } from 'react';

interface ReturnIDValue {
    value: any;
    id: any;
    array_: any;
    onToggleContent: (options: { value: any; id: any; load: boolean; array_: any; }) => void;
    loading: boolean;
}

const useSelectedIDValue = (
    initStateValue: any = null,
    initID: any = null,
    initArray: any = [],
    initLoader: boolean = false,
): ReturnIDValue => {
    const [value, setValue] = useState(initStateValue);
    const [id, setID] = useState(initID);
    const [array_, setArray_] = useState(initArray);
    const [loading, setLoading] = useState(initLoader);

    const onToggleContent = ({ value, id, load, array_ }) => {
        if (value) setValue(value);
        if (id) setID(id);
        if (array_) setArray_(array_);
        if (load) setLoading(!loading);
    };

    return {
        value,
        id,
        array_,
        onToggleContent,
        loading,
    };
};

export default useSelectedIDValue;
