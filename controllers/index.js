// GOI API
// var content = [];
function getProduct() {
  // sử dụng axios
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET"
  });

  // Thành công
  promise.then(function (result) {
    console.log(result.data.content);
    //Gọi hàm renderTable sau khi lấy dữ liệu
    renderTableProduct(result.data.content, "tableProduct");
    renderTableCarousel(result.data.content, "tableCrousel")
  });
}
/**
 * @param {*} arrProduct
 * @param {*} idbody
 */
function renderTableCarousel(arrProductCarousel, idbodyCarousel){
  var htmlCarousel = "";
  for (var index = 0; index < arrProductCarousel.length; index++) {
    var product = arrProductCarousel[index];
    htmlCarousel +=
    `
    <div class="carousel-item active">
    <div class="carousel-slide">
      <div class="carousel-img"><img src="${product.image}" alt=""></div>
      <div class="carousel-name">
        <h2>${product.name}</h2>
        <div class="desc">${product.description}</div>
        <button class="btn-button"><a href="./detail.html?productid=${product.id}">Buy Now</a></button>
      </div>
    </div>
  </div>
    `
  }
  document.getElementById(idbodyCarousel).innerHTML = htmlCarousel;
}

function renderTableProduct(arrProduct, idbody) {
  var htmlProduct = "";
  for (var index = 0; index < arrProduct.length; index++) {
    var product = arrProduct[index];
    htmlProduct += `
        <div class="col-pr">
          <div class="card-item">
            <div class="card-img">
              <img src="${product.image}" alt="...">
            </div>
            <div class="card-body">
              <h5>${product.name}</h5>
              <p class="desc">${product.description}</p>
            </div>
            <div class="card-footer">
              <button><a href="./detail.html?productid=${product.id}" ">Buy Now</a></button>
              <p class="price">${product.price}$</p>
            </div>
          </div>
        </div>
        `;
  }
  document.getElementById(idbody).innerHTML = htmlProduct;
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('productid');

function getProductDetail() {
  let promise = axios({
    url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=' + myParam,
    method: 'GET',
  });

  promise.then(function (result) {
    console.log(result.data.content)
    renderTableDetail(result.data.content, 'detail-product');
  })
}
function renderTableDetail(arrProductDetail, idBodyDetail) {
  let htmlDetail =
    `
        <div class="detail-l">
            <img src="${arrProductDetail.image}" alt="">
        </div>
        <div class="detail-r">
        <div class="detail-r-title">
        <div class="name">
          <h3>${arrProductDetail.name}</h3>
        </div>
        <div class="description">
          <p>${arrProductDetail.description}</p>
        </div>
        <div class="size" id="size">
          
        </div>
        <div class="price">${arrProductDetail.price} $</div>
        <div class="cacl">
          <div class="caclItem"><button class="btn-cacl">-</button></div>
          <div class="caclItem"><p>1</p></div>
          <div class="caclItem"><button class="btn-cacl">+</button></div>
        </div>
        <div class="btn-button">
          <button class="button">Add to cart</button>
        </div>
      </div>

   `
   document.getElementById(idBodyDetail).innerHTML = htmlDetail;

   console.log(arrProductDetail.size);
   let htmlSize = '';
   for(let i = 0; i <arrProductDetail.size.length; i++){
      htmlSize +=
      `<button class="btn-size btn btn">${arrProductDetail.size[i]}</button>`
   }
   document.getElementById('size').innerHTML = htmlSize;
}



window.onload = function () {
  getProduct();
  getProductDetail()
};
