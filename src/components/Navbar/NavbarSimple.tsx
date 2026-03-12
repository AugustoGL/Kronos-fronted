import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  IconUsers,
  IconSchool,
  IconHome,
  IconMath,
  IconClockHour3,
  IconChevronRight,
} from '@tabler/icons-react';
import { Code, Group, Flex, Avatar, Text, Collapse, UnstyledButton, Box } from '@mantine/core';
import { useState } from 'react';
import classes from './NavbarSimple.module.css';
import { getMyRoles, setActiveSchool, getActiveSchool } from '../../utils/schoolStorage';

const homeLink = { link: '/', label: 'Home', icon: IconHome };

const schoolLinks = [
  { link: '/subject', label: 'Materias', icon: IconMath },
  { link: '/staff', label: 'Personal', icon: IconUsers },
  { link: '/schoolsettings', label: 'Escuela', icon: IconSchool },
  { link: '/calendar', label: 'Calendario', icon: IconClockHour3 },
];

const personalLinks = [
  { link: '/myhours', label: 'Mis Horas', icon: IconClockHour3 },
];

function SchoolLinks({ id_school, collapsed }: { id_school: number; collapsed: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSchool = getActiveSchool();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSchool(id_school); // setear el colegio activo al clickear
    navigate(path);
  };

  return (
    <>
      {schoolLinks.map((item) => (
        <NavLink
          to={item.link}
          onClick={handleClick(item.link)}
          className={classes.link}
          // solo se marca si esta ruta está activa Y este colegio es el activo
          data-active={(location.pathname === item.link && activeSchool === id_school) || undefined}
          key={`${id_school}-${item.label}`}
          style={collapsed ? { paddingLeft: 30 } : undefined}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}

function CollapseSchoolSection({ id_school }: { id_school: number }) {
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.link}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Group gap="sm">
          <IconSchool size={18} stroke={1.5} style={{ color: 'var(--mantine-color-dimmed)' }} />
          <Text size="sm">Colegio {id_school} {/* (auxiliar) */}</Text>
        </Group>
        <IconChevronRight
          size={14}
          stroke={1.5}
          style={{
            transform: opened ? 'rotate(90deg)' : 'none',
            transition: 'transform 200ms ease',
            marginRight: 8,
          }}
        />
      </UnstyledButton>
      <Collapse in={opened}>
        <SchoolLinks id_school={id_school} collapsed />
      </Collapse>
    </Box>
  );
}

export function NavbarSimple() {
  const location = useLocation();
  const navigate = useNavigate();

  let directivoIds: number[] = [];
  try {
    const roles = getMyRoles();
    directivoIds = roles['Directivo'] ?? [];
  } catch (_) {
    directivoIds = [];
  }

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(path);
  };

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

      <div className={classes.navbarMain} style={{ padding: 0 }}>

        {/* Home siempre primero */}
        <div className={classes.section}>
          <div className={classes.collections}>
            <NavLink
              to={homeLink.link}
              onClick={handleClick(homeLink.link)}
              className={classes.link}
              data-active={location.pathname === homeLink.link || undefined}
            >
              <homeLink.icon className={classes.linkIcon} stroke={1.5} />
              <span>{homeLink.label}</span>
            </NavLink>
          </div>
        </div>

        <div className={classes.section}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed" style={{ padding: '10px 10px 5px' }}>
              Colegio
            </Text>
          </Group>
          <div className={classes.collections}>
            {directivoIds.length === 1 ? (
              <SchoolLinks id_school={directivoIds[0]} collapsed={false} />
            ) : (
              directivoIds.map((id_school) => (
                <CollapseSchoolSection key={id_school} id_school={id_school} />
              ))
            )}
          </div>
        </div>

        <div className={classes.section}>
          <Group className={classes.collectionsHeader} justify="space-between">
            <Text size="xs" fw={500} c="dimmed" style={{ padding: '20px 10px 5px' }}>
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
            <Flex direction="column" align={'start'}>
              <Text fw={500}>Juan perez </Text>
              <Text size='xs'>juanperez@example.com</Text>
            </Flex>
          </Group>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
        </Group>
      </div>

    </nav>
  );
}

export default NavbarSimple;