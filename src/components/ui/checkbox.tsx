interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => {
  return (
    <input type='checkbox' checked={checked} onChange={(e) => { onCheckedChange(e.target.checked) }}></input>
  );
}

export { Checkbox };
