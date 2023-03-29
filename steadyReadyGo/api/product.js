export function Product(id, name, description, price, stock, category) {
    this.id = parseInt(id);
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.stock = parseInt(stock);
    this.category = category;
}