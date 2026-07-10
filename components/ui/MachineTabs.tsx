"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MachineTabsProps {
  features: string[];
  standardAccessories: string[];
  optionalAccessories: string[];
}

type TabType = "features" | "standard" | "optional";

export default function MachineTabs({
  features,
  standardAccessories,
  optionalAccessories,
}: MachineTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("features");

  const tabs = [
    { id: "features", label: "Features", data: features },
    { id: "standard", label: "Standard Accessories", data: standardAccessories },
    { id: "optional", label: "Optional Accessories", data: optionalAccessories },
  ] as const;

  const activeData = tabs.find((t) => t.id === activeTab)?.data || [];

  return (
    <div className="w-full mt-10">
      {/* ── TAB BUTTONS ── */}
      <div className="flex w-full md:w-auto border border-brand-orange rounded-sm overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-bold tracking-wide transition-colors duration-200 border-r border-brand-orange last:border-r-0 ${
              activeTab === tab.id
                ? "bg-brand-orange text-brand-dark"
                : "bg-white text-brand-orange hover:bg-brand-orange/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="mt-6 bg-white border border-gray-200 rounded-sm p-6 shadow-sm min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeData.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {activeData.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-brand-orange" />
                    <span className="text-brand-dark/80 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm italic">
                No specifications listed for this category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}