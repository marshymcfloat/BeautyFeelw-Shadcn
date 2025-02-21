import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransactions() {
  return (
    <div className="border-4 border-black rounded-md px-2 py-4 max-w-[400px] w-full  my-4 ">
      <Table>
        <TableCaption>Recent transactions for today.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]  ">Date</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="w-[20%]  text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="  w-full">
            <TableCell className="w-[20%]  font-medium">INV001</TableCell>
            <TableCell className="truncate text-center max-w-[100px] overflow-hidden whitespace-nowrap">
              Daniel Canoy
            </TableCell>

            <TableCell className="text-right">on going</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
