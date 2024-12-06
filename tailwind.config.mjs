import { scopedPreflightStyles, isolateInsideOfContainer } from 'tailwindcss-scoped-preflight';


/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{jsx,ts,tsx}',
	],
	darkMode: ['selector', '[data-theme="dark"]', '.dark', 'class'],
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	// plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'), scopedPreflightStyles({
	// 	isolationStrategy: isolateInsideOfContainer(['.useTw']),
	// })],
	safelist: [
		'lg:col-span-4',
		'lg:col-span-6',
		'lg:col-span-8',
		'lg:col-span-12',
		'border-border',
		'bg-card',
		'border-error',
		'bg-error/30',
		'border-success',
		'bg-success/30',
		'border-warning',
		'bg-warning/30',
	],
	theme: {
		container: {
			center: 'true',
			padding: {
				'2xl': '2rem',
				DEFAULT: '1rem',
				lg: '2rem',
				md: '2rem',
				sm: '1rem',
				xl: '2rem'
			},
			screens: {
				'2xl': '86rem',
				lg: '64rem',
				md: '48rem',
				sm: '40rem',
				xl: '80rem'
			}
		},
		extend: {
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				background: 'hsl(var(--background))',
				border: 'hsl(var(--border))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				foreground: 'hsl(var(--foreground))',
				input: 'hsl(var(--input))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				ring: 'hsl(var(--ring))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				success: 'hsl(var(--success))',
				error: 'hsl(var(--error))',
				warning: 'hsl(var(--warning))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				mono: ['var(--font-geist-mono)'],
				sans: ['var(--font-geist-sans)']
			}
		}
	},
}
