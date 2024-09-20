const Checkbox = ({ checked, setChecked, name, text, extra, classes }) => {
  return (
    <div className={'flex flex-row gap-4 text-md ' + classes}>
      <input
        type='checkbox'
        name={name}
        className='cursor-pointer'
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        {...extra}
      />
      <h2>{text}</h2>
    </div>
  );
};

export default Checkbox;
