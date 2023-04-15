const shortenText = (text, n) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...")
        return shortenedText
    }
    return text
}

$(document).ready(function() {
    (async getFirestore => {
        $("#spinnerContainer").addClass("d-flex")
        $("body").css("overflow-y", "hidden")
        try {
            let carouselImgs = []
            let heroImg = []
            let aboutUsText = []
            let cardImgs = []
            let cardTexts = []

            const getCarouselImgs = await db.collection("metroData").where("carousel", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const url = doc.data()
                    carouselImgs.push(url)
                })
            })
            loadCarousel(carouselImgs)

            const getHeroImg = await db.collection("metroData").where("aboutUs", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const url = doc.data()
                    heroImg.push(url)
                })
            })
            const getAboutUsText = await db.collection("metroData").where("aboutUsText", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const text = doc.data()
                    aboutUsText.push(text)
                })
            })
            loadHeroSection(heroImg, aboutUsText)

            const getCardImgs = await db.collection("metroData").where("cards", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const url = doc.data()
                    cardImgs.push(url)
                })
            })
            const getCardTexts = await db.collection("metroData").where("cardText", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const text = doc.data()
                    cardTexts.push(text)
                })
            })
            loadCards(cardImgs, cardTexts)
            $("#spinnerContainer").addClass("d-none")
            $("body").css("overflow-y", "auto")
        }
        catch (error) {
            console.error("Ha ocurrido un problema al cargar los datos del servidor", error)
        }
        getStates()
    })()
})

const loadCarousel = (carouselImgs) => {
    const carouselTemplate = document.querySelector("#carouselTemplate").content
    const carouselFragment = document.createDocumentFragment()
    
    if (carouselImgs.length > 0) {
        carouselTemplate.querySelector("#heroCarouselImg-1").setAttribute("src", carouselImgs[0].url)
        carouselTemplate.querySelector("#heroCarouselImg-2").setAttribute("src", carouselImgs[1].url)
        carouselTemplate.querySelector("#heroCarouselImg-3").setAttribute("src", carouselImgs[2].url)
        carouselTemplate.querySelector("#heroCarouselImg-4").setAttribute("src", carouselImgs[3].url)
        const clone = carouselTemplate.cloneNode(true)
        carouselFragment.append(clone)
        $("#carouselSection").append(carouselFragment)
    } else {
        console.error("Ha ocurrido un error al cargar los datos del servidor")
    }
}

const loadHeroSection = (heroImg, aboutUsText) => {
    const aboutUsTemplate = document.querySelector("#aboutUsTemplate").content
    const aboutUsFragment = document.createDocumentFragment()
    
    if (!heroImg.length && !aboutUsText.length) {
        console.error("Ha ocurrido un error al cargar los datos del servidor")
    } else {
        aboutUsTemplate.querySelector("#aboutUsImg").setAttribute("src", heroImg[0].url)
        aboutUsTemplate.querySelector("#aboutUsText").textContent = aboutUsText[0].text
        const clone = aboutUsTemplate.cloneNode(true)
        aboutUsFragment.append(clone)
        $("#aboutUsSection").append(aboutUsFragment)
    }
}

const loadCards = (cardImgs, cardTexts) => {
    const cardsTemplate = document.querySelector("#servicesTemplate").content
    const cardsFragment = document.createDocumentFragment()
    
    if (cardImgs.length && cardTexts.length > 0) {
        cardsTemplate.querySelector("#cardImg-1").setAttribute("src", cardImgs[0].url)
        cardsTemplate.querySelector("#cardImg-2").setAttribute("src", cardImgs[1].url)
        cardsTemplate.querySelector("#cardImg-3").setAttribute("src", cardImgs[2].url)
        cardsTemplate.querySelector("#cardText-1").textContent = cardTexts[0].text
        cardsTemplate.querySelector("#cardText-2").textContent = cardTexts[1].text
        cardsTemplate.querySelector("#cardText-3").textContent = cardTexts[2].text
        const clone = cardsTemplate.cloneNode(true)
        cardsFragment.append(clone)
        $("#servicesSection").append(cardsFragment)
    } else {
        console.error("Ha ocurrido un error al cargar los datos del servidor")
    }
}

const getStates = () => {
    const settings = {
        "url": "https://apis.datos.gob.ar/georef/api/provincias?campos=nombre",
        "method": "GET",
    }
    
    $.ajax(settings).done(function(response) {
        $("#spinnerContainer").addClass("d-flex")
        $("body").css("overflow-y", "hidden")
        let stateNames = []
        const statesArray = response.provincias
        statesArray.forEach(state => {
            stateNames.push(shortenText(state.nombre, 16))
        })
        stateNames.forEach(state => {
            $("#ubication").append(`<option value="${state}">${state}</option>`)
        })
        $("#spinnerContainer").addClass("d-none")
        $("body").css("overflow-y", "auto")
        handlePricing()
    })
}

const handlePricing = () => {
    const view1 = $("#firstForm")
    const view2 = $("#secondForm")
    const pricingForms = $(".pricingForm")

    Array.from(pricingForms).forEach(form => {
        form.addEventListener("submit", e => {
            form.classList.add("was-validated")
            e.stopPropagation()
            e.preventDefault()
            switch (form.id) {
                case "firstForm":
                    view1.addClass("d-none")
                    view2.removeClass("d-none")
                    let ubication = $("#ubication").val()
                    let meters = $("#meters").val()
                    let rooms = $("#rooms").val()
                    let propertyType = $("#propertyType").val()
                    let ubicationValue
                    let roomsValue
                    let propertyTypeValue
            
                    switch (rooms) {
                        case "1":
                            roomsValue = "5"
                            break;
                        case "2":
                            roomsValue = "7"
                            break;
                        case "3":
                            roomsValue = "9"
                            break;
                        case "4":
                            roomsValue = "11"
                            break;
                        case "5":
                            roomsValue = "13"
                            break;
                        case "6":
                            roomsValue = "15"
                            break;
                        case "7":
                            roomsValue = "17"
                            break;
                        case "8":
                            roomsValue = "19"
                            break;
                        case "9":
                            roomsValue = "21"
                            break;
                        case "10":
                            roomsValue = "23"
                            break;
                    }
            
                    switch (propertyType) {
                        case "Departamento":
                            propertyTypeValue = "15"      
                            break;
                        case "Casa":
                            propertyTypeValue = "20"
                            break;
                    }
            
                    switch (ubication) {
                        case "Misiones":
                            ubicationValue = "900"
                            break;
                        case "San Luis":
                            ubicationValue = "1200"
                            break;
                        case "San Juan":
                            ubicationValue = "1500"
                            break;
                        case "Entre Ríos":
                            ubicationValue = "1500"
                            break;
                        case "Santa Cruz":
                            ubicationValue = "1200"
                            break;
                        case "Río Negro":
                            ubicationValue = "2000"
                            break;
                        case "Chubut":
                            ubicationValue = "1700"
                            break;
                        case "Córdoba":
                            ubicationValue = "1200"
                            break;
                        case "Mendoza":
                            ubicationValue = "1300"
                            break;
                        case "Chubut":
                            ubicationValue = "1500"
                            break;
                        case "La Rioja":
                            ubicationValue = "1100"
                            break;
                        case "Catamarca":
                            ubicationValue = "1000"
                            break;
                        case "La Pampa":
                            ubicationValue = "1200"
                            break;
                        case "Santiago del Est...":
                            ubicationValue = "1000"
                            break;
                        case "Corrientes":
                            ubicationValue = "1100"
                            break;
                        case "Santa Fe":
                            ubicationValue = "1500"
                            break;
                        case "Tucumán":
                            ubicationValue = "1100"
                            break;
                        case "Neuquén":
                            ubicationValue = "2500"
                            break;
                        case "Salta":
                            ubicationValue = "1200"
                            break;
                        case "Chaco":
                            ubicationValue = "900"
                            break;
                        case "Formosa":
                            ubicationValue = "800"
                            break;
                        case "Jujuy":
                            ubicationValue = "1000"
                            break;
                        case "Ciudad Autónoma ...":
                            ubicationValue = "2800"
                            break;
                        case "Buenos Aires":
                            ubicationValue = "2800"
                            break;
                        case "Tierra del Fuego...":
                            ubicationValue = "2500"
                            break;
                        default:
                            ubicationValue = "2000"
                            break;
                    }
            
                    let baseMetersValue = parseInt(Number(meters) * Number(ubicationValue))
                    let roomsPercentage = baseMetersValue * (roomsValue / 100)
                    let propertyTypePercentage = baseMetersValue * (propertyTypeValue / 100)
                    let totalPricing = baseMetersValue + roomsPercentage + propertyTypePercentage
            
                    $("#totalPricing").val(`USD$ ${totalPricing}`)
                    break;
                case "secondForm":
                    showConfirmData()
                    break;
            }
        }, false)
    })
}

const showConfirmData = () => {
    class PricingForm {
        ubication;
        meters;
        rooms;
        propertyType;
        totalPricing;
        fullName;
        email;
    }
    let pricingForm = new PricingForm()

    pricingForm.ubication = $("#ubication").val()
    pricingForm.meters = $("#meters").val()
    pricingForm.rooms = $("#rooms").val()
    pricingForm.propertyType = $("#propertyType").val()
    pricingForm.totalPricing = $("#totalPricing").val()
    pricingForm.fullName = $("#fullName").val()
    pricingForm.email = $("#email").val()
    $("#ubicationConfirm").val(pricingForm.ubication)
    $("#metersConfirm").val(pricingForm.meters)
    $("#roomsConfirm").val(pricingForm.rooms)
    $("#propertyTypeConfirm").val(pricingForm.propertyType)
    $("#totalPricingConfirm").val(pricingForm.totalPricing)
    $("#fullNameConfirm").val(pricingForm.fullName)
    $("#emailConfirm").val(pricingForm.email)
    $("#secondForm").addClass("d-none")
    $("#thirdForm").removeClass("d-none")

    handleBtns()
}

const handleBtns = () => {
    const btnBack1 = document.querySelector("#btnPricingBack")
    const btnBack2 = document.querySelector("#btnPricingPDFBack")
    const btnSubmitPDF = document.querySelector("#btnPricingPDF")

    btnBack1.addEventListener("click", () => {
        $("#firstForm").removeClass("d-none")
        $("#secondForm").addClass("d-none")
    })
    btnBack2.addEventListener("click", () => {
        $("#firstForm").removeClass("d-none")
        $("#thirdForm").addClass("d-none")
    })

    btnSubmitPDF.addEventListener("click", () => {
        const PDFElement = document.querySelector("#thirdForm")
        html2pdf()
        .set({
            margin: 1,
            filename: "tasacion.pdf",
            image: {
                type: "png",
                quality: 0.98
            },
            html2canvas: {
                scale: 3,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a3",
                orientation: "portrait"
            }
        })
        .from(PDFElement)
        .save()
        .catch(error => console.log(error))
    })
}

/* class ContactForm {
    fullName;
    email;
    message;
}
let contactForm = new ContactForm() */