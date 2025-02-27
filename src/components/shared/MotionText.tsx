import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type MotionTextElement = 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';

interface MotionTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: MotionTextElement;
}

export default function MotionText({ children, delay = 0, className = '', as = 'div' }: MotionTextProps) {
  const MotionComponent = motion[as] as React.ComponentType<HTMLMotionProps<MotionTextElement>>;
  
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
} 