"use client";
import Link from "next/link";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Github, BookOpen, ArrowUpRight, ExternalLink } from "lucide-react";

export default function Intro() {
  // 컨테이너 애니메이션 (순차 등장)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // 아이템 애니메이션 (위로 떠오르기)
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  /* Latest Posts Blob Animations */
  // Main Blob (Bottom-Right)
  const blobVariants1 = {
    initial: { scale: 1, x: 0, y: 0 },
    hover: {
      scale: [1, 1.2, 0.9, 1.1],
      x: [0, 20, -10, 0],
      y: [0, -15, 10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      },
    },
  };

  // Secondary Blob (Top-Left, different rhythm)
  const blobVariants2 = {
    initial: { scale: 1, x: 0, y: 0 },
    hover: {
      scale: [1, 0.8, 1.1, 0.9],
      x: [0, -15, 10, 0],
      y: [0, 10, -20, 0],
      transition: {
        duration: 3, // Slower
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
        delay: 0.5, // Slight delay for organic feel
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl p-4 mt-24 mb-12"
    >
      {/* Main Bio Card */}
      <motion.div
        variants={item}
        className="col-span-2 md:col-span-2 md:row-span-2 p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-sm flex flex-col justify-center gap-4 hover:border-primary/30 transition-colors duration-500"
      >
        <div className="font-heading font-bold text-3xl md:text-4xl text-foreground min-h-30">
          <TypeAnimation
            sequence={["안녕하세요, \n이해하는 개발자 \n이성종입니다."]}
            wrapper="span"
            cursor={true}
            repeat={0}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">
          좋은 개발자이기 전에, <br />
          좋은 사람이 되고 싶습니다.
        </p>
      </motion.div>

      {/* Posts Link - Primary Color & Living Blob Animation */}
      <motion.div
        variants={item}
        className="col-span-2 md:col-span-2 h-[180px]"
      >
        <Link href="/posts" className="block h-full">
          {/* motion.div로 감싸서 hover 상태 감지 */}
          <motion.div
            initial="initial"
            whileHover="hover"
            animate="initial"
            className="h-full p-6 rounded-3xl bg-primary/5 backdrop-blur-md border border-primary/10 hover:bg-primary/10 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="z-10">
              <div className="flex justify-between items-start mb-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <ArrowUpRight className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Latest Posts
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                기술과 경험을 기록합니다.
              </p>
            </div>
            {
              /* Living Blobs */
              // Bottom Right Blob
            }
            <motion.div
              variants={blobVariants1}
              className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors"
            />
            {/* Top Left Blob */}
            <motion.div
              variants={blobVariants2}
              className="absolute -left-4 -top-4 w-24 h-24 bg-primary/15 rounded-full blur-xl group-hover:bg-primary/25 transition-colors"
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Github Link - Custom Theme Colors */}
      <motion.div variants={item} className="col-span-1 h-[180px]">
        <Link
          href="https://github.com/whddltjdwhd"
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full group"
        >
          <div className="h-full p-6 rounded-3xl bg-github backdrop-blur-md border border-github-border hover:border-github-border/80 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between">
            <Github className="w-8 h-8 text-github-text transition-colors" />
            <div>
              <h3 className="font-bold text-lg text-github-text">Github</h3>
              <p className="text-xs text-github-subtext">Source Code</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Velog Link - Custom Theme Colors */}
      <motion.div variants={item} className="col-span-1 h-[180px]">
        <Link
          href="https://velog.io/@whddltjdwhd/posts"
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full group"
        >
          <div className="h-full p-6 rounded-3xl bg-velog backdrop-blur-md border border-velog-border hover:border-velog-border/80 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between">
            <ExternalLink className="w-8 h-8 text-velog-text transition-colors" />
            <div>
              <h3 className="font-bold text-lg text-velog-text">Velog</h3>
              <p className="text-xs text-velog-subtext">Previous Blog</p>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
