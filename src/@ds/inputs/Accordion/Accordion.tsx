import "./Accordion.scss";

type TAccordionProps = {
  children: React.ReactNode | JSX.Element | string;
  className?: string;
  contentClassName?: string;
  secondary?: boolean;
  spanColor?: string;
  primary?: boolean;
  gradient?: boolean;
  label: string;
  icon: string;
};

export const Accordion = (props: TAccordionProps) => {
  const {
    contentClassName,
    className,
    secondary,
    children,
    gradient,
    primary,
    label,
    icon,
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
    <div className={`accordion-11cn ${variantClass} ${className}`}>
      <details {...rest}>
        <summary className='accordion-11cn__trigger color-alpha d-flex align-items-center justify-content-between gap-2'>
          <span>{label}</span>
          <ion-icon name={icon} />
        </summary>
        <div className={`accordion-11cn__content ${contentClassName}`}>
          {children}
        </div>
      </details>
    </div>
  );
};
