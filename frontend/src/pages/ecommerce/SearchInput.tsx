import {  Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,

} from "@/components/ui/input-group"
import { useNavigate } from "react-router-dom"
export function SearchInput() {
  const navigate = useNavigate();
  return (
    <div className="text-gray-300">
      <InputGroup>
        <InputGroupInput onKeyDown={async(event)=>{
          if(event.key === 'Enter'){
       navigate(`/search/${event.currentTarget.value}`);   
          }
        }} placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>

  )
}