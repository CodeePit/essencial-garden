import ProductsBackgroundImage from "@/assets/products-background.webp";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog } from "@/components/ui/dialog";
import { RGB_GREEN_DATA_URL, rgbDataURL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Banner, BannerEditContent, BannerTrigger } from "../components/banner";
import { MissionVisionValues } from "./components/mission-vision-values";
import { SalesTeam } from "./components/sales-team";
import { getProducts } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Essencial Garden | Início",
  description:
    "Empresa especializada no cuidado com as plantas, focada principalmente no segmento de Home & Garden e oferecemos soluções para finalidades específicas.",
  keywords:
    "Cuidado com as plantas, Casa e Jardim, Plantas de interior, Plantas de exterior, Soluções de jardinagem, Saúde das plantas, Jardinagem sustentável, Jardinagem ecológica, Acessórios para plantas, Decoração com plantas, Design de jardins, Jardinagem urbana",
};

export default async function Home() {
  const supabase = createClient(cookies());
  const products = await getProducts(supabase, {
    get: "name,images,id",
    skip: 0,
    take: 10,
  });

  return (
    <>
      <section>
        <Dialog>
          <BannerEditContent />
          <Carousel className="w-full">
            <BannerTrigger />
            <CarouselContent>
              <CarouselItem>
                <Banner src="/placeholder.svg" alt="placeholder" edit={false} />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious variant="ghost" />
            <CarouselNext variant="ghost" />
            <CarouselDots />
          </Carousel>
        </Dialog>
      </section>
      <section className="max-w-screen-xl mx-auto mt-10 p-2 text-center space-y-12">
        <MissionVisionValues />
        <Button asChild>
          <Link href="sobre">Saiba Mais »</Link>
        </Button>
      </section>

      <section className="relative mt-10">
        <Image
          src={ProductsBackgroundImage}
          sizes="100vw"
          alt=""
          placeholder="blur"
          blurDataURL={rgbDataURL(235, 238, 233)}
          className="object-cover w-full h-full absolute top-0 left-0 z-0 object-top"
        />

        <div className="relative py-10 text-center space-y-8">
          <h2 className="text-4xl font-bold text-secondary">Nossos Produtos</h2>
          <Carousel className="max-w-screen-xl mx-auto">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="w-fit items-center flex flex-col space-y-4 lg:basis-1/5 md:basis-1/3 sm:basis-1/2"
                >
                  <div className="h-64 w-48">
                    <Image
                      src={supabase.storage.from("products").getPublicUrl(`${product.id}/${product.images[0]}.webp`).data.publicUrl}
                      alt="placeholder"
                      placeholder="blur"
                      blurDataURL={RGB_GREEN_DATA_URL}
                      className="w-full h-full object-fill"
                      width={192}
                      height={256}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-secondary">
                    {product.name}
                  </h3>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="ghost"
              className="-left-12 [&>.icon]:text-secondary/80 hover:[&>.icon]:!text-secondary"
            />
            <CarouselNext
              variant="ghost"
              className="-right-12 [&>.icon]:text-secondary/80 hover:[&>.icon]:!text-secondary"
            />
          </Carousel>
          <Button variant="secondary" className="mt-2 lg:!mb-3 !mb-14" asChild>
            <Link href="/produtos">Conheça mais produtos »</Link>
          </Button>
        </div>
      </section>
      <SalesTeam />
    </>
  );
}
