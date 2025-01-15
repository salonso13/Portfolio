"use client"
import { transitionVariantsPage } from "@/utilis/motion-transitions"
import{AnimatePresence, motion} from "framer-motion";
const TransitionPage = () => {
    return(
        <AnimatePresence mode="wait">
            <div>
                <motion.div
                    className="fixed top-0 bottom-o right-full w-screen z-30 bg-[#2e2257]"
                    variants={transitionVariantsPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{delay:0.2, duratio: 0.6, ease:"easeInOut"}}
                >

                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default TransitionPage;