import Layout from "@/components/layout/Layout";
import Ruleta from "@/components/ruleta/ruleta";
import { useState } from "react";

const Index = () => {
    const opcionesRuleta = ['Opción A', 'Opción B', 'Opción C', 'Opción D', 'Opción E'];
    const [opcionGanadora, setOpcionGanadora] = useState(null);

    const cambiarOpcionGanadora = (nuevaOpcion) => {
        setOpcionGanadora(nuevaOpcion);
    };

    return (
        <Layout>
            <Ruleta opciones={opcionesRuleta} opcionGanadora={opcionGanadora} />
            <div>
                <button onClick={() => cambiarOpcionGanadora('Opción A')}>Fijar Ganador: Opción A</button>
                <button onClick={() => cambiarOpcionGanadora('Opción B')}>Fijar Ganador: Opción B</button>
                <button onClick={() => cambiarOpcionGanadora('Opción C')}>Fijar Ganador: Opción C</button>
                <button onClick={() => cambiarOpcionGanadora('Opción D')}>Fijar Ganador: Opción D</button>
                <button onClick={() => cambiarOpcionGanadora('Opción E')}>Fijar Ganador: Opción E</button>
                <button onClick={() => cambiarOpcionGanadora(opcionesRuleta[Math.floor(Math.random() * opcionesRuleta.length)])}>
                    Seleccionar Ganador Aleatorio
                </button>
                <button onClick={() => cambiarOpcionGanadora(null)}>Detener Ruleta</button>

            </div>
        </Layout>
    );
}

export default Index;
