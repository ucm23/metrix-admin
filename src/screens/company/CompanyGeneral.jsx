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

//import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import ContainerList from "../../components/ContainerList";
import { index_competencies_ } from "../../api/competencies/competencies";
import ContainerListSimple from "../../components/ContainerListSimple";
import { index_users_ } from "../../api/users/users";
import { index_evaluations_ } from "../../api/evaluations/evaluations";

const { Header, Content } = Layout;

function TabPanel(props) {
    const { children, value, index, } = props;
    if (value === index) {
        return (
            <div className="scrollable-div ">
                {children}
            </div>
        )
    }
}



function CompanyGeneral({ }) {
    const { item_id, } = useParams();

    const [actived, setActived] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const { item, table, bread } = location.state;

    useEffect(() => {
        bread.push({
            path: null,
            label: item?.name
        })
        setActived(item?.active)
    }, [])

    const goBack = () => {
        try {
            navigate(-1);
        } catch (error) {
            console.log('error goBack: ', error);
        }
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <NavBar bread={bread}>
            <div>
            {/*<Layout style={{ height: '92vh', backgroundColor: 'rgb(248,248,248)' }}>*/}
                <AppBar position="static" color="white" >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        selectionFollowsFocus
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {/*<Tab label="Competencias" />*/}
                        <Tab label="Personas" />
                        <Tab label="Evaluaciones" />
                        <Tab label="Calificaciones" />
                    </Tabs>
                </AppBar>
                {/*<TabPanel value={value} index={0}>
                    <ContainerList
                        index_={index_competencies_}
                        table={table}
                        label={'Competencias'}
                        attributes={{
                            header: ['Nombre', 'Creación',],
                            props_: ['', 'name', 'created_at', 'description'],
                            state: ['active'],
                            withID: true,
                        }}
                        screenDetails={null}
                        extras={{
                            company_id: item?.id,
                            description_label: 'Descripción',
                        }}
                        item_id={item_id}
                        modal_={{
                            props_modal: ['name', 'description'],
                            props_competencie: false,
                            props_users: false,
                            props_dates: false,
                            props_point: false,
                            props_rubic: false,
                        }}
                    />
                    </TabPanel>*/}
                <TabPanel value={value} index={0}>
                    <div>
                        <ContainerListSimple
                            index_={index_users_}
                            table={table}
                            label={'Evaluadores'}
                            attributes={{
                                props_: ['first_name', 'last_name', 'email'],
                                withID: false,
                            }}
                            screenDetails={'/company/edit-competencie/'}
                            extras={{
                                company_id: item?.id,
                            }}
                            item_id={item_id}
                        />
                        <ContainerListSimple
                            index_={index_users_}
                            table={table}
                            label={'Evaluados'}
                            attributes={{
                                props_: ['first_name', 'last_name', 'email'],
                                withID: false,
                            }}
                            screenDetails={'/company/edit/'}
                            extras={{
                                company_id: item?.id,
                            }}
                            tabIndex={1}
                            item_id={item_id}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ContainerList
                        index_={index_evaluations_}
                        table={table}
                        label={'Evaluaciones'}
                        attributes={{
                            header: ['Nombre', 'Creación',],
                            props_: ['', 'name', 'created_at', 'description'],
                            state: ['active'],
                            withID: true,
                        }}
                        screenDetails={null}
                        extras={{
                            company_id: item?.id,
                            description_label: 'Instrucciones',
                            end_at: true,
                        }}
                        item_id={item_id}
                        modal_={{
                            props_modal: ['name', 'description'],
                            props_competencie: true,
                            props_users: true,
                            props_dates: true,
                            props_point: true,
                            props_rubic: true,
                        }}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Four
                </TabPanel>
                {/*<Tabs style={{ height: '100%' }}>
                    <TabList style={{ backgroundColor: 'white', borderBottomWidth: 0.5 }}>
                        <Tab className="tab-header-company">Competencias</Tab>
                        <Tab className="tab-header-company">Personas</Tab>
                        <Tab className="tab-header-company">Evaluaciones</Tab>
                        <Tab className="tab-header-company">Calificaciones</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-5px"
                        height="4px"
                        bg={'#1677ff'}
                        borderRadius="10px"
                        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    <TabPanels style={{ height: '100%' }}>
                        <TabPanel style={{ height: '100%' }}>
                            
                        </TabPanel>
                        <TabPanel>
                            
                        </TabPanel>
                        <TabPanel>
                            
                        </TabPanel>
                        <TabPanel>
                            <h1>CALIFICACIONES</h1>
                        </TabPanel>
                    </TabPanels>
                            </Tabs>*/}

                {/*<Content style={{ backgroundColor: 'white', }}>
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
                            </Content>*/}
            {/*</Layout>*/}
            </div>
        </NavBar>
    )
}

export default CompanyGeneral;
