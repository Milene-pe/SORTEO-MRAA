import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Registro } from './components/Registro';
import { Sorteo } from './components/Sorteo';
import { Sidebar } from './components/Sidebar';

type Phase = 'registro' | 'sorteo';

function App() {
    // 1. Inicializamos los estados tratando de leer desde localStorage
    const [phase, setPhase] = useState<Phase>(() => {
        return (localStorage.getItem('sorteo_phase') as Phase) || 'registro';
    });

    const [participants, setParticipants] = useState<string[]>(() => {
        const saved = localStorage.getItem('sorteo_participants');
        return saved ? JSON.parse(saved) : [];
    });

    const [winners, setWinners] = useState<string[]>(() => {
        const saved = localStorage.getItem('sorteo_winners');
        return saved ? JSON.parse(saved) : [];
    });

    const [revealedWinners, setRevealedWinners] = useState<string[]>(() => {
        const saved = localStorage.getItem('sorteo_revealed');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Guardamos automáticamente en localStorage cada vez que un estado cambia
    useEffect(() => {
        localStorage.setItem('sorteo_phase', phase);
    }, [phase]);

    useEffect(() => {
        localStorage.setItem(
            'sorteo_participants',
            JSON.stringify(participants)
        );
    }, [participants]);

    useEffect(() => {
        localStorage.setItem('sorteo_winners', JSON.stringify(winners));
    }, [winners]);

    useEffect(() => {
        localStorage.setItem(
            'sorteo_revealed',
            JSON.stringify(revealedWinners)
        );
    }, [revealedWinners]);

    const handleStartSorteo = () => {
        if (participants.length === 0) return;
        const shuffled = [...participants].sort(() => 0.5 - Math.random());
        setWinners(shuffled.slice(0, 30));
        setRevealedWinners([]);
        setPhase('sorteo');
    };

    const handleWinnerRevealed = (winner: string) => {
        setRevealedWinners((prev) => [...prev, winner]);
    };

    const handleResetAll = () => {
        if (
            window.confirm(
                '¿Estás seguro de que quieres borrar todo? Se perderá la lista y los ganadores.'
            )
        ) {
            setParticipants([]);
            setWinners([]);
            setRevealedWinners([]);
            setPhase('registro');
            localStorage.clear();
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a0b04] via-[#241204] to-[#140b04] text-sorteo-text font-sans selection:bg-sorteo-gold selection:text-sorteo-bg">
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Header organizer="Marcos Sánchez" />

                <main className="flex-1 flex flex-col items-center justify-center py-10">
                    {phase === 'registro' ? (
                        <Registro
                            participants={participants}
                            onAdd={(names) =>
                                setParticipants([...participants, ...names])
                            }
                            onClear={handleResetAll} // Usamos la nueva función de reset
                            onStart={handleStartSorteo}
                        />
                    ) : (
                        <Sorteo
                            winners={winners}
                            onBack={() => setPhase('registro')}
                            onReveal={handleWinnerRevealed}
                        />
                    )}
                </main>

                <Footer />
            </div>

            {phase === 'sorteo' && <Sidebar winners={revealedWinners} />}
        </div>
    );
}

export default App;
