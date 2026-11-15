export const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
export const COLORS = ['brand', 'success', 'warning', 'error', 'ai', 'neutral'];
export const STATUS = ['none', 'online', 'offline'];

export function avatarHTML({
  src = '',
  alt = 'AB',
  initials = 'AB',
  size = 'md',
  color = 'neutral',
  status = 'none',
  rounded = false,
} = {}) {
  const cls = [
    'avatar',
    `avatar--${size}`,
    !src && `avatar--${color}`,
    rounded && 'avatar--rounded',
    status === 'online' && 'avatar--online',
    status === 'offline' && 'avatar--offline',
  ].filter(Boolean).join(' ');

  const inner = src
    ? `<img class="avatar__img" src="${src}" alt="${alt}" />`
    : `<span class="avatar__initials" aria-hidden="true">${initials}</span>`;

  return `<span class="${cls}" role="img" aria-label="${alt}">${inner}</span>`;
}

export function avatarGroupHTML(avatars = []) {
  return `<div class="avatar-group">
  ${avatars.map((a) => avatarHTML(a)).join('\n  ')}
</div>`;
}

export function avatarSnippet(o) { return avatarHTML(o); }
