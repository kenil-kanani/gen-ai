"use client";

import { useState, useCallback } from "react";
import PromptCard from "./PromptCard";
import ResponsePanel from "./ResponsePanel";

export default function AgentRunner({ className = "" }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const runQuery = useCallback(async (query) => {
    if (!query?.trim() || loading) return;
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/browser-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setResponse(typeof data?.message === "string" ? data.message : JSON.stringify(data));
    } catch (e) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const hasPanel = loading || !!error || !!response;

  return (
    <div className={["mx-auto w-full max-w-3xl p-3", className].join(" ")}> 
      <PromptCard onRun={runQuery} disabled={loading} />

      {hasPanel && (
        <>
          <div className="mt-4" />
          <ResponsePanel
            text={error ? error : response || (loading ? "Running the agent..." : "")}
            loading={loading}
            error={!!error}
          />
        </>
      )}
    </div>
  );
}