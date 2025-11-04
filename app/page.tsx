"use client";
import { useRouter } from "next/navigation";
import "./styles/launch.css"
import { motion } from "framer-motion";
import Image from "next/image";
export default function LaunchPage(){
  const router = useRouter();

  const handleContinue = () => {
    router.push("/welcome")
  }

  return(
    <div className="launch-container">
      <motion.div className="t-image-wrapper"
      initial={{opacity: 0, scale: 0.5, rotate: -10}}
      animate={{ opacity: 1, scale: 1, rotate: 0}}
      transition={{ duration: 1, ease: "easeOut"}}
      >
        <Image src="/imgs/T.png" className="t-image" alt="T" width={1050} height={1050} />
      </motion.div>
      <motion.h1 
      className="t-title"
      initial={{ opacity: 0, y: 30}}
      animate={{ opacity: 0.7, y: 0}}
      transition={{ delay: 0.7, duration: 0.6}}
      >tasty
      </motion.h1>
      <motion.button
          onClick={handleContinue}
          className="swipe-btn"
          whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95}}
          initial={{ opacity: 0, y: 50}}
          animate={{ opacity: 1, y:0}}
          transition={{ delay: 1.2, duration: 0.8}}>
            Swipe to continue →
          </motion.button>
    </div>
  )
}