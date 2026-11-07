"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"
import { SubmitButton, Field, TextInput, Select } from "@/components/admin/form"
import { uploadMedia } from "@/app/admin/actions/media"

export function Uploader({ categories }: { categories: { value: string; label: string }[] }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <form
      action={async (formData: FormData) => {
        setError(null)
        try {
          await uploadMedia(formData)
          setPreview(null)
          setDimensions(null)
        } catch (e) {
          setError(e instanceof Error ? e.message : "Upload failed")
        }
      }}
      className="grid gap-3 sm:grid-cols-2"
    >
      <input type="hidden" name="width" value={dimensions?.width ?? ""} />
      <input type="hidden" name="height" value={dimensions?.height ?? ""} />

      <label className="sm:col-span-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#CBD2D7] bg-[#FAF9F7] px-4 py-6 text-center hover:border-[#701F3D]/40">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Selected upload preview" className="max-h-40 rounded-md object-contain" />
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-[#89929B]" />
            <span className="mt-2 text-[12.5px] font-medium text-[#252B31]">Choose an image or PDF</span>
            <span className="mt-0.5 text-[11px] text-[#89929B]">JPEG, PNG, WebP, AVIF, SVG or PDF · up to 10 MB</span>
          </>
        )}
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return setPreview(null)
            if (file.type.startsWith("image/")) {
              const url = URL.createObjectURL(file)
              setPreview(url)
              const img = new Image()
              img.onload = () => setDimensions({ width: img.naturalWidth, height: img.naturalHeight })
              img.src = url
            } else {
              setPreview(null)
              setDimensions(null)
            }
          }}
        />
      </label>

      <Field label="Category">
        <Select name="category" options={categories} />
      </Field>
      <Field label="Alt text" hint="Required — announced to screen readers and shown if the image fails">
        <TextInput name="alt_text" required />
      </Field>
      <Field label="Caption" className="sm:col-span-2">
        <TextInput name="caption" />
      </Field>

      {error && <p className="sm:col-span-2 rounded-lg border border-[#8F2D2D]/25 bg-[#FBEAEA] px-3 py-2 text-[12px] text-[#8F2D2D]">{error}</p>}

      <div className="sm:col-span-2 flex justify-end"><SubmitButton>Upload asset</SubmitButton></div>
    </form>
  )
}
