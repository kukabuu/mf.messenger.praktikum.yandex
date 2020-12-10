export default function compile(template: string, props = {}) {
	return Handlebars.compile(template)(props);
}
