"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 0.8, 1]);

  const experiences = [
    {
      id: 1,
      role: "Website Associate",
      company: "The Technologian",
      period: "2023 - Present",
      description:
        "Participated in many projects from the organization, from website development to website maintenance.",
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Nest.js",
        "Node.js",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "Vercel",
        "Vibes",
      ],
    },
    {
      id: 2,
      role: "CITU Student",
      company: "Cebu Institute of Technology - University",
      period: "2021 - 2026",
      description:
        "Has been through the hardships of being a Computer Science Student in CITU, Learned many concepts and algorithms",
      technologies: [
        "C",
        "C++",
        "Java",
        "Python",
        "Data Structure Algorithms",
        "Object Oriented Programming",
        "Intellegent Systems",
      ],
    },
    {
      id: 3,
      role: "Audience",
      company: "Hackathon",
      period: "2021 - 2023",
      description:
        "I've observed many hackathons to understand practices, strategies, and ideas",
      technologies: ["Next.js", "Nest.js", "PHP", "Databases", "AI"],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-900 py-20"
    >
      <motion.div
        className="container relative z-10 mx-auto px-4"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
            Coding Experience
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            My Coding journey and the organizations I've collaborated with.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 ml-6 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 md:left-1/2 md:-ml-0.5" />

          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={i * 5}
              y1="0"
              x2={i * 5}
              y2="100"
              stroke="white"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: any;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.div
      ref={ref}
      className="relative mb-12"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div
        className={`flex flex-col items-start md:flex-row ${
          index % 2 === 0 ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Timeline dot */}
        <div className="absolute left-0 top-0 ml-4 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 md:left-1/2 md:-ml-2" />

        {/* Content */}
        <div
          className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
            index % 2 === 0 ? "md:mr-12 md:pr-4" : "md:ml-12 md:pl-4"
          }`}
        >
          <Card className="overflow-hidden border-0 bg-zinc-800 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">
                  {experience.role}
                </h3>
                <span className="text-sm text-gray-400">
                  {experience.period}
                </span>
              </div>
              <p className="mb-4 text-purple-400">{experience.company}</p>
              <p className="mb-4 text-gray-300">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-purple-500/50 text-white"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
