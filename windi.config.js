import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    extract: {
        include: ['**/*.{html,js,jsx,css}'],
        exclude: ['node_modules', '.git', 'dist'],
    },
})