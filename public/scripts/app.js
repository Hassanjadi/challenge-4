class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.driverCheckbox = document.getElementById("driver-checkbox");
    this.passengerInput = document.getElementById("passenger-input");
    this.rentDateInput = document.getElementById("rent-date-input");
    this.rentTimeInput = document.getElementById("rent-time-input");
    this.filterButton = document.getElementById("filter-btn");
  }

  async init() {
    // Set tombol filter menjadi disabled saat inisialisasi
    this.filterButton.disabled = true;

    // Event listener untuk mendeteksi perubahan pada field input
    this.passengerInput.addEventListener("input", this.handleInputChange);
    this.rentDateInput.addEventListener("input", this.handleInputChange);
    this.rentTimeInput.addEventListener("input", this.handleInputChange);
    this.driverCheckbox.addEventListener("change", this.handleInputChange);

    this.filterButton.onclick = this.filterCars;
    await this.load();

    this.resetFilters();
  }

  // Reset nilai input
  resetFilters() {
    this.passengerInput.value = "";
    this.rentDateInput.value = "";
    this.rentTimeInput.value = "";
    this.driverCheckbox.value = "";

    this.handleInputChange();
  }

  handleInputChange = () => {
    // Memeriksa field input terisi atau tidak
    const isInputValid =
      this.passengerInput.value.trim() !== "" &&
      this.rentDateInput.value.trim() !== "" &&
      this.rentTimeInput.value.trim() !== "";

    // disable button ketika belum terisi
    this.filterButton.disabled = !isInputValid;
  };

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
    this.run();
  }
  filterCars = () => {
    // Mendapatkan value dari input user
    const passengerCount = parseInt(this.passengerInput.value, 10);
    const rentDate = new Date(this.rentDateInput.value);
    const rentTime = this.rentTimeInput.value;
    const withDriver = this.driverCheckbox.checked;

    // Filter mobil berdasarkan kapasitas penumpang, tanggal sewa, jam sewa, dan pilih driver
    const filteredCars = Car.list.filter((car) => {
      const carRentDate = new Date(car.availableAt);

      return (
        car.capacity > passengerCount &&
        car.availableAt > rentDate &&
        carRentDate > rentDate &&
        (withDriver ? car.options.withDriver : true) &&
        carRentDate.getHours() === parseInt(rentTime.split(":")[0], 10)
      );
    });

    this.clear();

    // Menampilkan mobil yang telah difilter
    if (filteredCars.length > 0) {
      filteredCars.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    } else {
      const noCarsMessage = document.createElement("div");
      noCarsMessage.id = "no-cars-message";
      noCarsMessage.textContent = "Mobil yang Anda cari tidak tersedia! ⛔";
      this.carContainerElement.appendChild(noCarsMessage);
    }
  };

  clear() {
    while (this.carContainerElement.firstChild) {
      this.carContainerElement.firstChild.remove();
    }
  }
}
