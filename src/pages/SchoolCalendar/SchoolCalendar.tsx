
import { CursoModuloGrid } from '../../components/Calendar/Calendar';

export default function SchoolCalendar() {

    return (
        <div className='contenedor-grilla'>
            
            <CursoModuloGrid modulos={11} dia="Lunes" cursos={['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', '7A', '7B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', '8A']} />
            <CursoModuloGrid modulos={11} dia="Martes" cursos={['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', '7A', '7B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B', '8A']} />

        </div>
    );
}
