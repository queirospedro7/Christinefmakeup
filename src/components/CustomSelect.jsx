export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  placeholder = 'Seleciona uma opção',
  options = [],
  required = false,
  hasError = false,
  className = '',
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      aria-invalid={hasError || undefined}
      className={[className, hasError ? 'error' : ''].filter(Boolean).join(' ')}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => {
        const { value: key, label } = typeof option === 'string' ? { value: option, label: option } : option;
        return <option key={key} value={key}>{label}</option>;
      })}
    </select>
  );
}
