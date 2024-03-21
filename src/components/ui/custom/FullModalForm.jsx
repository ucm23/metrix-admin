import NavBar from "../../../layouts/NavBar"
import ContainerTable from "../../ContainerTable";
import { index_companys_ } from "../../../api/companys/companys";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react'
import { Button, Layout, List, Avatar, Switch, Flex } from 'antd'

import {
    useBreakpointValue,
} from '@chakra-ui/react';

import { CloseOutlined } from "@ant-design/icons";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwitchLabel from "./SwitchLabel";

const { Header, Content } = Layout;


function FullModalForm({ title, }) {
    const { item_id } = useParams();

    const [header, setHeader] = useState([])
    const [body, setBody] = useState([])
    const [loader, setLoader] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    const {
        item,
        table,
        label,
        screenDetails,
    } = location.state;

    const [actived, setActived] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        try {
            setHeader(Object.keys(item));
            setBody(Object.values(item));
            setActived(item?.active)
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoader(true)
        }
    }

    const goBack = () => {
        try {
            //navigate(-1, { state: { tabIndex } });
            navigate(-1);
        } catch (error) {
            console.log('error goBack: ', error);
        }
    };

    const renderInput = (label, value) => {
        //console.log('label, value: ', label, value);
        const state = {
            'active': (
                <SwitchLabel
                    checked={actived}
                    onChange={setActived}
                />
            ),
            'name': (
                <TextField
                    label={label}
                    variant='filled'
                    defaultValue={value}
                    style={{ width: '100%', }}
                />
            ),
            'description': (
                <TextField
                    label={label}
                    variant='filled'
                    defaultValue={value}
                    multiline={true}
                    rows={4}
                    style={{ width: '100%', }}
                />
            ),
        }
        return state[label]
    }

    return (
        <div className="transition-enter">
            <Layout>
                <Header style={{ padding: 0, backgroundColor: 'white', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5 }}>
                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <Button
                            type='text'
                            onClick={() => goBack()}
                            icon={<CloseOutlined />}
                            style={{ marginLeft: 4, }}
                        />
                        <h1 className="config-header">{label}</h1>
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => alert('d')}
                        style={{ marginRight: 10, }}
                    >
                        Guardar
                    </Button>

                </Header>

                <Content style={{ backgroundColor: 'white', }}>
                    <div className="content-details">
                        {!loader ? <h1>Cargando</h1> :
                            <Flex gap="small" wrap="wrap">
                                {header.map((item, index) => renderInput(item, body[index]))}
                            </Flex>}
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default FullModalForm
