// vitest.config.ts
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: 'node',
        setupFiles: './vitest.setup.ts',
        include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    },
})
