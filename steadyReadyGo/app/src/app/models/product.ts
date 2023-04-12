export class Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.category = obj.category;
    this.stock = obj.stock;
    this.price = obj.price;
  }
}
