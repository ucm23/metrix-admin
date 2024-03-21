import React from "react";
import { Link, useLocation } from "wouter"
import { Menu } from "antd";

import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";


import {
    UserOutlined,
    HomeOutlined,
    BankOutlined,
    UsergroupAddOutlined,
    UserSwitchOutlined,
    CodeSandboxOutlined,
} from "@ant-design/icons";

const MenuList = ({ setCollapsed }) => {

    const onClick = () => setCollapsed(true)

    return (
        <Menu theme='light' className="menu-bar">
            <Menu.Item icon={<HomeOutlined />}>
                <NavLink onClick={onClick} to="/">
                    Inicio
                </NavLink>
            </Menu.Item>

            <Menu.Item icon={<BankOutlined />}>
                <NavLink onClick={onClick} to="/company">
                    Empresas
                </NavLink>
            </Menu.Item>
            <Menu.Item icon={<CodeSandboxOutlined />}>
                <NavLink onClick={onClick} to="/category">
                    Competencias
                </NavLink>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />}>
                <NavLink onClick={onClick} to="/contacts">
                    Contactos
                </NavLink>
            </Menu.Item>

            {/*<Menu.SubMenu icon={<UserOutlined />} title={'Usuarios'}>
                <Menu.Item icon={<UserOutlined />}>
                    <NavLink onClick={onClick} to="/users">
                        Jefes
                    </NavLink>
                </Menu.Item>
                <Menu.Item icon={<UsergroupAddOutlined />}>
                    Evaluadores
                </Menu.Item>
                <Menu.Item icon={<UserSwitchOutlined />}>
                    Evaluados
                </Menu.Item>
    </Menu.SubMenu>*/}
        </Menu >
    )
}

export default MenuList;