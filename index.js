/**
 * Restores the theme's original brand ink so the Client overlay can scope the
 * orange to the sidebar flower alone.
 */
export const name = 'dsh-fxck-claude-theme';
export const inject = ['configEditor'];

/**
 * Clears an earlier shared accent override without touching other preferences.
 *
 * The theme's `brandInk` treats uploaded images as shapes too, so an accent ink
 * paints more than the wordmark; this writes the entry back to `original` and
 * drops `brandAccent` once, after the profile lock is released.
 *
 * @param ctx - Cordis context carrying `configEditor`.
 * @param config - `{ target }`, the loader entry id of the `dsh-claude-style` entry.
 */
export function apply(ctx, config) {
  if (typeof config.target !== 'string') throw new Error('Expected the Claude theme entry id');
  let operation;
  const stop = ctx.on('tools/result', () => {
    stop();
    const entry = ctx.configEditor.entries().find(row => row.options.id === config.target);
    if (!entry || entry.options.name !== 'dsh-claude-style') {
      ctx.logger.error('The Claude theme entry is not available');
      return;
    }
    const current = entry.options.config ?? {};
    if (current.brandInk === 'original' && current.brandAccent === '') return;
    operation = ctx.configEditor.edit(entry, value => ({
      ...value, brandInk: 'original', brandAccent: '',
    })).catch(error => ctx.logger.error('Original Claude brand colors were not restored: %s', String(error)));
  });
  ctx.effect(() => () => operation);
}
