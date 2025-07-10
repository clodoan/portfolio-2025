"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";

export type ExpandableImageProps = {
  children: React.ReactNode;
};

const ExpandableImage = ({ children }: ExpandableImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isModalOpen]);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          type="button"
          className="cursor-pointer transition-transform rounded border border-tertiary overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <AnimatePresence mode="wait">
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog.Content className="w-full h-full flex items-center justify-center">
                <Dialog.Close asChild>
                  <motion.button
                    type="button"
                    className="absolute top-4 right-4 z-10 bg-[var(--text-tertiary)] rounded-full p-1"
                    aria-label="Close modal"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <XMarkIcon className="w-6 h-6 text-quinary" />
                  </motion.button>
                </Dialog.Close>

                <Dialog.Title className="sr-only">Image Preview</Dialog.Title>

                <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto rounded">
                  {children}
                </div>
              </Dialog.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ExpandableImage;
