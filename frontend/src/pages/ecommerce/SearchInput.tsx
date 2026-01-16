import {  Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,

} from "@/components/ui/input-group"

export function SearchInput() {
  return (
    <div className="text-gray-300">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>

  )
}