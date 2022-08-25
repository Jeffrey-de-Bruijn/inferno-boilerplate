import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    extract: {
        include: ['./src/**/*.{html,js,jsx}'],
    },
})