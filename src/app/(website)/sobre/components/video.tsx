"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import YouTube from "react-youtube";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Button as ButtonAdmin } from "@/components/admin/ui/button";
import { Pencil, YoutubeIcon } from "lucide-react";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { updateYoutubeVideo } from "../actions";

export const AboutVideo = ({ videoId }: { videoId: string }) => {
	return (
		<div className="relative w-full">
			<YouTube
				videoId={videoId}
				className="w-full h-auto aspect-video"
				iframeClassName="h-full w-full [&_.ytp-button]:hidden"
				opts={{
					playerVars: {
						iv_load_policy: 3,
						rel: 0,
						showinfo: 0,
					},
				}}
			/>
		</div>
	);
};

export const VideoForm = ({ video }: { video: { video: string } }) => {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (!loading) setOpen(o);
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="absolute text-primary hover:text-primary rounded-full bottom-8 right-8 z-10 w-fit !p-4 h-auto"
				>
					<span className="sr-only">Editar Modal</span>
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0">
				<DialogHeader className="p-6 border-b">
					<DialogTitle className="text-3xl font-bold">
						Alterar Video
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Para editar o video insira a url do YouTube ({" "}
						<YoutubeIcon className="w-4 h-4 inline-flex" /> ).
					</DialogDescription>
				</DialogHeader>
				<form
				onSubmit={() => setLoading(true)}
					action={async (formData) => {
						try {
							await updateYoutubeVideo(formData);
						} catch {
							toast({
								variant: "destructive",
								description: "Ocorreu um erro ao atualizar seu video.",
							});
						}
						setOpen(false);
						setLoading(false);
					}}
				>
					<div className="p-6 pt-0">
						<div className="grid gap-2">
							<Label htmlFor="youtube-url">Youtube URL*</Label>
							<Input
								id="youtube-url"
								name="youtube-url"
								required
								placeholder="https://youtube.com/watch?v=..."
								defaultValue={
									video?.video && `https://youtube.com/watch?v=${video?.video}`
								}
							/>
						</div>
					</div>

					<DialogFooter className="border-t p-4 w-full">
						<DialogClose asChild>
							<ButtonAdmin disabled={loading} variant="outline" type="button">
								Descartar Alterações
							</ButtonAdmin>
						</DialogClose>
						<ButtonAdmin
							disabled={loading}
							type="submit"
						>
							Atualizar
						</ButtonAdmin>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
