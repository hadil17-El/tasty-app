 "use client";
  import { useRouter } from "next/navigation"; 
  import "./welcome.css";
   import Image from "next/image";
    import { motion } from "framer-motion" 
    export default function WelcomePage() {
         const router = useRouter(); 
         return(
             <div className="welcome-container"> 
              <motion.h1 className="welcome-title text-4xl font-bold mb-8"
               initial={{ opacity: 0, y: -50}} 
               animate={{opacity: 1, y: 0}} 
               transition={{duration: 0.8, ease: "easeOut"}}
                > Welcome to <span className="text-[#f7c97f]"> tasty!</span>
                 </motion.h1> 
                 <motion.div initial={{scale: 0.5, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                   transition={{ duration: 1, ease:"easeOut"}}
                    > 
                    <Image src="/imgs/T.png" 
                    className="t-welcome" alt="t" width={350} height={350}
                    /> 
                    </motion.div> 
                    <motion.button onClick={()=> router.push("/login")}
                     className="create-btn" 
                     whileHover={{scale: 1.05}} 
                     whileTap={{ scale: 0.95}} 
                     initial={{opacity: 0, y: 50}} 
                     animate={{ opacity: 1, y:0}} 
                     transition={{ delay: 1.1, duration: 0.6}} 
                     > Create account </motion.button> 
                     <motion.button onClick={()=> router.push("/sign")} 
                     className="sign-btn" 
                     whileHover={{scale: 1.05}} 
                     whileTap={{ scale: 0.95}} 
                     initial={{opacity: 0, y: 50}} 
                     animate={{ opacity: 1, y:0}} 
                     transition={{ delay: 1.3, duration: 0.6}} 
                     > Sign in </motion.button> 
                     </div> ) }