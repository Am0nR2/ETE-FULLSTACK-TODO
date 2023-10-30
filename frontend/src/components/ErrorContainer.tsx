import Button from "./Button";
import "./errorContainer.css";
interface Props {
  children: React.ReactNode;
  resetError: () => void;
  bgColor?: string;
  color?: string;
}
const ErrorContainer = ({ children, resetError, bgColor, color }: Props) => {
  return (
    <div className="error">
      {children}
      <Button
        bgcolor={bgColor ? bgColor : "red"}
        color={color ? color : "white"}
        handleClick={resetError}
      >
        Understand!
      </Button>
    </div>
  );
};
export default ErrorContainer;
