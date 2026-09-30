"use client";

import { ApartmentActionsMenu } from "@/components/dashboard/apartments/ApartmentActionsMenu";
import { ApartmentStatusBadge } from "@/components/dashboard/apartments/ApartmentStatusBadge";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column, ResponsiveTable } from "@/components/ui/responsive-table";
import { useApartments } from "@/hooks/useApartments";
import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

export function MyApartmentsTable() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const offset = page * ITEMS_PER_PAGE;
  const { data } = useApartments({ limit: ITEMS_PER_PAGE, offset, search });
  const apartments = data.apartments;
  const total = data.apartments_aggregate.aggregate.count;
  type Apartment = (typeof apartments)[number];

  const columns: Column<Apartment>[] = [
    {
      key: "name",
      header: "Apartment",
      primary: true,
      cell: (apartment) => (
        <span className="block truncate font-semibold" title={apartment.name}>
          {apartment.name}
        </span>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (apartment) => (
        <span className="block truncate" title={apartment.location}>
          {apartment.location}
        </span>
      ),
    },
    { key: "offers", header: "Offers", cell: (apartment) => apartment.offers },
    {
      key: "status",
      header: "Status",
      cell: (apartment) => <ApartmentStatusBadge status={apartment.status} />,
    },
    {
      key: "promoted",
      header: "Promoted",
      hideOnMobile: true,
      cell: (apartment) =>
        apartment.promoted ? (
          <span aria-label="Promoted listing">🔥</span>
        ) : (
          "—"
        ),
    },
    {
      key: "price",
      header: "Price",
      cell: (apartment) => `$${apartment.price.toLocaleString()}`,
    },
  ];

  const handleDeleteConfirmed = (id: number) =>
    console.log("(stub) Apartment deleted:", id);

  return (
    <div className="space-y-4">
      <PageHeader
        title="My apartments"
        actions={
          <Button
            asChild
            className="w-fit bg-orange-500 text-white hover:bg-orange-600"
          >
            <Link href="/dashboard/apartments/new">
              <Home className="mr-2 h-4 w-4" />
              New apartment
            </Link>
          </Button>
        }
      />
      <Input
        placeholder="Search anything..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
        className="max-w-xs"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {apartments.length} of {total}
        </span>
        <span>Items per page: {ITEMS_PER_PAGE}</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <ResponsiveTable
          columns={columns}
          rows={apartments}
          getRowKey={(apartment) => String(apartment.id)}
          emptyMessage="No apartments found."
          rowActions={(apartment) => (
            <ApartmentActionsMenu
              apartmentId={Number(apartment.id)}
              onDeleteConfirmed={handleDeleteConfirmed}
            />
          )}
        />
      </div>
      {total > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => setPage((current) => current - 1)}
            className="px-2 text-sm disabled:opacity-40"
          >
            ←
          </button>
          <span className="text-sm text-muted-foreground">Page {page + 1}</span>
          <button
            type="button"
            aria-label="Next page"
            disabled={(page + 1) * ITEMS_PER_PAGE >= total}
            onClick={() => setPage((current) => current + 1)}
            className="px-2 text-sm disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
