

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  IconUsers,
  IconSchool,
  IconHome,
  IconMath,
  IconClockHour3
} from '@tabler/icons-react';
import { Code, Group, Flex, Avatar, Text } from '@mantine/core';
import classes from './NavbarSimple.module.css';

const schoolLinks = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/subject', label: 'Materias', icon: IconMath },
  { link: '/staff', label: 'Personal', icon: IconUsers },
  { link: '/schoolsettings', label: 'Escuela', icon: IconSchool },
  { link: '/calendar', label: 'Calendario', icon: IconClockHour3 },
];

const personalLinks = [
  { link: '/myhours', label: 'Mis Horas', icon: IconClockHour3 },
];

export function NavbarSimple() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(path);
  };

  const sl = schoolLinks.map((item) => (
    <NavLink
      to={item.link}
      onClick={handleClick(item.link)}
      className={classes.link}
      data-active={location.pathname === item.link || undefined}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  const pl = personalLinks.map((item) => (
    <NavLink
      to={item.link}
      onClick={handleClick(item.link)}
      className={classes.link}
      data-active={location.pathname === item.link || undefined}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar} style={{ flexShrink: 0 }}>
      <Group className={classes.header} justify="space-between" style={{ margin: '0 0' }}>
        <Code fw={700}>Kronos v1.0</Code>
      </Group>


      <div className={classes.navbarMain} style={{padding: 0}}>

        <div className={classes.section}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed" style={{padding: '10px 10px 5px'}}>
              Colegio
            </Text>
          </Group>
          <div className={classes.collections}>{sl}</div>
        </div>

        <div className={classes.section}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed" style={{padding: '20px 10px 5px'}}   >
              Personal
            </Text>
          </Group>
          <div className={classes.collections}>{pl}</div>
        </div>

      </div>

      <div className={classes.footer} onClick={() => navigate('/profile')}>
        <Group justify='space-between' style={{ paddingInline: 'var(--mantine-spacing-md)' }}>
          <Group>
            <Avatar size={'md'} name={'Juan Perez'} color="initials" />
            <Flex direction="column" align={'center'}>
              <Text fw={500}>Juan perez <Text size='xs'>juanperez@example.com</Text></Text>

            </Flex>
          </Group>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </Group>
      </div>

    </nav>
  );
}

export default NavbarSimple;
