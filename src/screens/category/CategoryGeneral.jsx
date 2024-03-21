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

import { colorPrimary, } from "../../theme";

import {
    SettingOutlined,
} from "@ant-design/icons";

import Modal from '@mui/material/Modal';
import ModalFormCategory from "./ModalFormCategory";

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

const styleModal = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    bottom: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
};



function CategoryGeneral({ }) {
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

    const [open, setOpen] = useState(false);
    const [item_, setItem_] = useState({});

    const onToggleModal = () => {
        setOpen(!open);
    };

    const openModal = () => {
        onToggleModal()
        setItem_(item)
    }

    return (
        <NavBar bread={bread}>
            <div>
                {/*<Layout style={{ height: '92vh', backgroundColor: 'rgb(248,248,248)' }}>*/}
                <AppBar position="static" color="white" style={{ display: 'flex', flexDirection: 'row' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        selectionFollowsFocus   
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab label="Evaluaciones" />
                    </Tabs>

                    <a onClick={openModal} style={{ display: 'flex', alignContent: 'center', width: 30, justifyItems: 'center' }}>
                        <SettingOutlined style={{ fontSize: 18 }} />
                    </a>
                </AppBar>
                <TabPanel value={value} index={0}>
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
            </div>
            <Modal
                open={open}
                onClose={onToggleModal}
            >
                <Box sx={{ ...styleModal }}>
                    <ModalFormCategory
                        item={item_}
                        title={'Configuración de la competencia'}
                        onClose={onToggleModal}
                    />
                </Box>
            </Modal>
        </NavBar>
    )
}

export default CategoryGeneral;
