import Handlebars from "handlebars";

export default function compile(template: string, props = {}): string {
  return Handlebars.compile(template)(props);
}
