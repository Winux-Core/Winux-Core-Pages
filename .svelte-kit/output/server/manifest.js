export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "Winux-Pages/_app",
	assets: new Set([".nojekyll","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.Ba8r-__o.js",app:"_app/immutable/entry/app.Bo8NseE7.js",imports:["_app/immutable/entry/start.Ba8r-__o.js","_app/immutable/chunks/usiDyc4y.js","_app/immutable/chunks/DDLhBPZj.js","_app/immutable/chunks/Kj-kYF5h.js","_app/immutable/chunks/CZh5ukt1.js","_app/immutable/entry/app.Bo8NseE7.js","_app/immutable/chunks/DDLhBPZj.js","_app/immutable/chunks/BFjqId8L.js","_app/immutable/chunks/AUdZGtCk.js","_app/immutable/chunks/CZh5ukt1.js","_app/immutable/chunks/Bij0Vx89.js","_app/immutable/chunks/CJXXVX8y.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/Winux-Pages/","/Winux-Pages/projects"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
