import { notFound } from "next/navigation";
import { machinesDB } from "@/data/machines";
import MachineCategoryShowcase from "../../../components/sections/machine-category-showcase";

export function generateStaticParams() {
  return [
    { category: "double-column" },
    { category: "vertical-column" },
    { category: "circular-saw" },
  ];
}

export default async function MachineCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category as keyof typeof machinesDB;
  const categoryData = machinesDB[categoryKey];

  if (!categoryData) {
    notFound();
  }

  return <MachineCategoryShowcase categoryData={categoryData} />;
}