"use client";

import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchData } from "@/lib/Redux/Slice/cardDataSlice";
import { RootState } from "@/lib/Redux/Store/store";
import { useEffect, useState } from "react";
import { vapiPostData } from "@/lib/Redux/Slice/vapiDataiSlice";

export default function DisplayData() {
  const dispatch = useAppDispatch();
  const { toolCalls, loading, error } = useAppSelector(
    (state: RootState) => state.vapiCustomerData
  );

  console.log("data==> ", toolCalls);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Assistants</h1>

      <div className="text-white">{toolCalls}</div>
    </div>
  );
}
