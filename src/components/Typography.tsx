type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H1 = ({ children, className }: Props) => (
  <h1 className={`text-h1 font-serif ${className}`}>{children}</h1>
);

export const H2 = ({ children, className }: Props) => (
  <h2 className={`text-h2 font-serif ${className}`}>{children}</h2>
);

export const H3 = ({ children, className }: Props) => (
  <h3 className={`text-h3 font-serif ${className}`}>{children}</h3>
);

export const Body = ({ children, className }: Props) => (
  <p className={`text-body font-sans ${className}`}>{children}</p>
);

export const Small = ({ children, className }: Props) => (
  <p className={`text-small font-sans ${className}`}>{children}</p>
);

export const ButtonText = ({ children, className }: Props) => (
  <span className={`text-button font-sans ${className}`}>{children}</span>
);
