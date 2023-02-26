const LoadData = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, dataLimit);
};

const displayData = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.textContent = "";
  //   display 9 phones only and show all others
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //   display no phone found
  const noPhoneFound = document.getElementById("not-found");
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <button onclick = "phoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
      data-bs-target="#phoneDetailModal">Show Detailss</button>
      <!-- Button trigger modal -->
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  //   stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  LoadData(searchText, dataLimit);
};

document.getElementById("search").addEventListener("click", function () {
  // start loading
  processSearch(9);
});
// search input field enter key handler
document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(9);
    }
  });

// display loading indicator
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("showall-btn").addEventListener("click", function () {
  processSearch();
});

// phone details load
const phoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modlaTitle = document.getElementById("phoneDetailModalLabel");
  modlaTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
  <p> Release Date: ${
    phone.releaseDate ? phone.releaseDate : "no release date found"
  } </p>
  <p> Others: ${
    phone.releaseDate ? phone.releaseDate : "no release date found"
  } </p>
  <p> Storage: ${
    phone.mainFeatures ? phone.mainFeatures.storage : "no storage info found"
  }</p>

  <p> others: ${
    phone.others ? phone.others.Bluetooth : "no Bluetooth found"
  }</p>
  `;
};

LoadData("apple");
