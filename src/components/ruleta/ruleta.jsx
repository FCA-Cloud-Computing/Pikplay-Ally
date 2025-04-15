import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'; // Importa animate
import './ruleta.scss';

const Ruleta = ({ opciones, opcionGanadora }) => {
    const [anguloInicial, setAnguloInicial] = useState(0);
    const [girando, setGirando] = useState(false);
    const [resultado, setResultado] = useState(null);
    const numOpciones = opciones.length;
    const anguloPorOpcion = 360 / numOpciones;
    const centroRuleta = useRef(null);

    const rotation = useMotionValue(0);
    const hueRotate = useTransform(rotation, (value) => `hue-rotate(${value}deg)`);

    const obtenerIndiceOpcion = (opcion) => opciones.indexOf(opcion);

    const calcularAnguloFinal = (indiceGanador) => {
        const puntoMedioOpcion = (indiceGanador + 0.5) * anguloPorOpcion;
        const vueltasAleatorias = Math.floor(Math.random() * 5) + 3; // Entre 3 y 7 vueltas completas
        const offset = 90 - puntoMedioOpcion; // Centrar la opción ganadora arriba
        return -(vueltasAleatorias * 360 + offset);
    };

    const girarRuleta = () => {
        if (girando || !opcionGanadora) return;
        setGirando(true);
        setResultado(null);
        const indiceGanador = obtenerIndiceOpcion(opcionGanadora);
        if (indiceGanador === -1) {
            console.error(`La opción "${opcionGanadora}" no existe en las opciones.`);
            setGirando(false);
            return;
        }
        const anguloFinal = calcularAnguloFinal(indiceGanador);

        // Usa animate para animar el valor de rotation
        animate(rotation, anguloFinal, {
            duration: 5,
            ease: "easeInOut",
            onComplete: () => {
                setGirando(false);
                setResultado(opcionGanadora);
                rotation.set(anguloFinal % 360); // Mantener la posición final visualmente
            },
        });
    };

    useEffect(() => {
        if (opcionGanadora && !girando && resultado !== opcionGanadora) {
            girarRuleta();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opcionGanadora]);

    const getRotationStyle = (index) => {
        const rotate = anguloInicial + index * anguloPorOpcion;
        return { transform: `rotate(${rotate}deg)` };
    };

    const getSkewStyle = () => {
        return { transform: `skewY(-60deg)` };
    };

    const getOptionStyle = (index) => {
        const rotate = (index + 0.5) * anguloPorOpcion;
        return {
            transform: `rotate(${rotate}deg) skewY(60deg)`,
            background: `hsl(${index * (360 / numOpciones)}, 70%, 60%)`,
        };
    };

    return (
        <div className="RulleteComponent">
            <motion.div
                className="ruleta"
                style={{ rotate: rotation }}
                ref={centroRuleta}
            >
                {opciones.map((opcion, index) => (
                    <div
                        key={index}
                        className="segment-container"
                        style={getRotationStyle(index)}
                    >
                        <div className="segment" style={getSkewStyle()}>
                            <div className="option" style={getOptionStyle(index)}>
                                {opcion}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flecha"></div>
            </motion.div>
            {resultado && <div className="resultado">¡Ganaste: {resultado}!</div>}
        </div>
    );
};

export default Ruleta;