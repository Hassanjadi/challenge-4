class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
       <div class="card col">
      <div class="card-images d-flex justify-content-center align-items-center w-100">
        <img src="${this.image}" alt="${this.manufacture}" class="images-car"/>
      </div>
      <div class="card-descriptions">
        <p class="name">${this.manufacture} ${this.model} / ${this.type}</p>
        <p class="price">Rp. ${this.rentPerDay} / Hari</p>
        <p class="desc h-50">${this.description}</p>
      </div>
      <div class="card-info d-flex flex-column gap-2">
        <div class="d-flex gap-3 justify-content-start">
          <span><i class="icon" data-feather="users"></i></span>
          <p>${this.capacity} Orang</p>
        </div>
        <div class="d-flex gap-3 justify-content-start">
          <span><i class="icon" data-feather="settings"></i></span>
          <p>${this.transmission}</p>
        </div>
        <div class="d-flex gap-3 justify-content-start">
          <span><i class="icon" data-feather="calendar"></i></span>
          <p>Tahun ${this.year}</p>
        </div>
      </div>
        <button>Pilih Mobil</button>
      </div>
    </div>
    `;
  }
}
