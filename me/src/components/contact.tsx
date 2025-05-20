"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting me. I'll respond shortly.",
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description:
            data.error || "Failed to send message, please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: "https://github.com/Eloe321",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/cgelo-cadavos/",
      label: "LinkedIn",
    },
    {
      icon: <Facebook size={20} />,
      url: "https://www.facebook.com/Gelo.damnboss",
      label: "Facebook",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:cgelo.cadavos@gmail.com",
      label: "Email",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden bg-black py-20"
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mb-8 text-gray-400">
            Interested in working together or have a project in mind? Let's
            discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:items-start">
          <ContactInfo socialLinks={socialLinks} y={y} />
          <ContactForm
            form={form}
            onSubmit={onSubmit}
            y={y}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: false, amount: 0.3 }}
        />
        <motion.div
          className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        />
      </div>
    </section>
  );
}

function ContactInfo({ socialLinks, y }: { socialLinks: any[]; y: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.8 }}
      style={{ y }}
      className="h-full"
    >
      <div className="h-full rounded-lg bg-zinc-900 p-8">
        <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>

        <div className="space-y-6">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} link={link} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-gray-400">
            Based in San Francisco, California. Available for remote work
            worldwide.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SocialLink({ link, index }: { link: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={link.url}
      className="flex items-center gap-4 text-gray-400 transition-colors hover:text-white"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
        {link.icon}
      </div>
      <span>{link.label}</span>
    </motion.a>
  );
}

function ContactForm({
  form,
  onSubmit,
  y,
  isSubmitting,
}: {
  form: any;
  onSubmit: any;
  y: any;
  isSubmitting: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.8 }}
      style={{ y }}
      className="h-full"
    >
      <div className="h-full rounded-lg bg-zinc-900 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="bg-zinc-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      className="bg-zinc-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="min-h-[120px] bg-zinc-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
