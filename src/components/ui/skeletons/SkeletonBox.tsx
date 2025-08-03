import { motion } from 'framer-motion';

const shimmerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SkeletonBox = ({ className }: { className: string }) => (
  <motion.div
    variants={shimmerVariants}
    initial="initial"
    animate="animate"
    className={`bg-gray-300 rounded ${className}`}
  />
);

export const SkeletonPage = () => {
  return (
    <motion.div
      className="p-6 space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Page Title */}
      <SkeletonBox className="h-8 w-1/4" />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i} className="h-24 w-full" />
        ))}
      </div>

      {/* Table */}
      <div className="space-y-4 mt-6">
        <SkeletonBox className="h-6 w-1/3" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, j) => (
              <SkeletonBox key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
