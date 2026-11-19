/**
 * Client half: paints the conversation pane's text red.
 *
 * The Web page marks the conversation pane with `data-conversation-content`
 * (the chat region and the composer are its two `data-conversation-region`
 * children), so one scoped rule recolours every label token inside it without
 * touching the sidebar, the header, or the right column. Colors come from the
 * host's own `--dsw-alias-state-error-primary` token, which the theme resolves
 * per light/dark scheme, so the red stays legible in both.
 */
window.__ModuleLoader__.load({
  id: '@local/red-dialog-text',
  factory() {
    const CSS = `
html body [data-conversation-content] {
  --dsw-alias-label-primary: var(--dsw-alias-state-error-primary);
  --dsw-alias-label-secondary: var(--dsw-alias-state-error-primary);
  --dsw-alias-label-tertiary: var(--dsw-alias-state-error-primary);
  --dsw-alias-label-caption: var(--dsw-alias-state-error-primary);
  --dsw-alias-label-dimmed: var(--dsw-alias-state-error-primary);
  --dsw-alias-label-primary-dimmed: var(--dsw-alias-state-error-primary);
  --dsw-alias-link: var(--dsw-alias-state-error-primary);
  color: var(--dsw-alias-state-error-primary);
}
/* Keep the text caret red without repainting focus rings and interaction chrome,
   which fall back to --dsw-alias-state-business-primary. */
html body [data-conversation-content] [contenteditable] {
  caret-color: var(--dsw-alias-state-error-primary);
}
`
    return {
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style')
          style.dataset.plugin = '@local/red-dialog-text'
          style.dataset.pluginCss = '@local/red-dialog-text/conversation-text.css'
          style.textContent = CSS
          document.head.appendChild(style)
          return () => { style.remove() }
        }, 'red-dialog-text: conversation text color')
      },
    }
  },
})
