interface SidebarProps {
    winners: string[];
}

export const Sidebar = ({ winners }: SidebarProps) => {
    return (
        <aside className="w-full md:w-80 bg-black/20 backdrop-blur-md border-t md:border-t-0 md:border-l border-sorteo-gold/10 p-6 flex flex-col h-auto md:h-screen md:sticky md:top-0">
            <div className="w-full">
                <h2 className="text-2xl font-bold text-sorteo-gold mb-6 flex items-center gap-2">
                    🏆 Historial{' '}
                    <span className="text-sm bg-sorteo-red text-white px-3 py-1 rounded-full">
                        {winners.length} / 30
                    </span>
                </h2>

                <div className="space-y-3 overflow-y-auto max-h-[60vh] md:max-h-[80vh] pr-2 custom-scrollbar">
                    {winners.length > 0 ? (
                        // Invertimos la lista para ver el ganador más reciente arriba
                        [...winners].reverse().map((winner, index) => {
                            // Calculamos el número real de pollo (del 1 al 30)
                            const polloNumero = winners.length - index;

                            return (
                                <div
                                    key={polloNumero}
                                    className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center gap-3 animate-slide-in hover:bg-white/10 transition-colors"
                                >
                                    <span className="text-sorteo-orange font-bold w-6">
                                        #{polloNumero}
                                    </span>
                                    <span className="text-sorteo-cream font-medium truncate">
                                        {winner}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 opacity-30 animate-pulse">
                            <p className="text-5xl mb-4">🔥</p>
                            <p className="italic">
                                El horno está calentando...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
