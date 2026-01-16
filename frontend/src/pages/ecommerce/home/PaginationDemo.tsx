import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getPageNumber } from "@/services/ProductService"
import * as React from "react"


export function PaginationDemo() {
  const [pageNumber, setPageNumber] = React.useState(1)
  const [pageActive , setPageActive] = React.useState<number>(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchPageNumber() {
      const pageNumber = await getPageNumber();
      setPageNumber(pageNumber);
    }

  React.useEffect(()=>{
    fetchPageNumber();
  },[])
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
         {pageActive > 1 && <PaginationPrevious href={`page/${pageActive-1}`} />}
        </PaginationItem>
            {Array.from(
          { length: pageNumber },(_, i) => i + 1
        ).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink href={`home/${pageNumber}`} isActive={pageActive === pageNumber} onClick={() => { setPageActive(pageNumber)}}>{pageNumber}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`home/${pageActive+1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
