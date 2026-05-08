/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'sorteo-bg': '#140b04',
                'sorteo-bg2': '#241204',
                'sorteo-gold': '#ffd100',
                'sorteo-orange': '#ff7a00',
                'sorteo-red': '#9b1c1c',
                'sorteo-cream': '#fff4d6',
                'sorteo-text': '#fff8e8',
                'sorteo-muted': '#d9c7aa',
                'sorteo-card': 'rgba(255,255,255,.06)',
                'sorteo-border': 'rgba(255,255,255,.12)',
            },
        },
    },
    plugins: [],
};
