"use client";

import { EscrowStatusBadge } from "@/components/dashboard/EscrowStatusBadge";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Column, ResponsiveTable } from "@/components/ui/responsive-table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STUB_ESCROWS = [
  {
    id: "abc-123",
    property: "La sabana apartment",
    amount: 4000,
    status: "PENDING" as const,
    createdAt: "2025-01-20",
  },
  {
    id: "def-456",
    property: "Casa verde downtown",
    amount: 2500,
    status: "ACTIVE" as const,
    createdAt: "2025-01-15",
  },
  {
    id: "ghi-789",
    property: "Playa escazú suite",
    amount: 6000,
    status: "COMPLETED" as const,
    createdAt: "2025-01-10",
  },
];

const FILTER_TABS = [
  "All",
  "Pending",
  "Active",
  "Completed",
  "Disputed",
] as const;

export default function EscrowPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTER_TABS)[number]>("All");

  const handleViewEscrow = (id: string) => {
    router.push(`/dashboard/escrow/${id}`);
  };

  const handleNewEscrow = () => {
    // TODO: Navigate to new escrow creation page
    console.log("Navigate to new escrow creation");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredEscrows = STUB_ESCROWS.filter((escrow) => {
    if (activeFilter === "All") return true;
    return escrow.status.toUpperCase() === activeFilter.toUpperCase();
  });

  type Escrow = (typeof STUB_ESCROWS)[number];
  const columns: Column<Escrow>[] = [
    {
      key: "id",
      header: "ID",
      cell: (escrow) => (
        <span
          className="block max-w-32 truncate font-mono text-sm"
          title={escrow.id}
        >
          {escrow.id}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "property",
      header: "Property",
      primary: true,
      cell: (escrow) => (
        <span className="block truncate font-medium" title={escrow.property}>
          {escrow.property}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (escrow) => formatCurrency(escrow.amount),
    },
    {
      key: "status",
      header: "Status",
      cell: (escrow) => <EscrowStatusBadge status={escrow.status} />,
    },
    { key: "created", header: "Created", cell: (escrow) => escrow.createdAt },
  ];

  return (
    <div className="space-y-6 w-full">
      <PageHeader
        title="My Escrows"
        actions={
          <Button
            onClick={handleNewEscrow}
            className="flex items-center gap-2 sm:w-auto w-fit"
          >
            <PlusIcon className="h-4 w-4" />
            New Escrow
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 overflow-hidden">
        <nav className="-mb-px space-x-3  lg:space-x-8 w-full flex gap-2 overflow-hidden whitespace-nowrap items-start">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`
                py-2 px-1 border-b-2 lg:text-sm text-xs font-medium transition-colors whitespace-nowrap
                ${
                  activeFilter === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="w-full overflow-hidden rounded-lg bg-white shadow">
        <ResponsiveTable
          columns={columns}
          rows={filteredEscrows}
          getRowKey={(escrow) => escrow.id}
          emptyMessage="No escrows found"
          rowActions={(escrow) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewEscrow(escrow.id)}
            >
              View
            </Button>
          )}
        />

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredEscrows.length}</span> of{" "}
            <span className="font-medium">{filteredEscrows.length}</span>{" "}
            results
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" disabled>
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-50 text-blue-600 border-blue-200"
            >
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              2
            </Button>
            <Button variant="outline" size="sm" disabled>
              3
            </Button>
            <Button variant="outline" size="sm" disabled>
              →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
