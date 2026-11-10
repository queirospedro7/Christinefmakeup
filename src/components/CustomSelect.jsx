import { useEffect, useRef, useState } from 'react';

export default function CustomSelect({
  id, name, value, onChange, placeholder = 'Seleciona uma opção',
  options = [], required = false, hasError = false, className = '',
}) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const choices = options.map((option) => typeof option === 'string' ? { value: option, label: option } : option);
  const selected = choices.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  function handleKeys(event) {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      setOpen(false);
      trigger.current.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    const buttons = [...container.current.querySelectorAll('.custom-select-option')];
    const index = buttons.indexOf(document.activeElement);
    const next = event.key === 'ArrowDown' ? index + 1 : index < 0 ? buttons.length - 1 : index - 1;
    buttons[Math.max(0, Math.min(next, buttons.length - 1))]?.focus();
  }

  return (
    <div ref={container} className={['custom-select', open && 'open', className].filter(Boolean).join(' ')}
      onKeyDown={handleKeys} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
      <input type="hidden" name={name} value={value || ''} />
      <button id={id} ref={trigger} type="button"
        className={['custom-select-trigger', selected && 'has-value', hasError && 'error'].filter(Boolean).join(' ')}
        aria-expanded={open} aria-controls={id + '-options'} aria-invalid={hasError || undefined}
        onClick={() => setOpen(!open)}>
        <span>{selected?.label || placeholder}</span>
        <svg aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="m2 2 4 4 4-4" />
        </svg>
      </button>
      <div id={id + '-options'} className="custom-select-dropdown" data-lenis-prevent hidden={!open}>
        {(!required && selected ? [{ value: '', label: placeholder }, ...choices] : choices).map((option) => (
          <button key={option.value} type="button" aria-pressed={option.value === value}
            className={'custom-select-option' + (option.value === value ? ' selected' : '')}
            onClick={() => {
              onChange({ target: { name, value: option.value } });
              setOpen(false);
              trigger.current.focus();
            }}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
