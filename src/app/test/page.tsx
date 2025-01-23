"use client";

import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchData } from "@/lib/Redux/Slice/cardDataSlice";
import { RootState } from "@/lib/Redux/Store/store";
import { useEffect, useState } from "react";

export default function DisplayData() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.cardData
  );

  console.log("data", data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Assistants</h1>
      <h2>{data.length}</h2>
      <ul>
        {data.map((assistant: any) => (
          <li key={assistant?.uuid}>
            <p>Name: {assistant?.name}</p>
            <p>Description: {assistant?.description}</p>
            <p>Language: {assistant?.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
