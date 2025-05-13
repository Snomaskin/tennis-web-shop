import { motion } from "framer-motion";
import { ReactNode } from "react";


interface FadeInOutProps {
  className?: string, 
  style?: React.CSSProperties,
  children: ReactNode, 
  duration?: number,
};

export const FadeInOut = ({ className, style, children, duration = 0.2 }: FadeInOutProps) => (
  <motion.div
    className={className}
    style={style}
    initial= {{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: duration }}
  >
    {children}
  </motion.div>
);