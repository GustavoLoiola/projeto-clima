const key = '4f49024084d955995e077c00af97457e'
const city = document.querySelector("input#city")
const btn = document.querySelector("button#btn")
const body = document.querySelector("body")


const dataView = (data) => {
    document.querySelector("div#name").innerHTML = `Tempo em ${data.name}`

    const temp = Math.floor(data.main.temp)
    document.querySelector("div#number").innerHTML = `${temp}°C`

    const desc = data.weather[0].description
    document.querySelector("p#desc").innerHTML = desc

    const clouds = [
            "nublado",
            "parcialmente nublado",
            "céu parcialmente nublado",
            "nuvens dispersas",
            "algumas nuvens",
            "céu com poucas nuvens",
            "céu encoberto",
            "encoberto"
        ]

    if(temp >= 35) {
        body.style.background = 'url(imagens/muito-sol-bg.jpg)'
    }
    else if(temp <= 5) {
        body.style.background = 'url(imagens/neve-bg.jpg)'
    }

    else if(clouds.includes(desc)){
         body.style.background = 'url(imagens/nublado-bg.jpg)'
    }

    else {
        const drizzleList = [
            "garoa leve",
            "garoa",
            "garoa intensa",
            "chuva leve",
            "chuvisco",
            "chuvisco intenso",
            "chuviscos com intensidade de raios"
        ]

        const thunderList = [
            "trovoada com chuva leve",
            "trovoada com chuva",
            "trovoada com chuva forte",
            "trovoada leve",
            "trovoada",
            "trovoada forte"
        ]
        

        if(drizzleList.includes(desc)) {
            body.style.background = 'url(imagens/chuva-bg.jpg)'
        }

        else if(thunderList.includes(desc)) {
            body.style.background = 'url(imagens/raio-bg.jpg)'
        }

        else {
            body.style.background = 'url(imagens/sol-bg.jpg)'
        }
    }
   

    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";


    document.querySelector("div#humidity").innerHTML = `Umidade: ${data.main.humidity.toFixed(0)}%`
    document.querySelector("img#weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.querySelector("img#weather-icon").style.visibility = 'visible'

    console.log(data)
}

 const searchCity = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`)
        if(!response.ok) {
            if(response.status === 404) {
                document.querySelector("div#name").innerHTML = 'Não foi possível localizar essa cidade...'
                console.log('Requisição inválida.')
            }
            else {
                document.querySelector("div#name").innerHTML = 'Erro interno!'
            }
            return
            }

            const data = await response.json()

            dataView(data) 
    }

    catch(error) {
        document.querySelector("div#name").innerHTML = 'Erro de conexão...'
        console.log('Erro na requisição!')
    }
}

const btnClick = () => {
    searchCity(city.value)
}


btn.addEventListener('click', btnClick)