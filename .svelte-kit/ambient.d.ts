
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const WINDOWID: string;
	export const COLORTERM: string;
	export const CSF_MDTVTexturesDirectory: string;
	export const CSF_DrawPluginDefaults: string;
	export const npm_config_npm_globalconfig: string;
	export const __EGL_VENDOR_LIBRARY_FILENAMES: string;
	export const NODE: string;
	export const COSMIC_PANEL_SPACING: string;
	export const LC_ADDRESS: string;
	export const COSMIC_PANEL_BACKGROUND: string;
	export const CSF_LANGUAGE: string;
	export const LC_NAME: string;
	export const CSF_MIGRATION_TYPES: string;
	export const npm_config_verify_deps_before_run: string;
	export const npm_config__jsr_registry: string;
	export const DRI_PRIME: string;
	export const LC_MONETARY: string;
	export const CSF_OCCTResourcePath: string;
	export const npm_config_globalconfig: string;
	export const CSF_STEPDefaults: string;
	export const COSMIC_PANEL_PADDING_OVERLAP: string;
	export const GH_PAGER: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const DRAWHOME: string;
	export const CODEX_MANAGED_BY_NPM: string;
	export const CSF_StandardLiteDefaults: string;
	export const X_MINIMIZE_APPLET: string;
	export const MOTD_SHOWN: string;
	export const HOME: string;
	export const LANG: string;
	export const LC_PAPER: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const WAYLAND_DISPLAY: string;
	export const VIRTUAL_ENV_DISABLE_PROMPT: string;
	export const MANROFFOPT: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const DCONF_PROFILE: string;
	export const INIT_CWD: string;
	export const CSF_ShadersDirectory: string;
	export const CSF_EXCEPTION_PROMPT: string;
	export const CSF_XmlOcafResource: string;
	export const QT_QPA_PLATFORM: string;
	export const npm_lifecycle_script: string;
	export const CSF_SHMessage: string;
	export const COSMIC_PANEL_SIZE: string;
	export const LC_IDENTIFICATION: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const COSMIC_PANEL_NAME: string;
	export const CODEX_THREAD_ID: string;
	export const npm_config_prefix: string;
	export const USER: string;
	export const npm_config_frozen_lockfile: string;
	export const GIT_PAGER: string;
	export const CSF_StandardDefaults: string;
	export const CSF_IGESDefaults: string;
	export const MANPAGER: string;
	export const DISPLAY: string;
	export const CSF_XCAFDefaults: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const PAGER: string;
	export const LC_TELEPHONE: string;
	export const LC_MEASUREMENT: string;
	export const XDG_VTNR: string;
	export const CSF_PluginDefaults: string;
	export const CSF_TObjMessage: string;
	export const XDG_SESSION_ID: string;
	export const COSMIC_PANEL_OUTPUT: string;
	export const npm_config_user_agent: string;
	export const CASROOT: string;
	export const NO_COLOR: string;
	export const PANEL_NOTIFICATIONS_FD: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_execpath: string;
	export const CODEX_CI: string;
	export const LC_CTYPE: string;
	export const XDG_RUNTIME_DIR: string;
	export const NODE_PATH: string;
	export const DEBUGINFOD_URLS: string;
	export const COSMIC_PANEL_ANCHOR: string;
	export const DOCKER_HOST: string;
	export const LC_TIME: string;
	export const npm_package_json: string;
	export const VK_LOADER_DRIVERS_SELECT: string;
	export const LC_ALL: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const CSF_XSMessage: string;
	export const MMGT_CLEAR: string;
	export const GDK_BACKEND: string;
	export const PATH: string;
	export const CSF_TObjDefaults: string;
	export const npm_config_node_gyp: string;
	export const QT_ENABLE_HIGHDPI_SCALING: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const MAIL: string;
	export const npm_config_registry: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const DRAWDEFAULT: string;
	export const X_PRIVILEGED_WAYLAND_SOCKET: string;
	export const npm_node_execpath: string;
	export const LC_NUMERIC: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		WINDOWID: string;
		COLORTERM: string;
		CSF_MDTVTexturesDirectory: string;
		CSF_DrawPluginDefaults: string;
		npm_config_npm_globalconfig: string;
		__EGL_VENDOR_LIBRARY_FILENAMES: string;
		NODE: string;
		COSMIC_PANEL_SPACING: string;
		LC_ADDRESS: string;
		COSMIC_PANEL_BACKGROUND: string;
		CSF_LANGUAGE: string;
		LC_NAME: string;
		CSF_MIGRATION_TYPES: string;
		npm_config_verify_deps_before_run: string;
		npm_config__jsr_registry: string;
		DRI_PRIME: string;
		LC_MONETARY: string;
		CSF_OCCTResourcePath: string;
		npm_config_globalconfig: string;
		CSF_STEPDefaults: string;
		COSMIC_PANEL_PADDING_OVERLAP: string;
		GH_PAGER: string;
		XDG_SEAT: string;
		PWD: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		DRAWHOME: string;
		CODEX_MANAGED_BY_NPM: string;
		CSF_StandardLiteDefaults: string;
		X_MINIMIZE_APPLET: string;
		MOTD_SHOWN: string;
		HOME: string;
		LANG: string;
		LC_PAPER: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		WAYLAND_DISPLAY: string;
		VIRTUAL_ENV_DISABLE_PROMPT: string;
		MANROFFOPT: string;
		pnpm_config_verify_deps_before_run: string;
		DCONF_PROFILE: string;
		INIT_CWD: string;
		CSF_ShadersDirectory: string;
		CSF_EXCEPTION_PROMPT: string;
		CSF_XmlOcafResource: string;
		QT_QPA_PLATFORM: string;
		npm_lifecycle_script: string;
		CSF_SHMessage: string;
		COSMIC_PANEL_SIZE: string;
		LC_IDENTIFICATION: string;
		TERM: string;
		npm_package_name: string;
		COSMIC_PANEL_NAME: string;
		CODEX_THREAD_ID: string;
		npm_config_prefix: string;
		USER: string;
		npm_config_frozen_lockfile: string;
		GIT_PAGER: string;
		CSF_StandardDefaults: string;
		CSF_IGESDefaults: string;
		MANPAGER: string;
		DISPLAY: string;
		CSF_XCAFDefaults: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		MOZ_ENABLE_WAYLAND: string;
		PAGER: string;
		LC_TELEPHONE: string;
		LC_MEASUREMENT: string;
		XDG_VTNR: string;
		CSF_PluginDefaults: string;
		CSF_TObjMessage: string;
		XDG_SESSION_ID: string;
		COSMIC_PANEL_OUTPUT: string;
		npm_config_user_agent: string;
		CASROOT: string;
		NO_COLOR: string;
		PANEL_NOTIFICATIONS_FD: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_execpath: string;
		CODEX_CI: string;
		LC_CTYPE: string;
		XDG_RUNTIME_DIR: string;
		NODE_PATH: string;
		DEBUGINFOD_URLS: string;
		COSMIC_PANEL_ANCHOR: string;
		DOCKER_HOST: string;
		LC_TIME: string;
		npm_package_json: string;
		VK_LOADER_DRIVERS_SELECT: string;
		LC_ALL: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		CSF_XSMessage: string;
		MMGT_CLEAR: string;
		GDK_BACKEND: string;
		PATH: string;
		CSF_TObjDefaults: string;
		npm_config_node_gyp: string;
		QT_ENABLE_HIGHDPI_SCALING: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		MAIL: string;
		npm_config_registry: string;
		ALACRITTY_WINDOW_ID: string;
		DRAWDEFAULT: string;
		X_PRIVILEGED_WAYLAND_SOCKET: string;
		npm_node_execpath: string;
		LC_NUMERIC: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
