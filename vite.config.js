import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import postcss from '@vituum/vite-plugin-postcss'
import markdownIt from 'jstransformer-markdown-it'
import markdownItFrontMatter from 'markdown-it-front-matter'

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
					const md = markdownIt

					const render = md.render(text, {
						linkify: true,
						plugins: [
							[
								'markdown-it-front-matter',
								function (fm) {
									const result = Object.fromEntries(
										fm.split('\n').map(item => item.split(': ').map(part => part.trim())),
									)

									//fixme do something with frontMatter data
									console.dir(result)
								},
							],
						],
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
