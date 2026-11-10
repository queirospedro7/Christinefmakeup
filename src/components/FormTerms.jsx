import { Link } from 'react-router-dom';

export default function FormTerms({ id, checked, onChange }) {
  return (
    <div className="rgpd-group form-terms">
      <label className="rgpd-custom-checkbox" htmlFor={id}>
        <input id={id} name="aceitouTermos" type="checkbox" checked={checked} onChange={onChange}
          className="rgpd-native-input" required />
        <span className={'rgpd-box' + (checked ? ' checked' : '')} aria-hidden="true">
          {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4 4 10-10" /></svg>}
        </span>
        <span className="rgpd-text">
          Li e aceito os <Link to="/termos" target="_blank" rel="noopener noreferrer">Termos e Condições</Link>{' '}
          e a <Link to="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link>. <strong>*</strong>
        </span>
      </label>
    </div>
  );
}
