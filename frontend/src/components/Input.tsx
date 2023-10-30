import "./input.css";
interface Props {
  label?: string;
  id?: string;
  width?: number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  val?: string | number;
  type?: string;
}
const Input = ({
  label,
  id = label,
  width,
  handleChange,
  val,
  type = "text",
}: Props) => {
  return (
    <div className="abstract-text-input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        style={{ width: `${width}px` }}
        onChange={handleChange}
        value={val}
      />
    </div>
  );
};
export default Input;
