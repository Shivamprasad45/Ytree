"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ScrollSectionProps {
  title: string
  children: ReactNode
}

export function ScrollSection({ title, children }: ScrollSectionProps) {
  return (
    <section className="my-10 md:my-14">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="items-start flex flex-col text-start"
      >
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-green-800">{title}</h2>
      </motion.div>
      <div className="w-full items-center flex justify-center my-4">
        <ScrollArea className="w-full md:w-[70vw] whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-4">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}

