import NavbarSimple from '../components/Navbar/NavbarSimple';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="contenedor-principal">
            {/* Sidebar con navbar */}
            <NavbarSimple />

            {/* Contenido principal */}
            {children}
        </div>
    );
};

export default Layout;