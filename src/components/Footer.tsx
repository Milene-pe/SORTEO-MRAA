export const Footer = () => {
    return (
        <footer className="relative w-full py-8 bg-sorteo-bg border-t border-sorteo-border mt-auto overflow-hidden">
            {/* Brillo sutil en el borde superior centrado */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-sorteo-gold to-transparent opacity-70"></div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-4 text-center">
                <p className="text-sorteo-muted text-sm md:text-base flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                    <span>
                        © {new Date().getFullYear()} Edición Especial Día de la
                        Madre
                    </span>
                    <span className="hidden sm:inline text-sorteo-border">
                        |
                    </span>
                    <span>
                        Organizado por{' '}
                        <span className="text-sorteo-gold font-bold tracking-wide">
                            Marcos Sánchez
                        </span>
                    </span>
                </p>

                <div className="flex items-center gap-3 text-xs md:text-sm text-sorteo-cream/40 mt-1">
                    <span className="h-1 w-1 bg-sorteo-orange rounded-full shadow-[0_0_5px_#ff7a00]"></span>
                    <p className="uppercase tracking-widest font-semibold">
                        Hecho con pasión por la cocina{' '}
                        <span className="text-sm ml-1">🍗</span>
                    </p>
                    <span className="h-1 w-1 bg-sorteo-orange rounded-full shadow-[0_0_5px_#ff7a00]"></span>
                </div>
            </div>
        </footer>
    );
};
