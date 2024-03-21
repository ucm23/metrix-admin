import { FireFilled } from "@ant-design/icons";
import DataTable from 'react-data-table-component';
import { Breadcrumb, Dropdown, Spin, Flex } from 'antd';

import { useNavigate } from 'react-router-dom';

"use client"

import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react"
import {
    Box,
    Button
} from "@chakra-ui/react";
import { Space, Typography } from 'antd';
import { Input } from 'antd';

import {
    useBreakpointValue,
} from '@chakra-ui/react'

import { Avatar } from 'antd';

const { Search } = Input;

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import AddIcon from '@mui/icons-material/Add';

import Fab from '@mui/material/Fab';


import { FileDoneOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { colorPrimary } from "../theme";



const ContainerListSimple = ({ children, table, label, index_, attributes, screenDetails, extras, index }) => {

    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const mobile = useBreakpointValue({ base: true, md: false });

    const {
        header,
        props_,
        state,
        withID,
        width,
    } = attributes;

    const {
        company_id,
    } = extras;

    useEffect(() => {
        fetchData({ mode: false });
    }, [filter]);

    const handleGoBack = () => {
        navigate('/dashboard');
    }

    const memoizedValue = useMemo(() => ({ data }), [data]);

    const fetchData = async ({ mode }) => {
        try {
            if (!mode) setLoading(false)
            let sendData = {
                id: 1,
                filter
            }

            if (company_id) sendData.company_id = company_id

            console.log("🚀 ~ file: ContainerList.js:183 ~ fetchData ~ sendData:", sendData)

            const get_data = modeFecthData(sendData)
            let result_data = await get_data.next()

            //if (result_data?.value?.status) result_data = await get_data.next();
            if (result_data?.value?.status) {
                setData(result_data?.value?.data);
                console.log('result_data?.value?.data): ', result_data?.value?.data);
                setLength(result_data?.value?.length)
                //setColumns(result_data?.value?.columns)
            }
        } catch (error) {
            console.log("🚀 ~ file: ContainerList.js:247 ~ fetchData ~ error:", error)
        } finally {
            if (!mode) setLoading(true)
        }
    }

    async function* modeFecthData(sendData) {
        yield await index_(sendData);
        //yield await index__(sendData);
    };

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData({ mode: true });
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, []);

    const renderColumn = ({ type, attribute, index }) => {
        const types_ = {
            'img': <img className="table-column-img" src={attribute} alt={attribute} />,
            'logo': <div className="table-column-logo">
                <img className="table-column-logo-img" src={attribute} alt={attribute} />
            </div>,
            'name': <h3 className="table-column-name" >{index + 1}. {attribute}</h3>,
            'created_at': <h3 className="table-column-label">{attribute}</h3>,
        }
        return types_[type]
    }

    /*const styles = {
        
            text-size-adjust: 100%;
            color: rgba(0,0,0,.87);
            font-family: "Roboto",Helvetica,Arial,sans-serif;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.25rem;
            visibility: visible;
            list-style: none;
            -webkit-tap-highlight-color: transparent;
            box-sizing: border-box;
            position: relative;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15);
            border-radius: 0.5rem;
            overflow: hidden;
            border-top: none;
            background-color: transparent;
          
    }*/

    const renderItem = ({ item, index }) => {
        /*const descriptionElements = props_.map(type => (
            <td key={type} onClick={() => handleTeamClick({ item, index })}>
                {renderColumn({ type, attribute: item[type], index })}
            </td>
        ));*/

        return (
            <div className={'re-item-list-simple'}>
                <Flex gap={10} wrap="wrap">
                    <Avatar size="large">
                        {item[props_[0]][0]}{item[props_[1]][0]}
                    </Avatar>
                    <div>
                        <h5 style={{ fontSize: 13, fontWeight: '500', textAlign: 'left' }}>{item[props_[0]]} {item[props_[1]]}</h5>
                        <h5 style={{ fontSize: 10, textAlign: 'left' }}>{item[props_[2]]}</h5>
                    </div>
                </Flex>
                <DeleteOutlined />
            </div>
        );
    };

    const handleTeamClick = ({ item }) => {
        try {
            navigate(`${screenDetails}${item?.id}`, {
                state: {
                    item,
                    table,
                    label,
                    index
                }
            });
        } catch (error) {
            console.log('error handleTeamClick: ', error);
        }
    };

    return (
        <div style={{ margin: 8, display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div style={{ width: '100%', maxWidth: 700 }}>

                {!loading ? <div style={{ flex: 1, height: 500, alignContent: 'center', display: 'flex', width: '100%' }}><Spin tip="Cargando..."></Spin></div> :
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: colorPrimary }}>
                            <h1 style={{ color: colorPrimary }}>{label}</h1>
                            <UserAddOutlined color={colorPrimary} />
                        </div>
                        <div>
                            <Accordion allowToggle>
                                {memoizedValue.data.map((item, index) => renderItem({ item, index }))}
                            </Accordion>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default memo(ContainerListSimple);