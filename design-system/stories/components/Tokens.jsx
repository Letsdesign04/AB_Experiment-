// Doc-only React blocks that render token tables from the generated
// dist/json/colors.json, so the docs can never disagree with the CSS.
import React, { useState } from 'react';
import tokens from '../../dist/json/colors.json';

const byName = Object.fromEntries(tokens.map((t) => [t.cssVar, t]));

// Resolve a token to its final hex by following references.
export function resolveHex(cssVar) {
  let t = byName[cssVar];
  while (t && t.ref) t = byName[t.ref];
  return t ? t.value : '';
}

function luminance(hex) {
  const n = hex.replace('#', '').slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function Copy({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="ds-copy"
      title="Copy"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
    >
      <code>{text}</code>
      <span className="ds-copy__hint">{done ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function ContrastBadge({ hex, against = '#ffffff', label = 'on white', exempt = false }) {
  if (hex.length > 7) return <span className="ds-muted">—</span>;
  if (exempt) return <span className="ds-badge ds-badge--neutral" title="WCAG does not require contrast for disabled controls">Exempt · disabled</span>;
  const r = contrast(hex, against);
  const grade = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large / UI' : 'Fail';
  const tone = r >= 4.5 ? 'pass' : r >= 3 ? 'partial' : 'fail';
  return (
    <span className={`ds-badge ds-badge--${tone}`} title={`${r.toFixed(2)}:1 ${label}`}>
      {r.toFixed(2)}:1 · {grade}
    </span>
  );
}

// Measure each token against the surface it is meant to sit on.
function contrastCell(name, hex) {
  if (/on-brand/.test(name)) return <ContrastBadge hex={hex} against={resolveHex('--bg-brand')} label="on --bg-brand" />;
  if (/on-dark/.test(name)) return <ContrastBadge hex={hex} against={resolveHex('--bg-dark')} label="on --bg-dark" />;
  return <ContrastBadge hex={hex} exempt={/disabled/.test(name)} />;
}

/** One table per semantic group (text, bg, border, icon, focus, chart). */
export function SemanticTable({ group, match, showContrast = false }) {
  const rows = tokens.filter(
    (t) => t.tier === 'semantic' && (!group || t.group === group) && (!match || match.test(t.name)),
  );
  return (
    <table className="ds-table">
      <thead>
        <tr>
          <th style={{ width: 64 }}>Swatch</th>
          <th>CSS variable</th>
          <th>Points to</th>
          <th>Hex</th>
          {showContrast && <th>Contrast</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => {
          const hex = resolveHex(t.cssVar);
          return (
            <tr key={t.cssVar}>
              <td>
                <span className="ds-swatch" style={{ background: `var(${t.cssVar})` }} />
              </td>
              <td>
                <Copy text={`var(${t.cssVar})`} />
                {t.description && <div className="ds-note">{t.description}</div>}
              </td>
              <td><code className="ds-muted">{t.ref}</code></td>
              <td><code>{hex.toUpperCase()}</code></td>
              {showContrast && <td>{contrastCell(t.name, hex)}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** A primitive ramp (gray, blue, …) as a row of swatches. */
export function Ramp({ name, highlight }) {
  const rows = tokens.filter((t) => t.group === `primitive/${name}`);
  return (
    <div className="ds-ramp">
      <div className="ds-ramp__label">{name}</div>
      <div className="ds-ramp__row">
        {rows.map((t) => {
          const step = t.name.replace(`color-${name}-`, '');
          const dark = t.value.length <= 7 && luminance(t.value) < 0.35;
          return (
            <div
              key={t.cssVar}
              className={`ds-chip ${highlight === step ? 'ds-chip--hl' : ''}`}
              style={{ background: `var(${t.cssVar})`, color: dark ? '#fff' : '#000624' }}
              title={`var(${t.cssVar})`}
            >
              <strong>{step}</strong>
              <span>{t.value.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Large brand swatch used at the top of the Brand colour page. */
export function BrandHero() {
  const hex = resolveHex('--bg-brand');
  return (
    <div className="ds-hero">
      <div className="ds-hero__swatch">
        <span className="ds-hero__name">Brand blue</span>
        <span className="ds-hero__hex">{hex.toUpperCase()}</span>
      </div>
      <div className="ds-hero__meta">
        <div><span className="ds-muted">Primitive</span><Copy text="var(--color-blue-600)" /></div>
        <div><span className="ds-muted">Use in components</span><Copy text="var(--bg-brand)" /></div>
        <div><span className="ds-muted">White text on brand</span><ContrastBadge hex={hex} /></div>
      </div>
    </div>
  );
}

/** Live interactive samples built only from tokens. */
export function BrandInUse() {
  return (
    <div className="ds-demo">
      <button className="ds-demo-btn ds-demo-btn--primary">Primary action</button>
      <button className="ds-demo-btn ds-demo-btn--soft">Soft action</button>
      <a className="ds-demo-link" href="#" onClick={(e) => e.preventDefault()}>Brand link</a>
      <span className="ds-demo-chip">Selected</span>
      <input className="ds-demo-input" placeholder="Focus me to see the ring" />
    </div>
  );
}
