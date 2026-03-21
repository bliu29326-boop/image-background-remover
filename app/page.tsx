"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setResultUrl(null);
    setError(null);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveBg = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const formData = new FormData();
      formData.append("image_file", file);

      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Remove background failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Image Background Remover</h1>
        <p className="mt-2 text-slate-600">
          Upload an image and remove its background in seconds.
        </p>
      </header>

      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white"
        />
        {previewUrl && (
          <div className="mt-6">
            <p className="text-sm text-slate-600">Preview</p>
            <img
              src={previewUrl}
              alt="preview"
              className="mt-2 max-h-64 rounded-md border"
            />
          </div>
        )}

        <button
          onClick={handleRemoveBg}
          disabled={!file || loading}
          className="mt-6 rounded-md bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </section>

      {resultUrl && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Result</h2>
          <img
            src={resultUrl}
            alt="result"
            className="mt-3 max-h-64 rounded-md border"
          />
          <a
            href={resultUrl}
            download="no-bg.png"
            className="mt-4 inline-block rounded-md bg-emerald-600 px-5 py-2 text-white"
          >
            Download PNG
          </a>
        </section>
      )}
    </main>
  );
}
