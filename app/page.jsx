"use client"
import { motion } from "framer-motion";
import Topiclist from "@/components/Topiclist";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
    >
      <Topiclist />
    </motion.div>
  );
}
