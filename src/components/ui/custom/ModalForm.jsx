import NavBar from "../../../layouts/NavBar"
import ContainerTable from "../../ContainerTable";
import { index_companys_ } from "../../../api/companys/companys";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
    useBreakpointValue,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { Button, Layout, List, Avatar, Switch, Flex, Dropdown } from 'antd';

import { CloseOutlined } from "@ant-design/icons";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SwitchLabel from "./SwitchLabel";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const { Header, Content } = Layout;

import useSelectedIDValue from "../../hooks/useSelectedIDValue";
import useSelectedIDValue_ from "../../hooks/useSelectedIDValue_";
import { index_competencies_ } from "../../../api/competencies/competencies";

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


function ModalForm({ item, title, onClose, company_id, props_modal, props_competencie, props_users, props_dates, props_point, props_rubic }) {
    console.log('company_id: ', company_id);

    const [header, setHeader] = useState([])
    const [body, setBody] = useState([])
    const [loader, setLoader] = useState(false)

    const [actived, setActived] = useState(false)

    let competencies = useSelectedIDValue()
    let users = useSelectedIDValue(null, 0)
    let points = useSelectedIDValue_(0, 0)
    let forms = useSelectedIDValue(null, 0)

    const mobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            if (props_competencie) {
                let response = await index_competencies_({ company_id });
                console.log('response: ', response);
                if (response?.status && response?.data.length) {
                    competencies.onToggleContent({
                        id: response?.data[0]?.id,
                        value: response?.data[0]?.id,
                        load: true,
                        array_: response?.data,
                    })
                }
            }


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

    const [competencie, setCompetencie] = useState(null)

    const handleChange = ({ name, value }) => {
        switch (name) {
            case 'competencies':
                competencies.onToggleContent({ value })
                break;
            case 'points':
                points.onToggleContent({ value })
                break;
        }
        //setCompetencie(event.target.value);
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
                    {!loader ? <h1>Cargando</h1> :
                        <div>
                            {(mobile && props_competencie && competencies?.loading) &&
                                <div style={{ borderBottomWidth: 2 }}>
                                    <FormControl className="width-100" style={{ padding: 15, }} size="small">
                                        <div className="width-100">
                                            <h1 className="iLjzDc">Competencia</h1>
                                            <Select
                                                value={competencies?.value}
                                                onChange={(e) => handleChange({ name: 'competencies', value: e.target.value })}
                                                InputProps={{ className: 'placeholder' }}
                                            >
                                                {competencies?.array_.map((item, index) => (
                                                    <MenuItem key={`modal-form-${index}-${item?.id}}-${item?.name}`} value={item?.id}>{item?.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </FormControl>
                                </div>
                            }
                            <div className={mobile ? 'flex-column' : 'flex-row'}>
                                <div style={{ padding: 15, paddingTop: 0, paddingBottom: 0 }} className="width-100 center">
                                    <div className="content-details-center-with-layout">
                                        <Flex gap="small" wrap="wrap">
                                            {header.map((item, index) => renderInput(item, body[index]))}
                                        </Flex>
                                    </div>
                                </div>
                                <div className={mobile ? "layout-form-right-100" : "layout-form-right"}>
                                    {(props_competencie || props_users || props_point || props_dates || props_rubic) &&
                                        <FormControl className="width-100" size="small">
                                            <Flex gap="small" style={{ flexDirection: 'column' }} className="width-100">
                                                {(!mobile && props_competencie && competencies?.loading) &&
                                                    <div className="width-100">
                                                        <h1 className="iLjzDc">Competencia</h1>
                                                        <Select
                                                            value={competencies?.value}
                                                            onChange={(e) => handleChange({ name: 'competencies', value: e.target.value })}
                                                            InputProps={{ className: 'placeholder' }}
                                                        >
                                                            {competencies?.array_.map((item, index) => (
                                                                <MenuItem key={`modal-form-${index}-${item?.id}}-${item?.name}`} value={item?.id}>{item?.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                }
                                                {/*(props_users) &&
                                                    <div className="width-100">
                                                        <h1 className="iLjzDc">Para</h1>
                                                        <Select
                                                            //multiple
                                                            value={competencie}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={0}>
                                                                None
                                                            </MenuItem>
                                                            <MenuItem value={1}>Ten</MenuItem>
                                                        </Select>
                                                    </div>
                                            */}
                                                {(props_point) &&
                                                    <div className="width-100">
                                                        <h1 className="iLjzDc">Puntos</h1>
                                                        <div style={{ display: 'flex' }}>
                                                            <Select
                                                                value={points.value}
                                                                onChange={(e) => handleChange({ name: 'points', value: e.target.value })}
                                                            >
                                                                <MenuItem value={0}>
                                                                    Sin calificación
                                                                </MenuItem>
                                                                <MenuItem value={1}>Puntaje</MenuItem>
                                                            </Select>
                                                            {(points.value !== 0) &&
                                                                <TextField
                                                                    placeholder={'Valor máximo'}
                                                                    variant='outlined'
                                                                    size="small"
                                                                    style={{ marginLeft: 4 }}
                                                                    defaultValue={'10'}
                                                                    InputProps={{ className: 'placeholder' }}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                }

                                                {(props_rubic) &&
                                                    <div className="width-100">
                                                        <h1 className="iLjzDc">Formulario</h1>
                                                        <Select
                                                            value={competencie}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>+ Crear formulario</MenuItem>
                                                            <MenuItem value={2}>= Clonar formulario</MenuItem>
                                                        </Select>
                                                    </div>
                                                }


                                                {/*(props_dates) &&
                                                    <div className="width-100">
                                                        <h1 className="iLjzDc">Fechas</h1>
                                                        <Select
                                                            value={competencie}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={0}>
                                                                None
                                                            </MenuItem>
                                                            <MenuItem value={1}>Ten</MenuItem>
                                                        </Select>
                                                    </div>
                                            */}
                                            </Flex>
                                        </FormControl>

                                    }
                                </div>
                            </div>
                        </div>
                    }

                </Content>
            </Layout>
        </div>
    )
}

export default ModalForm
