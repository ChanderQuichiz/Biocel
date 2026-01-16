import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export function CarouselDemo() {
  const banners: string[] = ['/public/banner1.png', '/public/banner2.png', '/public/banner3.png', '/public/banner4.png'];
 
  return (
    <Carousel className="max-w-[770px] w-full m-auto cursor-pointer">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner}>
            <div className="p-1">
              <img src={banner} alt={`Banner ${banner}`} className="w-full h-auto" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
