"use client";
import { Button } from "@/components/admin/ui/button";
import { Progress } from "@/components/admin/ui/progress";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/services/supabase";
import { type FileItem, handleUpload, handleUploadProductImages } from "@/services/upload-file";
import { cn } from "@/utils/cn";
import { Eye, PenLine, Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BannerCard } from "./banner-card";

export const BannerEditContent = ({multiple, defaultImages}: {
  defaultImages?: string[];
  multiple: boolean;
}) => {
  const pathname = usePathname();
  const supabase = createClient();
  const { toast } = useToast();
  const [files, setFiles] = useState<(FileItem | string)[]>(
    defaultImages || []
  );

  const [uploadPercentage, setUploadPercentage] = useState(0);

  const uploadOptions = {
    files,
    handleFiles: setFiles,
    toast,
  };

  return (
    <DialogContent className="w-[80vw] max-w-full flex flex-col h-[80dvh] overflow-auto">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">Alterar Banners</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {pathname === '/' ? 'início' : pathname.replace('/', '')}
        </DialogDescription>
      </DialogHeader>

      <form
        action={async () => {
          try {
            const uploadSuccessStatus = await handleUploadProductImages(
              "",
              files,
              {
                handleUploadPercentage: setUploadPercentage,
                toast,
                access_token: (
                  await supabase.auth.getSession()
                ).data.session?.access_token,
              }
            );
            if (uploadSuccessStatus?.some((status) => !status)) {
              toast({
                variant: "destructive",
                title: "Ops!",
                description: multiple
                  ? "Ocorreu ao salvar algumas imagens do banner."
                  : "Ocorreu um erro ao salvar a imagem.",
              });
            }
          } catch (e) {
            toast({
              variant: "destructive",
              title: "Ops!",
              description: multiple
                ? "Ocorreu ao salvar algumas imagens do banner."
                : "Ocorreu um erro ao salvar a imagem.",
            });
          }
        }}
      >
        <Progress
          value={uploadPercentage * 100}
          className="h-1 mb-4 bg-muted"
        />

          <div
            className="grid grid-cols-3 h-full gap-2"
            onDragOver={(ev) => {
              ev.preventDefault();
            }}
            onDrop={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();

              const files = ev.dataTransfer.files
                ? Array.from(ev.dataTransfer.files)
                : [];
              handleUpload(files, true, uploadOptions);
            }}
          >
            {files.map((file, i) =>(
                <BannerCard
                  key={typeof file === "string" ? file : file.id}
                  file={file}
                  onDelete={() => {
                  setFiles((prev) => {
                    const newPrev = [...prev];
                      newPrev.splice(i, 1);
                      return newPrev;
                    });
                  }} 
                />
              )
            )}
            <label
              id="upload-input"
              htmlFor="upload"
              className={cn(
                "cursor-pointer hover:bg-accent transition flex h-[220px] w-full items-center justify-center rounded-md border border-dashed",
                {
                  hidden: files.length >= 10,
                }
              )}
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>

              <input
                type="file"
                name="upload"
                id="upload"
                accept="image/*"
                className="sr-only"
                multiple={multiple}
                onFocus={() => document.getElementById("upload-input")?.focus()}
                required={files.length === 0}
                onChange={(ev) => {
                  ev.target.files &&
                    handleUpload(
                      Array.from(ev.target.files),
                      multiple ? true : 0,
                      uploadOptions
                    );
                  ev.target.value = "";
                }}
              />
            </label>
          </div>
      </form>
    </DialogContent>
  );
};
