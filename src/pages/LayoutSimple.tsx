
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="contenedor-simple">
            {children}
        </div>
    );
};

export default Layout;