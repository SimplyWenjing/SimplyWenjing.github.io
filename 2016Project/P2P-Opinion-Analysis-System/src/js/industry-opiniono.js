var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 2,
    paginationClickable: true,
    spaceBetween: 30
});
var swiper2 = new Swiper('.swiper1 .swiper-container', {
    pagination: '.swiper-pagination',
    effect: 'cube',
    grabCursor: true,
    cube: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94
    }
});

var myTab = document.getElementById("myTab");
var hot = document.getElementById("hot");
var trend = document.getElementById("trend");
var eventTop = document.getElementById("event-top");
myTab.addEventListener("click",function(event){
    var target = event.target
    var id = target.id;
    switch (id) {
        case "tab-hot":
            target.className = "li-hover";
            target.previousElementSibling.className = "";
            target.nextElementSibling.className = "";
            hot.style.display = "block";
            trend.style.display = "none";
            eventTop.style.display = "none";
            break;
        case "tab-trend":
            target.className = "li-hover";
            target.nextElementSibling.className = "";
            target.nextElementSibling.nextElementSibling.className = "";
            hot.style.display = "none";
            trend.style.display = "block";
            eventTop.style.display = "none";
            break;
        case "tab-event":
            target.className = "li-hover";
            target.previousElementSibling.className = "";
            target.previousElementSibling.previousElementSibling.className = "";
            hot.style.display = "none";
            trend.style.display = "none";
            eventTop.style.display = "block";
            break;
        default:
            hot.style.display = "block";
    }

},false);