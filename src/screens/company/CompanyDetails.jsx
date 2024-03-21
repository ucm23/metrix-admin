import NavBar from "../../layouts/NavBar"
import ContainerTable from "../../components/ContainerTable";
import { index_companys_ } from "../../api/companys/companys";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react'
import { Button, Layout, List, Avatar, Switch, Flex } from 'antd'

import {
    useBreakpointValue,
} from '@chakra-ui/react';

import { CloseOutlined } from "@ant-design/icons";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwitchLabel from "../../components/ui/custom/SwitchLabel";

const { Header, Content } = Layout;


function CompanyDetails({ }) {
    const { companyId } = useParams();

    const [actived, setActived] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state;

    useEffect(() => {
        setActived(item?.active)
    }, [])

    const goBack = () => {
        try {
            navigate(`/company`);
        } catch (error) {
            console.log('error goBack: ', error);
        }
    };

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
                        <h1 className="config-header">Configuración de la clase</h1>
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
                        <h1 className="title-details">Detalles</h1>
                        <Flex gap="small" wrap="wrap">
                            <TextField
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                defaultValue={item.name}
                                style={{ width: '100%' }}
                            />
                            <SwitchLabel
                                checked={actived}
                                onChange={setActived}
                            />
                        </Flex>

                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default CompanyDetails
