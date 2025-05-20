"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const frontendSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Framer Motion",
    "Shadcn UI",
  ];

  const backendSkills = [
    "Node.js",
    "Express",
    "Django",
    "PostgreSQL",
    "Neon",
    "MongoDB",
    "Prisma",
    "Nest.js",
    "Docker",
    "RESTful APIs",
  ];

  const toolsSkills = [
    "Git",
    "GitHub",
    "VS Code",
    "Filen",
    "Figma",
    "PgAdmin",
    "Swagger",
    "Docker",
    "Vercel",
    "Vibes",
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-black py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            My technical toolkit and expertise across the full development
            stack.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Frontend Skills */}
          <SkillCategory
            title="Frontend Development"
            skills={frontendSkills}
            direction="left"
            transformX={x1}
          />

          {/* Backend Skills */}
          <SkillCategory
            title="Backend Development"
            skills={backendSkills}
            direction="right"
            transformX={x2}
          />

          {/* Tools & Others */}
          <SkillCategory
            title="Tools & Platforms"
            skills={toolsSkills}
            direction="left"
            transformX={x1}
          />
        </div>

        {/* 3D Skill Visualization */}
        <SkillVisualization />
      </div>
    </section>
  );
}

function SkillCategory({
  title,
  skills,
  direction,
  transformX,
}: {
  title: string;
  skills: string[];
  direction: "left" | "right";
  transformX: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.h3
        className="mb-6 text-2xl font-bold"
        initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: direction === "left" ? -20 : 20 }
        }
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h3>
      <motion.div className="flex gap-4" style={{ x: transformX }}>
        {skills.concat(skills).map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className={`flex-shrink-0 rounded-full ${
              direction === "left"
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            } px-6 py-3 backdrop-blur-sm`}
          >
            <span>{skill}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SkillVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 1, delay: 0.3 }}
      className="mt-20 flex justify-center"
    >
      <div className="relative h-64 w-64">
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/30" />
        <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/40" />
        <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/50" />
        <div className="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-70" />
      </div>
    </motion.div>
  );
}
