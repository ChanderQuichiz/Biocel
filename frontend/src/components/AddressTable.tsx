import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddressDialog } from "./AddressDialog"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  }
]

export function AddressTable() {
  return (
    <Table className="m-auto w-[60%] cursor-pointer">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="cursor-auto">
        <TableRow>
          <TableHead className="text-[20px]">My Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium flex flex-row justify-between "><div><p>{invoice.invoice}</p><p>description ...</p> </div><AddressDialog icon={'https://cdn-icons-png.flaticon.com/128/10337/10337385.png'}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell  className="flex flex-row justify-between">Add new address 
            <AddressDialog icon={'https://cdn-icons-png.flaticon.com/128/11741/11741042.png'}/></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
