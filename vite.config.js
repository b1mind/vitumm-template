import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import postcss from '@vituum/vite-plugin-postcss'
import markdownIt from 'jstransformer-markdown-it'

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
			filters: {
				//custom filters
				markdown: function (text) {
					const render = markdownIt.render(text, {
						linkify: true,
						//fixme fontMatter usage
						plugins: ['markdown-it-front-matter'],
					})
					return render
				},
				test: function (text) {
					return text + 'filtered!'
				},
			},
		}),
		postcss(),
	],
}
