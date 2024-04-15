import { Button } from "@/components/admin/ui/button";
import type { FileItem } from "@/services/upload-file";
import { PenLine, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const BannerCard = ({ file, onDelete }: { file: FileItem | string, onDelete: () => void }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      role="button"
      className="group h-[220px] relative rounded overflow-hidden"
      onClick={() => {
        setOpen(true)
      }}
      onKeyUp={() => {}}
    >
      {!open && <Image
        alt="Imagem do produto"
        className="w-full relative rounded-md object-cover"
        height="84"
        src={typeof file === "string" ? file : file.src || "/placeholder.svg"}
        width="84"
      />}

      {open && <div></div>}

      {!open && <div className="group-hover:bg-black/40 items-center justify-center space-x-4 flex top-0 left-0 transition absolute w-full h-full">
        <Button
          variant="ghost"
          className="hover:bg-white/20 opacity-0 group-hover:opacity-100 hover:text-destructive text-background"
          onClick={onDelete}
        >
          <span className="sr-only">Deletar Imagem do Produto</span>
          <X />
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-white/20 opacity-0 group-hover:opacity-100 text-background hover:text-background"
        >
          <span className="sr-only">Editar Banner</span>
          <PenLine />
        </Button>
      </div>}
    </div>
  );
};
