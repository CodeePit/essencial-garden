import { MISSION_VISION_VALUES } from "@/mock/mission-vision-values";
import { cn } from "@/utils/cn";

export const MissionVisionValues = () => (
	<ul className="grid lg:grid-cols-3 sm:grid-cols-2 w-full gap-12">
		{MISSION_VISION_VALUES.map((item, index) => (
			<li
				key={index.toString()}
				className={cn(
					"bg-secondary text-background flex flex-col items-center gap-7 px-4 sm:px-8 py-11 rounded-xl",
					index === 2 && "max-lg:col-span-full",
				)}
			>
				{item.icon}
				<h2 className="uppercase text-2xl font-bold">{item.title}</h2>
				{item.description}
			</li>
		))}
	</ul>
);
