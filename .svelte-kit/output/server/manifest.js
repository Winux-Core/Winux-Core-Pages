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
		client: {start:"_app/immutable/entry/start.CqXKd3Tb.js",app:"_app/immutable/entry/app.n0AtnRif.js",imports:["_app/immutable/entry/start.CqXKd3Tb.js","_app/immutable/chunks/DunMAluN.js","_app/immutable/chunks/BOOVY7f5.js","_app/immutable/chunks/CgElPx_o.js","_app/immutable/chunks/ZtZpX1ji.js","_app/immutable/entry/app.n0AtnRif.js","_app/immutable/chunks/BOOVY7f5.js","_app/immutable/chunks/CmJrI5we.js","_app/immutable/chunks/Bl_UjA2v.js","_app/immutable/chunks/ZtZpX1ji.js","_app/immutable/chunks/pzDwtdmR.js","_app/immutable/chunks/HJtaSrJk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
