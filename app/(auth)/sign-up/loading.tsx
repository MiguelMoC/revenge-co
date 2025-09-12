import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";

export default function SkeletonDemo() {
  return (<>
        <Image src="/images/loader.gif" height={150} width={150} className="w-16" alt="Loading..." />
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-row items-center gap-4">             
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </>
  )
}
