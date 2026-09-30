"use client";

import {
  ApartmentDetail,
  HotelHeader,
  SuggestionsList,
} from "@/components/hotel";
import { getHotelById, getSuggestedHotels } from "@/lib/mockData/hotels";
import { PageContainer } from "@/components/layouts/PageContainer";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const apartment = getHotelById(resolvedParams.id);
  const suggestions = getSuggestedHotels(apartment.id);

  return (
    <div className="min-h-screen bg-white">
      <HotelHeader />

      <PageContainer className="flex flex-col px-0 sm:px-0 lg:flex-row">
        <SuggestionsList
          apartments={suggestions}
          onSelect={(id) => router.push(`/rent/${id}`)}
        />
        <ApartmentDetail
          apartment={apartment}
          onBook={() => router.push(`/rent/${apartment.id}/escrow/create`)}
        />
      </PageContainer>
    </div>
  );
}
