export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  clear() {
    this._containerSelector.innerHTML = "";
  }

  addItem(element) {
      this._containerSelector.prepend(element);
  }
}
