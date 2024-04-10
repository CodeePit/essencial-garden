"use client";
import { cn } from "@/utils/cn";
import PlaceholderVideo from "@/videos/placeholder.mp4";
import Video from "next-video";
import React from "react";

export const AboutVideo = () => {
	const [paused, setPaused] = React.useState(true);

	return (
		<div className="relative">
			<Video
				src={PlaceholderVideo}
				accentColor="hsl(var(--primary))"
				className="overflow-hidden rounded-xl relative"
				onPlay={() => setPaused(false)}
				onPause={() => setPaused(true)}
				paused={paused}
			/>
			<button
				type="button"
				className={cn(
					"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 active:scale-95 transition",
					!paused && "opacity-0",
				)}
				onClick={() => setPaused(!paused)}
			>
				<span className="sr-only">
					{paused ? "Iniciar Video" : "Pausar Vídeo"}
				</span>
				<svg
					width="57"
					height="57"
					viewBox="0 0 57 57"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Botão Play - Vetorizado</title>
					<path
						d="M28.4104 53.8206C42.444 53.8206 53.8207 42.4439 53.8207 28.4103C53.8207 14.3766 42.444 3 28.4104 3C14.3766 3 3 14.3766 3 28.4103C3 42.4439 14.3766 53.8206 28.4104 53.8206Z"
						stroke="white"
						stroke-width="4.74299"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.2031 28.9943V24.7508C20.2031 19.4654 23.9385 17.3055 28.5123 19.9482L32.1968 22.0826L35.8813 24.2171C40.4552 26.8598 40.4552 31.1796 35.8813 33.8222L32.1968 35.9567L28.5123 38.0912C23.9385 40.7338 20.2031 38.574 20.2031 33.2886V28.9943Z"
						stroke="white"
						stroke-width="4.74299"
						stroke-miterlimit="10"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};
