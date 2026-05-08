import { useState } from 'react';

interface RegistroProps {
    participants: string[];
    onAdd: (names: string[]) => void;
    onClear: () => void;
    onStart: () => void;
}

export const Registro = ({
    participants,
    onAdd,
    onClear,
    onStart,
}: RegistroProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        // Dividir por comas o saltos de línea
        const names = text
            .split(/[\n,]+/)
            .map((n) => n.trim())
            .filter((n) => n !== '');
        onAdd(names);
        setText('');
    };

    return (
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl animate-pop-in">
            <h2 className="text-3xl font-bold text-center text-sorteo-gold mb-6">
                Registro de participantes
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Pega aquí la lista de nombres (separados por coma o enter)..."
                    className="w-full bg-white/5 border border-sorteo-orange/30 rounded-2xl px-5 py-4 text-white outline-none focus:border-sorteo-gold focus:ring-1 focus:ring-sorteo-gold transition-all no-scrollbar resize-none"
                    rows={4}
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sorteo-orange to-sorteo-red text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                >
                    Añadir a la Lista ➕
                </button>
            </form>

            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 h-72 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sorteo-gold font-semibold uppercase text-xs tracking-widest">
                        Participantes: {participants.length}
                    </span>
                    {participants.length > 0 && (
                        <button
                            onClick={onClear}
                            className="text-red-400 text-xs hover:underline"
                        >
                            Vaciar todo
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar flex flex-wrap gap-2 content-start">
                    {participants.map((p, i) => (
                        <span
                            key={i}
                            className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10 animate-pop-in"
                        >
                            {p}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={onStart}
                disabled={participants.length === 0}
                className="mt-8 w-full bg-sorteo-gold text-sorteo-bg font-black py-5 rounded-2xl text-xl shadow-[0_0_30px_rgba(255,209,0,0.3)] hover:brightness-110 disabled:opacity-20 transition-all"
            >
                ¡INICIAR SORTEO! 🍗
            </button>
        </div>
    );
};
