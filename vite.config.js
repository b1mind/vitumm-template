import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import postcss from '@vituum/vite-plugin-postcss'
import markdownIt from 'jstransformer-markdown-it'
// import { resolve } from 'path'
// import fs from 'fs'

export default {
	build: {
		rollupOptions: {
			input: ['./src/pages/**/*.html'],
		},
	},
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
				md: function (text) {
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
									//has to be viewed to generate the json... generates in build time after pug
									// if (result.slug) {
									// 	let dataSrc = `./src/data/${result.slug}.json`
									// 	let newData = JSON.stringify(result)
									// 	fs.writeFileSync(dataSrc, newData)
									// }

									//where does this even return too?
									return result
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
