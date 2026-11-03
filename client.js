/**
 * Client overlay for dsh-claude-style: keeps Claude's original vector lettering
 * at its native size and sets a serif prefix in front of it.
 */
window.__ModuleLoader__.load({
  id: 'dsh-fxck-claude-theme',
  factory(require) {
    const React = require('react');
    const css = `
body[data-dsh-claude-style][data-dsh-claude-brand="claude"] [data-dsh-claude-part~="brand-identity"] > [data-dsh-claude-part~="brand-name"] {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: var(--dsw-alias-label-primary) !important;
}
/* Preserve the shipped vector wordmark, its 18px height, and its intrinsic ratio. */
body[data-dsh-claude-style][data-dsh-claude-brand="claude"] [data-dsh-claude-part~="brand-identity"] > [data-dsh-claude-part~="brand-name"]::before {
  content: "" !important;
  order: 1 !important;
  display: block !important;
  flex: none !important;
  width: calc(18px * 512.22 / 121.54) !important;
  height: 18px !important;
  max-width: none !important;
  background: currentColor !important;
  -webkit-mask: var(--dsh-claude-mask-claude-word) !important;
  mask: var(--dsh-claude-mask-claude-word) !important;
}
/* The prefix's capital height matches the original 18px vector artwork. */
body[data-dsh-claude-style][data-dsh-claude-brand="claude"] [data-dsh-claude-part~="brand-identity"] > [data-dsh-claude-part~="brand-name"]::after {
  content: "Fuck";
  order: 0;
  display: block;
  flex: none;
  color: inherit;
  font-family: var(--dsh-claude-font-brand);
  font-size: 24px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: normal;
  white-space: nowrap;
}
/* Limit orange artwork to the expanded sidebar flower and collapsed rail flower. */
body[data-dsh-claude-style][data-dsh-claude-brand="claude"] :is([data-dsh-claude-part~="brand-mark"], [data-dsh-claude-part~="rail-mark"])::before {
  background-color: #d97757 !important;
}
`;
    function BrandStyles() {
      return React.createElement('style', { 'data-dsh-fxck-claude-theme': '' }, css);
    }
    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'dsh-fxck-claude-theme', order: 100,
        }, BrandStyles));
      },
    };
  },
});
