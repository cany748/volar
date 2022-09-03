import * as alpineTs from '@volar/alpine-language-core';
import * as vueLs from '@volar/vue-language-service';
import { ConfigurationHost, EmbeddedLanguageServicePlugin, setCurrentConfigurationHost } from '@volar/vue-language-service-types';
import { URI } from 'vscode-uri';

export function createLanguageService(
	alpineLsHost: alpineTs.LanguageServiceHost,
	configurationHost: ConfigurationHost | undefined,
	customPlugins: EmbeddedLanguageServicePlugin[],
	rootUri: URI,
): ReturnType<typeof vueLs['createLanguageService']> {
	setCurrentConfigurationHost(configurationHost);
	return vueLs.createLanguageService(
		{
			...alpineLsHost,
			getVueCompilationSettings: () => ({}),
		},
		undefined,
		undefined,
		configurationHost,
		customPlugins,
		rootUri,
		undefined,
		() => alpineTs.createLanguageContext(alpineLsHost),
	);
}

export function getDocumentService(
	ts: typeof import('typescript/lib/tsserverlibrary'),
	configurationHost: ConfigurationHost | undefined,
	customPlugins: EmbeddedLanguageServicePlugin[],
	rootUri: URI,
): ReturnType<typeof vueLs['getDocumentService']> {
	setCurrentConfigurationHost(configurationHost);
	return vueLs.getDocumentService(
		ts,
		configurationHost,
		undefined,
		customPlugins,
		rootUri,
	);
}
