"use client";
import { Button } from "@/components/admin/ui/button";
import { Progress } from "@/components/admin/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getBanners } from "@/services/queries";
import { createClient } from "@/services/supabase";
import {
  type FileItem,
  handleUpload,
  handleUploadImages,
} from "@/services/upload-file";
import { cn } from "@/utils/cn";
import { PenLine, Pencil, Upload } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { handleBanners } from "./actions";
import { BannerCard } from "./banner-card";

export const BannerTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="absolute text-primary hover:text-primary rounded-full bottom-8 right-8 z-10 w-fit !p-4 h-auto"
      >
        <span className="sr-only">Editar Modal</span>
        <Pencil />
      </Button>
    </DialogTrigger>
  );
};

export const BannerEditContent = ({
  multiple,
  page: pageProp,
}: {
  page?: string;
  multiple: boolean;
}) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const [defaultBanners, setDefaultBanners] = useState<
    { title: string; page: string; id?: string; banner: string }[]
  >([]);
  const [banners, setBanners] = useState<
    { title: string; page: string; id?: string; banner: string }[]
  >([]);
  const supabase = createClient("no-cache");
  const router = useRouter();
  const [files, setFiles] = useState<(FileItem | string)[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedBanners, setDeletedBanners] = useState<string[]>([]);

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const page = pageProp
    ? pageProp
    : pathname === "/"
    ? "inicio"
    : pathname.replace("/", "");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!open) return;
    const ac = new AbortController();

    supabase
      .from("banners")
      .select("*")
      .eq("page", page)
      .abortSignal(ac.signal)
      .then(({ data }) => {
        const bannersInitial = data || [];
        setBanners(bannersInitial);
        setFiles(
          bannersInitial?.map(
            ({ banner, page }) =>
              supabase.storage
                .from("banners")
                .getPublicUrl(`${page}/${banner}.webp`).data.publicUrl
          ) || []
        );
        setDefaultBanners(bannersInitial);
      });

    return () => {
      ac.abort();
    };
  }, [open]);

  const uploadOptions: {
    files: typeof files;
    handleFiles: typeof setFiles;
    toast: typeof toast;
    onNewFilesUploaded?: (index: number | null, files: FileItem[]) => void;
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  } = useMemo(
    () => ({
      files,
      handleFiles: setFiles,
      toast,
      onNewFilesUploaded: (index, files) => {
        setBanners((prev) => {
          if (typeof index === "number") {
            const newPrev = [...prev];
            newPrev[index] = {
              id: prev[index]?.id,
              banner: files[0].id as string,
              page: prev[index]?.page || page,
              title: prev[index]?.title || "",
            };
            return newPrev;
          }

          return prev.concat(
            files.map((file) => ({
              banner: file.id as string,
              page,
              title: "",
            }))
          );
        });
      },
    }),
    [files]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setFiles([]);
          setBanners([]);
          setDeletedBanners([]);
          setDefaultBanners([]);
					setUploadPercentage(0);
					setLoading(false);
        }
      }}
    >
      <BannerTrigger />
      <DialogContent className="w-[80vw] max-w-full flex flex-col gap-0 p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-3xl font-bold">
            Alterar Banners
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Pagina atual:{" "}
            <span className="capitalize">
              {page === "inicio" ? "inicio ( / )" : `${page} ( /${page} )`}
            </span>
            <br />
            <br />
            Para editar o conteúdo do banner passe o mouse sobre e clique no
            ícone de edição ( <PenLine className="w-4 h-4 inline-flex" /> ).
          </DialogDescription>
        </DialogHeader>

        <form
          className="h-full flex flex-col"
					onSubmit={() => setLoading(true)}
          action={async () => {
            try {
              await handleBanners(
                pathname,
                deletedBanners,
                banners.filter((banner) => {
                  if (!banner.id) return true;
                  const defaultBanner = defaultBanners?.find(
                    ({ id }) => id === banner.id
                  );
                  return (
                    banner.banner !== defaultBanner?.banner ||
                    banner.title !== defaultBanner?.title
                  );
                })
              );

              const uploadSuccessStatus = await handleUploadImages(
                "banners",
                page,
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
                    ? "Ocorreu ao salvar algumas imagens."
                    : "Ocorreu um erro ao salvar a imagem.",
                });
              }
              toast({
                description:
                  'As ações podem demorar para aparecerem, aguarde um pouco e recarregue a página. Caso deseje vê-las imediatamente pressione "Shift + F5"',
              });
            } catch (e) {
              toast({
                variant: "destructive",
                title: "Ops!",
                description: (e as Error).message,
              });
            }

            setOpen(false);
            router.refresh();
            setLoading(false);
          }}
        >
          <div className="p-6 bg-muted max-h-[60dvh] overflow-y-auto">
            <Progress
              value={uploadPercentage * 100}
              className="h-1 mb-4 mx-auto max-w-sm bg-background block"
            />
            <div
              className="grid sm:grid-cols-2 md:grid-cols-3 h-full gap-2"
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
              {banners.map((banner, i) => (
                <BannerCard
                  key={banner.id || banner.banner}
                  file={files[i]}
                  title={banner.title}
                  onTitleEdit={(text) => {
                    setBanners((prev) => {
                      const newPrev = [...prev];
                      newPrev[i].title = text;
                      return newPrev;
                    });
                  }}
                  onDelete={() => {
                    setFiles((prev) => {
                      const newPrev = [...prev];
                      newPrev.splice(i, 1);
                      return newPrev;
                    });
                    setBanners((prev) => {
                      const newPrev = [...prev];
                      newPrev.splice(i, 1);
                      return newPrev;
                    });
                    if (banner.id) {
                      setDeletedBanners((prev) => [...prev, banner.id || ""]);
                    }
                  }}
                />
              ))}
              <label
                id="upload-input"
                htmlFor="upload"
                className={cn(
                  "cursor-pointer hover:bg-primary/10 border-primary transition flex h-[170px] w-full items-center justify-center rounded-md border border-dashed",
                  {
                    hidden: files.length >= 10,
                  }
                )}
              >
                <Upload className="h-4 w-4 text-primary" />
                <span className="sr-only">Upload</span>

                <input
                  type="file"
                  name="upload"
                  id="upload"
                  accept="image/*"
                  className="sr-only"
                  multiple={multiple}
                  onFocus={() =>
                    document.getElementById("upload-input")?.focus()
                  }
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
          </div>
          <DialogFooter className="border-t p-4 w-full">
            <Button
              variant="outline"
              type="button"
              disabled={loading}
              onClick={() => {
                setOpen(false);
              }}
            >
              Descartar Alterações
            </Button>
            <Button disabled={loading} type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
