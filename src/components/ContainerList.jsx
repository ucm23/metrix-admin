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

import TextField from '@mui/material/TextField';

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import AddIcon from '@mui/icons-material/Add';

import Fab from '@mui/material/Fab';

import { FileDoneOutlined } from '@ant-design/icons';
import { colorPrimary, styleModal } from "../theme";

import Modal from '@mui/material/Modal';
import ModalForm from "./ui/custom/ModalForm";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const ContainerList = ({ children, table, label, index_, attributes, screenDetails, extras, tabIndex, item_id, modal_ }) => {

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
        description_label,
        end_at
    } = extras;

    const {
        props_modal,
        props_competencie,
        props_users,
        props_dates,
        props_point,
        props_rubic,
    } = modal_;

    useEffect(() => {
        fetchData({ mode: false });
        console.log('filter: ', filter);
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
            setTimeout(() => {
                if (!mode) setLoading(true)
            }, 1000)
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

    const styles_ = {
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        overflow: 'visible',
        textOverflow: 'ellipsis',
    };

    const renderItem = ({ item, index }) => {
        /*const descriptionElements = props_.map(type => (
            <td key={type} onClick={() => handleTeamClick({ item, index })}>
                {renderColumn({ type, attribute: item[type], index })}
            </td>
        ));*/

        return (
            <AccordionItem>
                {({ isExpanded }) => (
                    <div className={isExpanded ? 'accordion-card-list-hover' : 'accordion-card-list'} style={{ borderTopWidth: index !== 0 && 1 }}>
                        <h2>
                            <AccordionButton className={isExpanded ? 'accordion-card-list-header-hover' : "accordion-card-list-header"} style={{ justifyContent: 'space-between' }}>
                                <Flex gap={10} wrap='nowrap'>
                                    <Avatar size="large" icon={<FileDoneOutlined />} />
                                    <div>
                                        <h5 style={{ fontSize: 13, fontWeight: '500', textAlign: 'left', width: mobile ? 195 : '100%' }} >
                                            {item[props_[1]]}
                                        </h5>
                                        <h5 style={{ fontSize: 10, textAlign: 'left', }}>Publicado: {item[props_[2]]}</h5>
                                    </div>
                                </Flex>
                                <Dropdown menu={{
                                    items: [
                                        {
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer" onClick={() => handleTeamClick({ item })}>
                                                    Modificar
                                                </a>
                                            ),
                                        },
                                        {
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer" onClick={() => console.log(item)}>
                                                    Eliminar
                                                </a>
                                            ),
                                        }
                                    ]
                                }}>
                                    <a onClick={(e) => e.preventDefault()} >
                                        <div className="table-column-logo">
                                            <DotsHorizontalIcon />
                                        </div>
                                    </a>
                                </Dropdown>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} className="accordion-card-list-body">
                            <div className="padding-worse">
                                <h1 style={{ fontSize: 10 }}>{description_label}</h1>
                                <h1>{item[props_[3]]}</h1>
                            </div>

                            {(typeof end_at === 'boolean') &&
                                <h1 className="ksBjEc" style={{ padding: 10, borderTopWidth: 1, paddingBottom: 0, marginTop: 5 }}>{end_at ? `Fecha: ${item?.end_at}` : 'Sin fecha limite'}</h1>
                            }
                        </AccordionPanel>
                    </div>
                )}
            </AccordionItem>
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
            if (screenDetails) {
                navigate(`${screenDetails}${item?.id}/${tabIndex}/edit`, {
                    state: {
                        item,
                        table,
                        label,
                        item_id,
                        tabIndex,
                        screenDetails,
                    }
                });
            } else {
                onToggleModal()
                setItem(item)
            }
            /**/
        } catch (error) {
            console.log('error handleTeamClick: ', error);
        }
    };

    return (
        <div style={{ margin: 8, display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div style={{ width: '100%', maxWidth: 700 }}>

                <Fab variant="extended" size='medium' style={{ backgroundColor: colorPrimary, color: 'white', marginTop: 6 }}>
                    <AddIcon sx={{ mr: 1 }} />
                    <h1 style={{ textTransform: 'initial' }}>Crear</h1>
                </Fab>

                {!loading ? <div style={{ height: 500, alignItems: 'center', display: 'flex', justifyContent: 'center' }}><Spin tip="Cargando..."><div style={{ width: 200 }}></div></Spin></div> :
                    <div>
                        {/*<div style={{ display: 'flex', alignContent: 'flex-start' }}>
                            <div className="width-100">
                                <Select
                                    value={0}
                                    //onChange={handleChange}
                                >
                                    <MenuItem value={0}>
                                        None
                                    </MenuItem>
                                    <MenuItem value={1}>Ten</MenuItem>
                                </Select>
                            </div>
                            <Dropdown
                                style={{}}
                                //className="drop-down-table"
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer" onClick={() => console.log('Activos')}>
                                                    Activos
                                                </a>
                                            ),
                                        },
                                        {
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer" onClick={() => console.log('Desactivadas')}>
                                                    Desactivadas
                                                </a>
                                            ),
                                        },
                                    ],
                                    selectable: true,
                                    defaultSelectedKeys: [0],
                                }}
                            >
                                <h3>
                                    <Space>
                                        Tipo
                                        <ChevronDownIcon color="gray" />
                                    </Space>
                                </h3>
                            </Dropdown>
                            </div>*/}
                        <FormControl className="width-100" size="small" style={{ marginTop: 12, marginBottom: 12 }}>
                            <Flex gap="small" style={{ flexDirection: mobile ? 'column' : 'row', }} className="width-100">
                                <div className={!mobile && "width-100"} style={{ width: !mobile && '70%' }} >
                                    <TextField
                                        placeholder={'Buscar...'}
                                        variant='outlined'
                                        size="small"
                                        style={{ width: '100%', }}
                                        InputProps={{ className: 'placeholder' }}
                                    />
                                </div>

                                <div className={!mobile && "width-100"} style={{ width: !mobile && '30%' }} >
                                    <Select
                                        value={0}
                                    //onChange={handleChange}
                                    >
                                        <MenuItem value={0}>
                                            Habilitados
                                        </MenuItem>
                                        <MenuItem value={1}>Deshabilitados</MenuItem>
                                    </Select>
                                </div>
                            </Flex>
                        </FormControl>
                        <div>
                            <Accordion allowToggle>
                                {memoizedValue.data.map((item, index) => renderItem({ item, index }))}
                            </Accordion>
                        </div>
                    </div>
                }

            </div>

            {/*
                props_modal,
                props_competencie,
                props_users,
                props_dates,
                props_point,
            */}
            <Modal
                open={open}
                onClose={onToggleModal}
            >
                <Box sx={{ ...styleModal }}>
                    <ModalForm
                        item={item}
                        title={label}
                        company_id={company_id}
                        props_modal={props_modal}
                        props_competencie={props_competencie}
                        props_users={props_users}
                        props_dates={props_dates}
                        props_point={props_point}
                        props_rubic={props_rubic}
                        onClose={onToggleModal}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default memo(ContainerList);