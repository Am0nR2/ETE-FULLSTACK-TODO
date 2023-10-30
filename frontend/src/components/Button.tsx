import "./button.css";
interface Props {
  children: string;
  bgcolor?: string;
  color?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const Button = ({
  children = "Button",
  bgcolor = "orange",
  color = "black",
  handleClick,
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled}
      style={{ backgroundColor: bgcolor, color: disabled ? "gray" : color }}
      className="abstract-btn"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
export default Button;
