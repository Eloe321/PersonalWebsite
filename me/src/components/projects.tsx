"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const projects = [
    {
      id: 1,
      title: "BARS - Bisaya Assistant Rap System",
      description:
        "A full-stack AI assistant rap system that helps users asists their bisaya rap lyrics, simulating almost like VSCode which auto completes and guides uses with suggestions. Integrates JWT Authentication, Collaboration, and Uploading and Downloading Files.",
      image: "/images/BARS.png",
      tags: [
        "Monorepo",
        "Turborepo",
        "Next.js",
        "Prisma",
        "Nest.js",
        "Flask",
        "Neon",
        "Filen",
        "Node.js",
        "JWT",
      ],
      github: "https://github.com/Eloe321/BARS",
      demo: "Under Development",
    },
    {
      id: 2,
      title: "CITU SSG Elections",
      description:
        "A Website to Update the students on the standings of the current SSG Elections. Uses Full stack of NextJS, NestJS, Mongoose, and MongoDB",
      image: "/images/SSG_Elections.png",
      tags: ["Next.js", "Nest.js", "Node.js", "Mongoose", "MongoDB", "Docker"],
      github: "https://github.com/Wetooa/CITU-SSG-Elections/tree/dev",
      demo: "https://citu-ssg-elections.vercel.app/",
    },
    {
      id: 3,
      title: "Project CITU Intramurals 2025",
      description:
        "A website that integrates data collection which then is displayed for the users to be updated on the current standings of the Intramurals 2025",
      image: "/images/Intrams.png",
      tags: ["Next.js", "Nest.js", "Node.js", "Excel"],
      github: "https://github.com/Wetooa/CITU-Intramurals-2025",
      demo: "https://project-citu-intramurals-2025.vercel.app/",
    },
    {
      id: 4,
      title: "TekNotes",
      description:
        "A Note taking website that simulates a social media platform where users can share notes seemlessly which also integrates a real time chat system, with the constraints of using only django.",
      image: "/images/TekNotes-Icon.png",
      tags: ["html", "Javascript", "Django"],
      github: "https://github.com/Wetooa/TekNotes",
      demo: "Not Deployed",
    },
    {
      id: 5,
      title: "Techonologian Project Halalan 2025",
      description:
        "A website that displays the current standings of the Halalan 2025",
      image: "/images/Halalan.png",
      tags: ["Next.js", "Typescript", "Node.js"],
      github: "https://github.com/Wetooa/techonologian-project-halalan-2025",
      demo: "https://techonologian-project-halalan-2025.vercel.app/",
    },
  ];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-zinc-900 py-20"
    >
      <div ref={containerRef} className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
            My Projects
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            A collection of my recent development projects, showcasing my skills
            and expertise in various technologies.
          </p>
        </motion.div>

        <div className="grid gap-12">
          {projects.map((project, index) => {
            return (
              <ProjectCard key={project.id} project={project} index={index} />
            );
          })}
        </div>
      </div>

      {/* Parallax background elements */}
      <motion.div
        className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute -right-20 bottom-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
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
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden border-0 bg-zinc-800 shadow-xl">
        <CardContent className="p-0">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="relative overflow-hidden h-[250px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>

            <div className="flex flex-col justify-center p-6">
              <h3 className="mb-2 text-2xl text-white font-bold">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-400">{project.description}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-white bg-zinc-700 hover:bg-blue-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex gap-4">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </Button>
                {project.demo !== "Not Deployed" &&
                project.demo !== "Under Development" ? (
                  <Button
                    size="sm"
                    className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                ) : project.demo === "Not Deployed" ? (
                  <Button
                    size="sm"
                    className="gap-2 bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                    disabled
                  >
                    <ExternalLink size={16} />
                    <span>Not Deployed</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="gap-2 bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                    disabled
                  >
                    <ExternalLink size={16} />
                    <span>Under Development</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
