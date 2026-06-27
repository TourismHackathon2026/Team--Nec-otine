import './Input.css';

function Input({ label, type = 'text', placeholder, value, onChange, error, name }) {
  return (
    <div className="input-group">
      {label && <label className="input-group__label" htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        className="input-group__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="input-group__error">{error}</p>}
    </div>
  );
}

export default Input;