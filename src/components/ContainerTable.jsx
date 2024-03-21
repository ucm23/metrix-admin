import { FireFilled } from "@ant-design/icons";
import DataTable from 'react-data-table-component';
import { Breadcrumb, Dropdown, Spin } from 'antd';

import { useNavigate } from 'react-router-dom';

"use client"

import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react"
/*import {
    Button
} from "@chakra-ui/react";*/
import { Space, Typography } from 'antd';
import { Input } from 'antd';

import {
    useBreakpointValue,
} from '@chakra-ui/react'

const { Search } = Input;
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalForm from "./ui/custom/ModalForm";


const ContainerTable = ({ children, table, label, index_, attributes, bread, screenDetails, openModal, filters, tabIndex, item_id, }) => {

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
        search,
        type,
    } = filters;

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
                company: 1,
                filter
            }

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

    /*const renderItem = ({ item, index }) => {
        let description_ = '';
        for (let i = 0; i < props_.length; i++) {
            description_ += <td>{item[props_[i]]}</td>
        }

        return (
            <tr>
                {description_}
            </tr>
        )
    }*/

    const renderColumn = ({ type, attribute, name }) => {
        const types_ = {
            'img': <img className="table-column-img" src={attribute} alt={attribute} />,
            'logo': <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 4 }}>
                <div className="table-column-logo">
                    <img className="table-column-logo-img" src={attribute} alt={attribute} />
                </div>
                <h3 className="table-column-name" >{name}</h3>
            </div>,
            'name': <h3 className="table-column-name" style={{ marginLeft: 4 }}>{attribute}</h3>,
            'created_at': <h3 className="table-column-label">{attribute}</h3>,
        }
        return types_[type]
    }

    const renderItem = ({ item, index }) => {
        const descriptionElements = props_.map(type => (
            <td key={type} onClick={() => handleTeamClick({ item, index })}>
                {renderColumn({ type, attribute: item[type], name: item?.name })}
            </td>
        ));

        return (
            <tr key={index}>
                {descriptionElements}
                {!mobile &&
                    <td style={{ width: '10%' }}>
                        <Dropdown menu={{
                            items: [
                                {
                                    label: (
                                        <a target="_blank" rel="noopener noreferrer" onClick={() => handleTeamClick({ item, index })}>
                                            Modificar
                                        </a>
                                    ),
                                },
                                {
                                    label: (
                                        <a target="_blank" rel="noopener noreferrer" onClick={() => console.log(item)}>
                                            Desactivar
                                        </a>
                                    ),
                                }
                            ]
                        }}>
                            <a onClick={(e) => e.preventDefault()} >
                                <div className="table-column-logo" style={{ marginRight: 5 }}>
                                    <DotsHorizontalIcon />
                                </div>
                            </a>
                        </Dropdown>
                    </td>
                }

            </tr>
        );
    };

    const onSearch = (value) => {
        console.log(value);
        if (value) {
            setFilter(value)
        }
    }

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});

    const onToggleModal = () => {
        setOpen(!open);
    };

    const handleTeamClick = ({ item }) => {
        try {
            if (openModal) {
                onToggleModal()
                setItem(item)
            } else {
                navigate(`${screenDetails}${item?.id}`, {
                    state: {
                        item,
                        table,
                        bread,
                        item_id,
                        screenDetails,
                        tabIndex,
                    }
                });
            }

        } catch (error) {
            console.log('error handleTeamClick: ', error);
        }
    };



    return (
        <div style={{ margin: 8 }}>
            <div styles="">
                {!loading ? <div style={{ flex: 1, height: 500, alignContent: 'center', display: 'flex', width: '100%' }}><Spin tip="Cargando..."></Spin></div> :
                    <div>
                        <div className="div-table">

                            {search && <Search allowClear placeholder="Filtrar por nombre" onSearch={onSearch} enterButton />}
                            {type &&
                                <Dropdown
                                    style={{}}
                                    className="drop-down-table"
                                    menu={{
                                        items: [
                                            {
                                                label: (
                                                    <a onClick={() => console.log('Activos')}>
                                                        Activos
                                                    </a>
                                                ),
                                            },
                                            {
                                                label: (
                                                    <a /*target="_blank" rel="noopener noreferrer"*/ onClick={() => console.log('Desactivadas')}>
                                                        Desactivadas
                                                    </a>
                                                ),
                                            },
                                        ],
                                        selectable: true,
                                        defaultSelectedKeys: [0],
                                    }}
                                >
                                    <h3 className="table-column-label">
                                        <Space>
                                            Tipo
                                            <ChevronDownIcon color="gray" />
                                        </Space>
                                    </h3>
                                </Dropdown>
                            }



                        </div>
                        <div className="table">
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        {header.map((item, index) => (
                                            <th key={`${props_[index]}-${item}-${index}`} style={{ paddingLeft: index === 0 ? 6 : 0, color: 'gray', fontWeight: 'bold', fontSize: 12 }}>{header[index]}</th>
                                        ))}
                                        {!mobile && <th style={{ width: 5 }}></th>}
                                    </tr>
                                </thead>

                                {width.map((item, index) => (
                                    <col key={`${item}-${index}`} style={{ width: `${item}%` }} />
                                ))}

                                {!mobile && <col style={{ width: 5 }} />}

                                <tbody>
                                    {memoizedValue.data.map((item, index) => renderItem({ item, index }))}
                                </tbody>
                                {/*<tfoot>
                                <tr>
                                    <td id="total">0</td>
                                </tr>
                                    </tfoot>*/}
                            </table>
                        </div>
                    </div>
                }

            </div>
            <Dialog open={open} onClose={onToggleModal}>
                <ModalForm
                    item={item}
                    title={label}
                    onClose={onToggleModal}
                />
            </Dialog>
        </div>
    )
}

export default memo(ContainerTable);