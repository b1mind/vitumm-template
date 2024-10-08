export default function trailingSlashPlugin(options = { mode: 'always' }) {
	return {
		name: 'trailing-slash-plugin',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const { url } = req
				const hasTrailingSlash = url.endsWith('/')
				const isFile = url.includes('.')

				if (isFile) {
					next()
					return
				}

				if (options.mode === 'always' && !hasTrailingSlash) {
					res.writeHead(301, { Location: `${url}/` })
					res.end()
				} else if (options.mode === 'never' && hasTrailingSlash) {
					res.writeHead(301, { Location: url.slice(0, -1) })
					res.end()
				} else {
					next()
				}
			})
		},
	}
}
