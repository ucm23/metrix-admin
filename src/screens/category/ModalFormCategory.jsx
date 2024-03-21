import NavBar from "../../layouts/NavBar"
import ContainerTable from "../../components/ContainerTable";
import { index_companys_ } from "../../api/companys/companys";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
    useBreakpointValue,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { Button, Layout, List, Avatar, Switch, Flex, Dropdown } from 'antd';

import { CloseOutlined } from "@ant-design/icons";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwitchLabel from "../../components/ui/custom/SwitchLabel";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const { Header, Content } = Layout;

import useSelectedIDValue from "../../components/hooks/useSelectedIDValue";
import useSelectedIDValue_ from "../../components/hooks/useSelectedIDValue_";
import { index_competencies_ } from "../../api/competencies/competencies";


const onMenuClick = (e) => {
    console.log('click', e);
};
const items = [
    {
        key: '1',
        label: '1st item',
    },
    {
        key: '2',
        label: '2nd item',
    },
    {
        key: '3',
        label: '3rd item',
    },
];


function ModalFormCategory({ item, title, onClose, }) {

    const [header, setHeader] = useState([])
    const [body, setBody] = useState([])
    const [loader, setLoader] = useState(false)

    const [actived, setActived] = useState(false)


    const mobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setHeader(Object.keys(item));
            setBody(Object.values(item));
            setActived(item?.active);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoader(true)
        }
    }

    const goBack = () => {
        try {
            onClose(false)
        } catch (error) {
            console.log('error goBack: ', error);
        }
    };

    const renderInput = (label, value) => {
        //console.log('label, value: ', label, value);
        const state = {
            /*'active': (
                <SwitchLabel
                    checked={actived}
                    onChange={setActived}
                />
            ),*/
            'name': (
                <TextField
                    label={label}
                    variant='filled'
                    defaultValue={value}
                    style={{ width: '100%', }}
                    InputProps={{ className: 'placeholder' }}
                    className="placeholder"
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
                    InputProps={{ className: 'placeholder' }}
                    className="placeholder"
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
                        <h1 className="config-header">{title}</h1>
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
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">
                                    Course setup
                                </h1>
                                <span className="text-sm text-slate-700">
                                    Complete all fields
                                </span>
                            </div>
                            
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <h2 className="text-xl">
                                        Customize your course
                                    </h2>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <h2 className="text-xl">
                                            Course chapters
                                        </h2>
                                    </div>
                                   
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <h2 className="text-xl">
                                            Sell your course
                                        </h2>
                                    </div>
                                   
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <h2 className="text-xl">
                                            Resources & Attachments
                                        </h2>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {!loader ? <h1>Cargando</h1> :
                        <div>

                            <div className={'flex-row'}>
                                <div style={{ padding: 15, paddingTop: 0, paddingBottom: 0 }} className="width-100 center">
                                    <div className="content-details-center-with-layout">
                                        <Flex gap="small" wrap="wrap">
                                            {header.map((item, index) => renderInput(item, body[index]))}
                                        </Flex>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </Content>
            </Layout>
        </div>
    )
}

export default ModalFormCategory
