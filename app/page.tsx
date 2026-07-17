import HeroSection from "@/components/sections/heroSection";
import FallingStory from "./Fallingstory";
import StorySection from "./Storysection";

export default function Home() {
  // We provide 4 images to perfectly match the 4 text sections below.
  const storyImages = [
    { src: "/images/products/acs_machine.jpeg", alt: "ACS Fully Automatic Double Column Bandsaw" },
    { src: "/images/products/vertical_bandsaw.png", alt: "ACS Vertical Column Bandsaw" },
    { src: "/images/products/acs_machine.jpeg", alt: "ACS Heavy Duty Construction" }, // Re-using for the "Uptime" section
    { src: "/images/products/double_column_miter.png", alt: "ACS Double Column Miter Bandsaw" },
  ];

  return (
    <main className="min-h-screen bg-brand-light">
      <HeroSection />
      
      <FallingStory images={storyImages}>
        <StorySection
          eyebrow="Precision Engineering"
          title="Engineered to cut cleaner, faster, and more accurately."
          description="Our double-column bandsaws are built on a foundation of structural rigidity. The LMG-guided frame eliminates vibration, ensuring every cut is straight and true, even at full speed."
          cta={{ label: "Explore Double Column Saws", href: "/machines/double-column" }}
        />
        <StorySection
          eyebrow="Intelligent Automation"
          title="Smart controls that adapt to your material."
          description="Equipped with PLC logic, HMI touchscreens, and adaptive feed controls, our machines sense material hardness and adjust cutting parameters in real-time. Less guesswork, more consistency."
          cta={{ label: "View Automatic Models", href: "/machines/vertical-column" }}
          align="right"
        />
        <StorySection
          eyebrow="Maximum Uptime"
          title="Designed for continuous operation in heavy-duty environments."
          description="From hydraulic blade tensioning to automatic chip removal, every component is selected for durability and ease of maintenance. When your saw runs longer, your costs go down."
        />
        <StorySection
          eyebrow="Complete Solution"
          title="From standard cuts to complex miters."
          description="Whether you need high-speed straight cuts or precise degree-accurate miters, we have a solution that fits your workflow. And with our dedicated support, you’re never alone on the shop floor."
          cta={{ label: "Talk to an Expert", href: "/contact" }}
          align="right"
        />
      </FallingStory>
      
    </main>
  );
}