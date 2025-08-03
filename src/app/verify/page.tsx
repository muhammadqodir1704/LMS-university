"use client";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://api-lms-university.tenzorsoft.uz/api/register/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ confirmationCode: code }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Verification failed");

      router.push("/Login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Verify your Email</h2>
        <p className="text-sm text-gray-600 mb-4">
          Code sent to: <strong>{email}</strong>
        </p>

        {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border px-3 py-2 mb-4 rounded-md"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition font-semibold flex justify-center items-center ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
         {loading ? (
            <>
              <Spinner />
              <span className="ml-2">Verifying...</span>
            </>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}
