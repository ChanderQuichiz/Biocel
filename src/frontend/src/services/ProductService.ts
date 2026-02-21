import type { Product } from "@/types";

export async function getPageNumber() {
    const response = await fetch('http://localhost:8020/product/pagenumber');
    const data = await response.json();
    return data;
}
export async function getProductsByPage(page: number) {
    const response = await fetch(`http://localhost:8020/product/page/${page}`);
    const data = await response.json();
    return data;
}
export async function deleteProductById(id: number) {
    await fetch(`http://localhost:8020/product/delete/${id}`, {
        method: 'DELETE',
    });
}
export async function saveProduct(formProduct:Product){
    const response = await fetch("http://localhost:8020/product/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formProduct)
    });
    if(response.ok) {
      alert("Product saved successfully");
    } else {
      alert("Error saving product");
    }
}
export async function getAllProductById(ids: number[]) {
    const response = await fetch(`http://localhost:8020/product/findallbyid`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ids)
    });
    const data = await response.json();
    return data;
}
export async function searchProductsByText(text: string) {
  const response = await fetch(`http://localhost:8020/product/searchproductsbytext/${text}`);
  const data = await response.json();
  return data;
}