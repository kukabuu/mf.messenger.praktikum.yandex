export function render(selector, block) {
    const root = document.querySelector(selector);
    root?.append(block.getContent());
    return root;
}
//# sourceMappingURL=render.js.map