export default class Table {
  constructor() {
    this.table = document.querySelector('table.movies');
  }

  JSONtoTable(json) {
    const input = JSON.parse(json);
    this.arrayToTable(input);
  }

  sort(by, order = 1) {
    const rows = Array.from(this.table.querySelectorAll(`tr[data-${by}]`));
    if (Number.isNaN(+rows[0].dataset[by])) {
      rows.sort((a, b) => {
        if (a.dataset[by] > b.dataset[by]) {
          return 1 * order;
        }
        if (a.dataset[by] < b.dataset[by]) {
          return -1 * order;
        }
        return 0;
      });
    } else {
      rows.sort((a, b) => (a.dataset[by] - b.dataset[by]) * order);
    }
    this.arrayToTable(rows.map((item) => item.dataset));

    const arrow = this.table.querySelector(`.${by}`);
    if (order === 1) {
      arrow.classList.add('order_asc');
    } else {
      arrow.classList.add('order_desc');
    }
  }

  arrayToTable(array) {
    this.table.innerHTML = '';

    const firstRow = document.createElement('tr');
    ['id', 'title', 'year', 'imdb'].forEach((element) => {
      const td = document.createElement('td');
      td.classList.add(element);
      td.innerText = element;
      firstRow.append(td);
    });
    this.table.append(firstRow);

    array.forEach((element) => {
      const id = document.createElement('td');
      id.innerText = element.id;
      const title = document.createElement('td');
      title.innerText = element.title;
      const year = document.createElement('td');
      year.innerText = `(${element.year})`;
      const imdb = document.createElement('td');
      imdb.innerText = `imdb: ${Number(element.imdb).toFixed(2)}`;
      const tr = document.createElement('tr');
      tr.append(id, title, year, imdb);
      tr.dataset.id = element.id;
      tr.dataset.title = element.title;
      tr.dataset.year = element.year;
      tr.dataset.imdb = element.imdb;
      this.table.append(tr);
    });
  }
}
