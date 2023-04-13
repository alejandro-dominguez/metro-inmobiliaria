$(document).ready(function() {
    const getData = async (
    ) => {
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
        }
        catch (error) {
            console.error("Ha ocurrido un problema al cargar los datos del servidor", error)
        }}
    getData()
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
    console.log(cardTexts)
    
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
