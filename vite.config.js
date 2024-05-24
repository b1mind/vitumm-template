import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import postcss from '@vituum/vite-plugin-postcss'

export default {
	plugins: [
		vituum({
			imports: {
				filenamePattern: {
					'+.css': [],
					'+.scss': '/src/styles',
				},
			},
		}),
		pug({
			root: './src',
		}),
		postcss(),
	],
}
