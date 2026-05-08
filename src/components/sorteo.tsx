import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import marcoImg from '../assets/MarcosPollero.png';
import chickenSvg from '../assets/roastchicken.svg';
import hornoInicial from '../assets/horno_inicial.mp4';
import hornoFinal from '../assets/horno_final.mp4';

interface SorteoProps {
    winners: string[];
    onBack: () => void;
    onReveal: (winner: string) => void; // Recibimos la nueva función
}

type Stage =
    | 'preparando'
    | 'horneando'
    | 'reproduciendo_final'
    | 'revelando_ganador'
    | 'resumen';

export const Sorteo = ({ winners, onBack, onReveal }: SorteoProps) => {
    const [stage, setStage] = useState<Stage>('preparando');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < winners.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setStage('horneando');
        } else {
            setStage('resumen');
        }
    };

    // --- EFECTO DE FIESTA Y ACTUALIZACIÓN DE SIDEBAR ---
    useEffect(() => {
        if (stage === 'revelando_ganador') {
            // 1. Lanzamos el confeti visualmente
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF8C00', '#FF0000', '#FFFFFF'],
            });

            // 2. Enviamos el ganador al App.tsx para que aparezca en el Sidebar
            onReveal(winners[currentIndex]);
        }
        // Desactivamos la advertencia de eslint para onReveal y winners para que no se re-dispare
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    return (
        <div className="w-full max-w-4xl animate-pop-in text-center px-4 flex flex-col items-center justify-center min-h-[60vh]">
            {/* --- ETAPA 1: PANTALLA DE INICIO --- */}
            {stage === 'preparando' && (
                <div className="flex flex-col items-center animate-pop-in">
                    <div className="relative w-56 h-56 mb-6">
                        <div className="absolute inset-0 bg-sorteo-gold rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <img
                            src={marcoImg}
                            alt="Marco Sanchez"
                            className="relative z-10 w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform"
                        />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-sorteo-gold mb-4 drop-shadow-lg">
                        ¡Todo listo para la brasa!
                    </h2>
                    <p className="text-xl text-sorteo-cream mb-8 font-medium">
                        Marcos está calentando el horno para los ganadores
                    </p>
                    <button
                        onClick={() => setStage('horneando')}
                        className="bg-gradient-to-r from-sorteo-red to-[#7a1212] text-white font-black px-10 py-4 rounded-full text-xl shadow-[0_0_20px_rgba(155,28,28,0.5)] hover:scale-105 transition-all border border-sorteo-gold/30"
                    >
                        🔥 ENCENDER HORNO
                    </button>
                </div>
            )}

            {/* --- ETAPA 2: VIDEO INICIAL --- */}
            {stage === 'horneando' && (
                <div className="flex flex-col items-center animate-pop-in w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-sorteo-cream mb-8 drop-shadow-md">
                        Preparando el pedido para el ganador {currentIndex + 1}
                        ...
                    </h2>

                    <div className="relative w-full max-w-[686px] mb-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,100,0,0.3)] border-2 border-sorteo-gold/30 bg-black flex justify-center items-center">
                        <video
                            src={hornoInicial}
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-auto object-contain aspect-[686/648]"
                        />
                    </div>

                    <button
                        onClick={() => setStage('reproduciendo_final')}
                        className="bg-gradient-to-r from-sorteo-gold to-sorteo-orange text-sorteo-bg font-black px-10 py-4 rounded-full text-xl shadow-[0_0_20px_rgba(255,209,0,0.4)] hover:scale-105 transition-all border-2 border-white/20"
                    >
                        🍽️ ¡SERVIR ESTE POLLO!
                    </button>
                </div>
            )}

            {/* --- ETAPA 3: VIDEO FINAL --- */}
            {stage === 'reproduciendo_final' && (
                <div className="flex flex-col items-center w-full animate-pop-in">
                    <h2 className="text-2xl font-bold text-sorteo-cream mb-6 animate-pulse">
                        ¡Sacando el pollo del horno...!
                    </h2>

                    <div className="relative w-full max-w-[686px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-sorteo-gold/50 bg-black flex justify-center items-center">
                        <video
                            src={hornoFinal}
                            autoPlay
                            playsInline
                            onEnded={() => setStage('revelando_ganador')}
                            className="w-full h-auto object-contain aspect-[686/648]"
                        />
                    </div>
                </div>
            )}

            {/* --- ETAPA 4: REVELANDO AL GANADOR --- */}
            {stage === 'revelando_ganador' && (
                <div className="flex flex-col items-center w-full animate-pop-in">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-sorteo-gold rounded-full blur-3xl opacity-50 animate-pulse scale-150"></div>
                        <img
                            src={chickenSvg}
                            alt="Pollo Ganador"
                            className="w-48 h-48 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative z-10 animate-bounce"
                            style={{ filter: 'saturate(1.8) brightness(1.2)' }}
                        />
                    </div>

                    <div className="bg-gradient-to-b from-sorteo-gold to-sorteo-orange p-1.5 rounded-3xl shadow-[0_15px_50px_rgba(255,209,0,0.6)] relative z-20 w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="bg-sorteo-bg2 px-12 py-10 rounded-[22px] border-2 border-sorteo-gold/40 text-center flex flex-col items-center justify-center">
                            <p className="text-sorteo-gold font-bold uppercase tracking-widest text-lg mb-3 animate-pulse">
                                🎉 ¡NUEVO GANADOR #{currentIndex + 1}! 🎉
                            </p>
                            <h3 className="text-5xl md:text-6xl font-black text-white drop-shadow-xl break-words tracking-tight">
                                {winners[currentIndex]}
                            </h3>
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="mt-12 text-sorteo-bg bg-gradient-to-r from-sorteo-gold to-sorteo-orange px-12 py-4 rounded-full font-black text-xl transition-all shadow-[0_0_30px_rgba(255,209,0,0.4)] hover:scale-110 hover:brightness-110 border-2 border-white/30 uppercase"
                    >
                        {currentIndex < winners.length - 1
                            ? 'Siguiente Pollo →'
                            : 'Ver Lista Final 🏆'}
                    </button>
                </div>
            )}

            {/* --- ETAPA 5: RESUMEN FINAL --- */}
            {stage === 'resumen' && (
                <div className="w-full animate-pop-in">
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sorteo-gold to-sorteo-orange mb-4 drop-shadow-lg">
                        🏆 ¡TODOS LOS GANADORES! 🏆
                    </h2>
                    <p className="text-sorteo-cream/60 mb-8 text-lg italic">
                        La hornada de Marcos ha finalizado con éxito
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 max-h-[50vh] overflow-y-auto no-scrollbar p-2">
                        {winners.map((winner, index) => (
                            <div
                                key={index}
                                className="bg-white/5 border border-sorteo-gold/30 p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors shadow-lg"
                            >
                                <img
                                    src={chickenSvg}
                                    alt="Pollo"
                                    className="w-8 h-8 drop-shadow-md"
                                    style={{ filter: 'saturate(1.5)' }}
                                />
                                <span className="text-white font-semibold text-left truncate">
                                    {winner}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onBack}
                        className="text-sorteo-gold hover:text-sorteo-orange transition-colors font-bold uppercase tracking-widest text-sm"
                    >
                        ← Volver a la pantalla principal
                    </button>
                </div>
            )}
        </div>
    );
};
