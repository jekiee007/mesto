export class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this.clear();
    items.forEach((item) => this._renderer(item));
  }

  clear() {
    this._container.textContent = "";
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
