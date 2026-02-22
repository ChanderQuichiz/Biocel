import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import type { User } from "@/types/user"
import { useEffect, useState } from "react"

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState<string>('');

    async function loadUsers(filters: string = '') {
        const query = filters ? `${filters}` : '';
        const response = await fetch(`http://localhost:8020/user/search${query}`);
        const data = await response.json();
        setUsers(data.content || data || []);
    }

    useEffect(() => {
        if(search === '') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            loadUsers();
        } else {
            loadUsers(search);
        }
    }, [search])

    return (
        <>
            <div className="text-2xl font-bold font-serif text-neutral-600">Users</div>
            <div className="max-w-md">
                <Input 
                    placeholder="Filter by email..." 
                    onChange={(event) => {
                        if(event.target.value.trim() !== '') {
                            setSearch(`?email=` + event.target.value);
                            return;
                        }
                        setSearch('');
                    }}
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.userId}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.phone || 'None'}</TableCell>
                            <TableCell>{user.role || 'None'}</TableCell>
                            <TableCell>{user.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
