function Input({ id, title, value, setVal, placeHolder, type, autoComplete }) {
  return (
    <section>
      <label htmlFor={id}>{title}</label>:
      <input
        className={`${value?.length ? 'border-sky-500 border' : ''}`}
        type={type ? type : 'text'}
        id={id}
        autoComplete={autoComplete ? 'on' : 'off'}
        placeholder={placeHolder}
        maxLength={type == 'password' ? 20 : 100}
        minLength={type == 'password' ? 8 : 1}
        value={value}
        required
        onChange={(e) => setVal(e.target.value)}
      />
    </section>
  );
}

export default Input;
