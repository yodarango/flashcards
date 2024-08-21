import "./SectionalButton.scss";

type TSectionalButtonProps = {
  className?: string;
  secondary?: boolean;
  spanColor?: string;
  primary?: boolean;
  gradient?: boolean;
  value?: string;
  label: string;
  icon: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SectionalButton = (props: TSectionalButtonProps) => {
  const {
    className,
    secondary,
    gradient,
    primary,
    label,
    icon,
    value,
    ...rest
  } = props;

  const variantClass = primary
    ? "primary"
    : secondary
    ? "secondary"
    : gradient
    ? "gradient"
    : "";

  return (
    <button
      className={`sectional-button-00it ${variantClass} ${className}`}
      {...rest}
    >
      <span>{label}</span>
      <span className='d-inline-flex color-alpha align-items-center justify-content-end gap-2'>
        <span>{value}</span>
        <ion-icon name={icon} />
      </span>
    </button>
  );
};
