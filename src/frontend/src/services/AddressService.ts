import type { Address } from "@/types";

export async function saveAddress(address:Address ) {
    const response = await fetch('http://localhost:8020/address/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    });
   if(response.ok) alert('Address saved successfully')
   else alert('Error saving address')
}
export async function getAddressesByUserId(userId:number) {
    const response = await fetch(`http://localhost:8020/address/findallbyuser/${userId}`);
    return response.json();
}
export async function deleteAddress(addressId:number) {
    const response = await fetch(`http://localhost:8020/address/delete/${addressId}`, {
        method: 'DELETE',
    });
    if(response.ok) alert('Address deleted successfully')
}