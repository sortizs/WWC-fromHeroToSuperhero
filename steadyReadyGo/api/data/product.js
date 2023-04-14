export function Product(id, name, description, category, stock, price) {
    this.id = parseInt(id);
    this.name = name;
    this.description = description;
    this.category = category;
    this.stock = parseInt(stock);
    this.price = parseFloat(price);
}