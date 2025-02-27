import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface IconProps {
  icon: IconType;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Icon({ icon: IconComponent, size = 24, className = '', animate = false }: IconProps) {
  const IconWrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: { scale: 1.2 },
    whileTap: { scale: 0.9 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  return (
    <IconWrapper {...animationProps} className={`inline-flex items-center justify-center ${className}`}>
      <IconComponent size={size} />
    </IconWrapper>
  );
} 