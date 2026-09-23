"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex h-full min-h-[360px] w-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 shadow-[0_18px_55px_rgba(3,39,57,0.09)] transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(3,39,57,0.16)] sm:min-h-[390px] sm:p-8",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-orange-100 to-amber-200/60",
        gray: "bg-gradient-to-br from-slate-100 to-slate-200/70",
        purple: "bg-gradient-to-br from-purple-100 to-indigo-200/60",
        green: "bg-gradient-to-br from-emerald-100 to-teal-200/60",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  },
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeText,
      badgeColor,
      title,
      description,
      ctaText,
      ctaHref,
      imageUrl,
      imageAlt,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();

    const cardAnimation = reduceMotion
      ? { rest: { scale: 1, y: 0 }, hover: { scale: 1, y: 0 } }
      : { rest: { scale: 1, y: 0 }, hover: { scale: 1.02, y: -4 } };

    const imageAnimation = reduceMotion
      ? { rest: { scale: 1, rotate: 0 }, hover: { scale: 1, rotate: 0 } }
      : { rest: { scale: 1, rotate: 0 }, hover: { scale: 1.07, rotate: 2 } };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        animate="rest"
        whileHover="hover"
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
        ref={ref}
      >
        <div className={cn(cardVariants({ gradient }), className)} {...props}>
          <motion.img
            src={imageUrl}
            alt={imageAlt}
            width="720"
            height="450"
            loading="lazy"
            decoding="async"
            variants={imageAnimation}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-none absolute -right-[18%] -bottom-[16%] h-[62%] w-[72%] rounded-[2rem] object-cover opacity-45 [mask-image:linear-gradient(135deg,transparent_0%,black_36%)]"
          />

          <div className="z-10 flex h-full flex-col">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/55 px-3 py-1.5 text-xs font-semibold text-[#274657] backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: badgeColor }}
                aria-hidden="true"
              />
              {badgeText}
            </div>

            <div className="max-w-[22rem] flex-grow">
              <h3 className="mb-3 text-2xl font-bold tracking-[-0.04em] text-[#031a2b] sm:text-[1.7rem]">
                {title}
              </h3>
              <p className="max-w-xs text-sm leading-7 text-[#355564]">
                {description}
              </p>
            </div>

            <a
              href={ctaHref}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#031a2b] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#006b87] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#006b87]"
            >
              {ctaText}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </motion.div>
    );
  },
);

GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
