// Doc-only React blocks for the non-colour foundations. Every value is read from
// the generated dist/json files and every preview is styled with the real CSS
// variables and classes, so the docs can never disagree with what ships.
import React, { useMemo, useState } from 'react';
import tokens from '../../dist/json/foundations.json';
import icons from '../../dist/json/icons.json';
import { Copy } from './Tokens.jsx';
import logoUrl from '../../dist/logos/scalenut-logo.svg?url';
import logoDarkUrl from '../../dist/logos/scalenut-logo-on-dark.svg?url';
import markUrl from '../../dist/logos/scalenut-mark.svg?url';
import faviconUrl from '../../dist/logos/scalenut-favicon.svg?url';
import spriteUrl from '../../dist/icons/sprite.svg?url';

const group = (...path) => tokens.filter((t) => path.every((p, i) => t.path[i] === p));
const remToPx = (v) => (typeof v === 'string' && v.endsWith('rem') ? `${parseFloat(v) * 16}px` : v);
const byCss = Object.fromEntries(tokens.map((t) => [t.cssVar, t]));
const resolve = (cssVar) => {
  let t = byCss[cssVar];
  while (t && t.ref) t = byCss[t.ref];
  return t ? t.value : '';
};

function Table({ head, children }) {
  return (
    <table className="sb-unstyled ds-table">
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

// ─── Typography ─────────────────────────────────────────────────────────────

const SAMPLE = {
  display: 'Rank higher with AI',
  text: 'Write content that ranks on Google and AI search.',
  overline: 'How it works',
  numeric: '4,277 · 80/100',
  editor: 'How to write a content brief',
};

const spec = (t) => {
  const v = t.value;
  const pct = Math.round(parseFloat(v.letterSpacing) * 100) || 0;
  return `${remToPx(v.fontSize)} / ${remToPx(v.lineHeight)} · ${pct}%${t.css?.textTransform ? ' · uppercase' : ''}${t.css?.tabularNums ? ' · tabular figures' : ''}`;
};

/** The main scale: one row per size, sample in the weight it is most used at, all four weight classes listed. */
export function TypeScale({ family, sampleWeight = 'regular' }) {
  const all = group('text-style').filter((t) => t.path[1].startsWith(`${family}-`));
  const sizes = [...new Set(all.map((t) => t.path[1].replace(/-(regular|medium|semibold|bold)$/, '')))];
  return (
    <div className="sb-unstyled ds-type-scale">
      {sizes.map((size) => {
        const variants = all.filter((t) => t.path[1].startsWith(`${size}-`));
        const sample = variants.find((t) => t.path[1].endsWith(`-${sampleWeight}`)) ?? variants[0];
        return (
          <div className="ds-type-row" key={size}>
            <div className="ds-type-meta">
              <strong className="ds-type-name">{sample.figma.split('/')[0]}</strong>
              <div className="ds-note">{spec(sample)}</div>
              {sample.usage && <div className="ds-type-usage">{sample.usage}</div>}
              <div className="ds-type-classes">
                {variants.map((t) => <Copy key={t.name} text={`.${t.path[1]}`} />)}
              </div>
            </div>
            <div className={`ds-type-sample ${sample.path[1]}`}>{SAMPLE[family]}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Single-purpose styles (overline, numeric, editor). One row per style. */
export function SpecialStyles({ family }) {
  const rows = group('text-style').filter((t) => t.path[1].startsWith(`${family}-`));
  return (
    <div className="sb-unstyled ds-type-scale">
      {rows.map((t) => (
        <div className="ds-type-row" key={t.name}>
          <div className="ds-type-meta">
            <strong className="ds-type-name">{t.figma}</strong>
            <div className="ds-note">{spec(t)} · weight {t.value.fontWeight}</div>
            {t.description && <div className="ds-type-usage">{t.description}</div>}
            <div className="ds-type-classes"><Copy text={`.${t.path[1]}`} /></div>
          </div>
          <div className={`ds-type-sample ${t.path[1]}`}>{SAMPLE[family]}</div>
        </div>
      ))}
    </div>
  );
}

/** Weight comparison for one size. */
export function WeightRow({ size = 'text-lg' }) {
  return (
    <div className="sb-unstyled ds-weights">
      {['regular', 'medium', 'semibold', 'bold'].map((w) => (
        <div key={w}>
          <div className={`${size}-${w}`} style={{ color: 'var(--text-primary)' }}>Aa Scalenut</div>
          <Copy text={`--font-weight-${w}`} />
          <div className="ds-note">{resolve(`--font-weight-${w}`)}</div>
        </div>
      ))}
    </div>
  );
}

/** Raw typography variables (family, weight, size, line height, letter spacing). */
export function FontTokenTable({ part }) {
  const rows = group('font', part);
  return (
    <Table head={['CSS variable', 'Value', 'Pixels / note']}>
      {rows.map((t) => (
        <tr key={t.name}>
          <td><Copy text={`var(${t.cssVar})`} /></td>
          <td><code>{String(t.value)}</code></td>
          <td className="ds-muted">{t.description}</td>
        </tr>
      ))}
    </Table>
  );
}

// ─── Spacing, sizes, radius ─────────────────────────────────────────────────

export function SpacingScale() {
  return (
    <Table head={['CSS variable', 'Value', '']}>
      {group('spacing').map((t) => (
        <tr key={t.name}>
          <td style={{ width: 220 }}><Copy text={`var(${t.cssVar})`} /></td>
          <td style={{ width: 80 }}><code>{t.value}</code></td>
          <td><span className="ds-space-bar" style={{ width: `var(${t.cssVar})` }} /></td>
        </tr>
      ))}
    </Table>
  );
}

export function SizeTable({ kind }) {
  const rows = group('size', kind);
  const visual = (t) => {
    if (kind === 'control') return <span className="ds-size-box" style={{ height: `var(${t.cssVar})`, width: 120 }} />;
    if (kind === 'icon' || kind === 'avatar' || kind === 'target')
      return <span className={`ds-size-box ${kind === 'avatar' ? 'ds-size-box--round' : ''}`} style={{ height: `var(${t.cssVar})`, width: `var(${t.cssVar})` }} />;
    return <span className="ds-space-bar" style={{ width: `calc(var(${t.cssVar}) / 6)` }} title="Shown at 1/6 scale" />;
  };
  return (
    <Table head={['CSS variable', 'Value', '']}>
      {rows.map((t) => (
        <tr key={t.name}>
          <td style={{ width: 240 }}><Copy text={`var(${t.cssVar})`} /></td>
          <td style={{ width: 80 }}><code>{t.value}</code></td>
          <td>{visual(t)}</td>
        </tr>
      ))}
    </Table>
  );
}

export function BorderWidthTable() {
  return (
    <Table head={['CSS variable', 'Value', '']}>
      {group('border-width').map((t) => (
        <tr key={t.name}>
          <td style={{ width: 240 }}><Copy text={`var(${t.cssVar})`} /></td>
          <td style={{ width: 80 }}><code>{t.value}</code></td>
          <td><span className="ds-border-sample" style={{ borderWidth: `var(${t.cssVar})` }} /></td>
        </tr>
      ))}
    </Table>
  );
}

export function RadiusScale() {
  return (
    <div className="sb-unstyled ds-tiles">
      {group('radius').map((t) => (
        <div className="ds-tile" key={t.name}>
          <div className="ds-radius-sample" style={{ borderRadius: `var(${t.cssVar})` }} />
          <Copy text={`var(${t.cssVar})`} />
          <div className="ds-note">{t.value}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Grid ───────────────────────────────────────────────────────────────────

export function GridTable() {
  const keys = ['mobile', 'tablet', 'laptop', 'desktop', 'wide'];
  const v = (k, p) => {
    const t = tokens.find((x) => x.path[0] === 'grid' && x.path[1] === k && x.path[2] === p);
    return t ? String(t.value) : '—';
  };
  return (
    <Table head={['Breakpoint', 'From width', 'Columns', 'Gutter', 'Margin']}>
      {keys.map((k) => (
        <tr key={k}>
          <td style={{ textTransform: 'capitalize' }}><strong>{k}</strong></td>
          <td><code>{k === 'mobile' ? '0' : v(k, 'min-width')}</code></td>
          <td>{v(k, 'columns')}</td>
          <td><code>{v(k, 'gutter')}</code></td>
          <td><code>{k === 'wide' ? `centred, max ${v(k, 'max-content')}` : v(k, 'margin')}</code></td>
        </tr>
      ))}
    </Table>
  );
}

/** Live .layout-grid. Resize the browser to watch it switch from 4 to 8 to 12 columns. */
export function LayoutGridDemo() {
  return (
    <div className="sb-unstyled ds-grid-frame">
      <div className="layout-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <div className="ds-grid-col" key={i}>{i + 1}</div>
        ))}
      </div>
    </div>
  );
}

export function ColsDemo({ n }) {
  return (
    <div className={`sb-unstyled grid-cols-${n}`} style={{ marginBottom: 16 }}>
      {Array.from({ length: n }, (_, i) => (
        <div className="ds-grid-col" key={i}>{`1/${n}`}</div>
      ))}
    </div>
  );
}

// ─── Effects ────────────────────────────────────────────────────────────────

export function ShadowScale() {
  return (
    <div className="sb-unstyled ds-tiles ds-tiles--shadow">
      {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
        <div className="ds-tile" key={s}>
          <div className="ds-shadow-card" style={{ boxShadow: `var(--shadow-${s})` }}>{s}</div>
          <Copy text={`var(--shadow-${s})`} />
        </div>
      ))}
    </div>
  );
}

export function EffectTable() {
  return (
    <Table head={['CSS variable', 'Value', 'Figma style']}>
      {tokens.filter((t) => t.path[0] === 'shadow' || t.path[0] === 'blur').map((t) => (
        <tr key={t.name}>
          <td style={{ width: 260 }}>
            <Copy text={`var(${t.cssVar})`} />
            {t.description && <div className="ds-note">{t.description}</div>}
          </td>
          <td><code className="ds-wrap">{t.value}</code></td>
          <td className="ds-muted">{t.figma ?? ''}</td>
        </tr>
      ))}
    </Table>
  );
}

export function FocusDemo() {
  return (
    <div className="sb-unstyled ds-demo">
      <button className="ds-fx-btn" style={{ boxShadow: 'var(--shadow-focus-ring)' }}>Focus ring</button>
      <button className="ds-fx-btn ds-fx-btn--error" style={{ boxShadow: 'var(--shadow-focus-ring-error)' }}>Focus ring error</button>
      <input className="ds-fx-input" placeholder="Focus halo" style={{ borderColor: 'var(--border-brand)', boxShadow: 'var(--shadow-focus-halo)' }} />
      <input className="ds-fx-input" placeholder="Focus halo error" style={{ borderColor: 'var(--border-error)', boxShadow: 'var(--shadow-focus-halo-error)' }} />
    </div>
  );
}

export function GlowBlurDivider() {
  return (
    <div className="sb-unstyled ds-tiles ds-tiles--shadow">
      <div className="ds-tile">
        <div className="ds-glow-card">Dark card</div>
        <Copy text="var(--shadow-glow-dark-card)" />
      </div>
      <div className="ds-tile">
        <div className="ds-shadow-card ds-locked">
          <span style={{ filter: 'blur(var(--blur-locked-content))' }}>Upgrade to see your keyword gaps</span>
        </div>
        <Copy text="blur(var(--blur-locked-content))" />
      </div>
      <div className="ds-tile">
        <div className="ds-shadow-card ds-topbar" style={{ boxShadow: 'var(--shadow-divider-bottom)' }}>Top bar</div>
        <Copy text="var(--shadow-divider-bottom)" />
      </div>
    </div>
  );
}

// ─── Gradients ──────────────────────────────────────────────────────────────

export function GradientSwatches() {
  return (
    <div className="sb-unstyled ds-gradients">
      {group('gradient').map((t) => (
        <div className="ds-gradient" key={t.name}>
          <div className="ds-gradient__swatch" style={{ background: `var(${t.cssVar})` }} />
          <div className="ds-gradient__meta">
            <Copy text={`var(${t.cssVar})`} />
            <code className="ds-wrap ds-muted">{t.value}</code>
            <div className="ds-note">{t.description.replace('Used in: ', 'Used in ')}</div>
            {t.offPalette?.length > 0 && (
              <div className="ds-note">
                <span className="ds-badge ds-badge--partial">Off palette: {t.offPalette.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────

export function Icon({ name, size = 16, className = '' }) {
  const icon = icons.find((i) => i.name === name);
  if (!icon) return null;
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 16 16" style={{ width: size, height: size }} aria-hidden="true">
      {icon.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.evenodd ? 'evenodd' : undefined} clipRule={p.evenodd ? 'evenodd' : undefined} />
      ))}
    </svg>
  );
}

const BROKEN = ['align-text-left', 'fork', 'trend'];

export function IconGallery() {
  const [q, setQ] = useState('');
  const [size, setSize] = useState(24);
  const [copied, setCopied] = useState('');
  const list = useMemo(() => icons.filter((i) => i.name.includes(q.trim().toLowerCase())), [q]);
  return (
    <div>
      <div className="sb-unstyled ds-icon-toolbar">
        <input className="ds-fx-input" placeholder={`Search ${icons.length} icons`} value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="ds-seg">
          {[16, 20, 24].map((s) => (
            <button key={s} className={size === s ? 'is-on' : ''} onClick={() => setSize(s)}>{s}px</button>
          ))}
        </div>
        <span className="ds-muted">{list.length} shown · click to copy the name</span>
      </div>
      <div className="sb-unstyled ds-icon-grid">
        {list.map((i) => (
          <button
            key={i.name}
            className={`ds-icon-cell ${BROKEN.includes(i.name) ? 'ds-icon-cell--warn' : ''}`}
            title={BROKEN.includes(i.name) ? 'Artwork sits outside the 16px frame in Figma. Fix in Figma, then re-sync.' : i.name}
            onClick={() => {
              navigator.clipboard?.writeText(i.name);
              setCopied(i.name);
              setTimeout(() => setCopied(''), 1200);
            }}
          >
            <Icon name={i.name} size={size} />
            <span>{copied === i.name ? 'Copied' : i.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function IconColours() {
  const tones = ['', 'secondary', 'brand', 'error', 'success', 'warning', 'ai', 'disabled'];
  return (
    <div className="sb-unstyled ds-demo">
      {tones.map((t) => (
        <div key={t} className="ds-tile" style={{ alignItems: 'center' }}>
          <Icon name="lightning" size={24} className={t ? `icon--${t}` : ''} />
          <code style={{ fontSize: 12 }}>{t ? `.icon--${t}` : '.icon'}</code>
        </div>
      ))}
      <div className="ds-tile" style={{ alignItems: 'center', background: 'var(--bg-brand)', padding: 12, borderRadius: 8 }}>
        <Icon name="lightning" size={24} className="icon--on-brand" />
        <code style={{ fontSize: 12, color: 'var(--text-on-brand)' }}>.icon--on-brand</code>
      </div>
    </div>
  );
}

export { spriteUrl };

// ─── Logos ──────────────────────────────────────────────────────────────────

const LOGOS = [
  { label: 'Logo', file: 'scalenut-logo.svg', url: logoUrl, bg: 'var(--bg-primary)', h: 40, use: 'Mark + wordmark. Use on white and light grey.' },
  { label: 'Logo on dark', file: 'scalenut-logo-on-dark.svg', url: logoDarkUrl, bg: 'var(--bg-dark)', h: 40, use: 'Use on navy (--bg-dark, --gradient-dark-hero).' },
  { label: 'Mark', file: 'scalenut-mark.svg', url: markUrl, bg: 'var(--bg-subtle)', h: 48, use: 'The mark on its own, from Logo/Scalenut/Mark.' },
  { label: 'Favicon', file: 'scalenut-favicon.svg', url: faviconUrl, bg: 'var(--bg-subtle)', h: 32, use: 'Browser tab, from Logo/Scalenut/Favicon.' },
];

export function LogoShowcase() {
  return (
    <div className="sb-unstyled ds-logos">
      {LOGOS.map((l) => (
        <div className="ds-logo" key={l.file}>
          <div className="ds-logo__stage" style={{ background: l.bg }}>
            <img src={l.url} alt={`Scalenut ${l.label.toLowerCase()}`} style={{ height: l.h }} />
          </div>
          <div className="ds-logo__meta">
            <strong>{l.label}</strong>
            <span className="ds-note">{l.use}</span>
            <a className="ds-demo-link" href={l.url} download={l.file}>Download {l.file}</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LogoClearSpace() {
  // Clear space = mark height on every side. At 40px tall the mark is 40px, so the padding is 40px.
  return (
    <div className="sb-unstyled ds-logo__stage" style={{ background: 'var(--bg-primary)' }}>
      <div className="ds-clearspace">
        <img src={logoUrl} alt="Scalenut logo with clear space marked" style={{ height: 40, display: 'block' }} />
      </div>
    </div>
  );
}

// ─── Simple tables for MDX ──────────────────────────────────────────────────
// Storybook's MDX doesn't parse Markdown tables without remark-gfm, so pages
// pass rows here instead. `code` and **bold** inside cells are supported.
function inline(text) {
  return String(text)
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code>
      : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>,
    );
}

export function MdTable({ head, rows }) {
  return (
    <table className="sb-unstyled ds-table">
      <thead>
        <tr>{head.map((h) => <th key={h}>{inline(h)}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
