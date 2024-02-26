"use client"
import ErrorLayout from "@/components/layouts/error/ErrorLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorLayout error={error} reset={reset} />
}