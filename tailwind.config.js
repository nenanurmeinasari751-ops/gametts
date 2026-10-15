export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        skysoft: '#dbeafe',
        accent: '#fbbf24',
        success: '#16a34a',
        danger: '#ef4444',
        card: '#ffffff',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
