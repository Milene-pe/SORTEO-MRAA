interface HeaderProps {
    organizer: string;
}

export const Header = ({ organizer }: HeaderProps) => {
    return (
        <header className="relative w-full bg-sorteo-bg2 border-b border-sorteo-border shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden shrink-0">
            {/* Brillo decorativo de fondo (Glow) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-sorteo-orange/20 blur-[100px] pointer-events-none"></div>

            {/* Cambiamos md:flex-row a lg:flex-row y ajustamos paddings/gaps para que no colapse */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Sección del Logo y Título */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                    {/* Icono decorado */}
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-sorteo-gold blur-md opacity-30 group-hover:opacity-60 transition-opacity rounded-2xl"></div>
                        <div className="relative bg-gradient-to-br from-sorteo-red to-[#5a0c0c] p-3 sm:p-4 rounded-2xl shadow-xl border border-sorteo-gold/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                            <span className="text-3xl sm:text-4xl block">
                                🍗
                            </span>
                        </div>
                    </div>

                    {/* Textos del Título */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex items-center gap-3 mb-1 sm:mb-2">
                            <span className="px-3 py-1 bg-sorteo-card border border-sorteo-border rounded-full text-[10px] sm:text-xs font-bold text-sorteo-gold tracking-widest uppercase">
                                Edición Día de la Madre
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sorteo-text tracking-tight">
                            POLLO{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sorteo-gold to-sorteo-orange drop-shadow-sm">
                                FEST
                            </span>
                        </h1>
                    </div>
                </div>

                {/* Sección del Organizador (Marco Sánchez) */}
                {/* Añadimos w-full sm:w-auto para que tome el ancho necesario sin romperse */}
                <div className="w-full sm:w-auto bg-sorteo-card border border-sorteo-border px-6 py-3 sm:py-4 rounded-2xl backdrop-blur-sm text-center lg:text-right shadow-inner">
                    <p className="text-sorteo-muted text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest mb-1 flex items-center justify-center lg:justify-end gap-2">
                        Feliz Día de la Madre{' '}
                        <span className="text-sorteo-red text-base sm:text-lg">
                            ❤️
                        </span>
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-sorteo-cream drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <span className="text-sorteo-muted text-base sm:text-lg font-medium italic mr-2">
                            por
                        </span>
                        {organizer}
                    </p>
                </div>
            </div>

            <div className="h-1.5 w-full bg-gradient-to-r from-sorteo-bg via-sorteo-gold to-sorteo-bg opacity-90"></div>
        </header>
    );
};
