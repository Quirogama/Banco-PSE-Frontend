import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export default function Button({ variant = 'primary', ...props }: Props) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return <button className={cls} {...props} />;
}
