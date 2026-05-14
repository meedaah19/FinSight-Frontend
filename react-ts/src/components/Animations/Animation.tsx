import {motion} from "framer-motion"

type PageLoadingProps = {
    children: React.ReactNode; 
    className: string;
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
};

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export  function PageLoading({children, className}: PageLoadingProps) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )}


export function Reveal({
    children,
    delay = 0,
    className = "",
    }: RevealProps) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.5,
            delay,
        }}
        viewport={{ once: true }}
        className={className}
        >
        {children}
        </motion.div>
  );
}    

export function RevealGroup({ children, className }: RevealGroupProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}