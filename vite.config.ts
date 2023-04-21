import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import analyzer from "rollup-plugin-analyzer";

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "/admin",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		// global css
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.less";`
				}
			}
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: false,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				"/api": {
					target: "http://localhost:8080",
					changeOrigin: true
					// rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		// plugins
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			viteEnv.VITE_REPORT && visualizer(),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				}),
			importToCDN({
				modules: [
					{
						name: "react",
						var: "React",
						path: "https://unpkg.com/react@18/umd/react.production.min.js"
					},
					{
						name: "react-dom",
						var: "ReactDOM",
						path: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
					},
					{
						name: "axios",
						var: "axios",
						path: "https://unpkg.com/axios/dist/axios.min.js"
					},
					{
						name: "dayjs",
						var: "dayjs",
						path: "https://cdn.staticfile.org/dayjs/1.11.7/dayjs.min.js"
					},
					{
						name: "antd",
						var: "antd",
						path: "https://cdn.bootcdn.net/ajax/libs/antd/5.3.1/antd.min.js",
						css: "https://cdn.bootcdn.net/ajax/libs/antd/4.24.9/antd.min.css"
					}
				]
			})
		],
		// build configure
		build: {
			outDir: "dist",
			minify: "terser",
			terserOptions: {
				// delete console/debugger
				compress: {
					drop_console: viteEnv.VITE_DROP_CONSOLE,
					drop_debugger: true
				}
			},
			rollupOptions: {
				plugins: [
					analyzer({
						summaryOnly: true,
						limit: 10
					})
				],
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
