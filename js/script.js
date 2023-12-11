// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
const htmlElem = document.documentElement
const bodyElem = document.body
const navElem = document.querySelector('.nav')
const navListElem = document.querySelector('.nav__list')
const navListToggleBtn = document.querySelector('.nav__menu-toggle')
const screenModeToggleBtn = document.querySelector('.nav__screen-mode')
const colorPalletToggleBtn = document.querySelector('.color-pallet__icon')
const colorPalletElem = document.querySelector('.color-pallet')
const colorPalletLightBtn = document.querySelector('.color-pallet__mode--light')
const colorPalletDarkBtn = document.querySelector('.color-pallet__mode--dark')
const colorPalletThemeColors = document.querySelectorAll('.color-pallet__theme')
const heroHeaderJobElem = document.querySelector('.hero-header__job')
const aboutMeElem = document.querySelector('.about-me')
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
// ---------------------------------------------------------------------------------------------------------------
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- * Initial * -----------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_

// change hero heading job content

let typeWriteElem = document.querySelector('.hero-header__job')
let cursorElem = document.querySelector('.hero-header__cursor')
let txtArray = typeWriteElem.dataset.content.split(',')
let typeWriteTxtIndex = 0
let i = 0

function typeWriteStart(txt) {
    return new Promise((res, rej) => {
        let interval = setInterval(() => {
            typeWriteElem.innerHTML += txtArray[typeWriteTxtIndex][i]
            i++
            if (i > txtArray[typeWriteTxtIndex].length - 1) {
                clearInterval(interval)
                cursorElem.classList.add('hero-header__cursor--typed')
                res()
            }
        }, 100);
    })
}

function typeWriteEnd() {
    setTimeout(() => {
        cursorElem.classList.remove('hero-header__cursor--typed')
        let interval = setInterval(() => {
            typeWriteElem.innerHTML = typeWriteElem.innerHTML.slice(0, -1)
            if (!typeWriteElem.innerHTML.length) {
                clearInterval(interval)
                i = 0
                typeWriteTxtIndex++
                if (typeWriteTxtIndex > txtArray.length - 1) {
                    typeWriteTxtIndex = 0
                }
                typeWriteStart(txtArray[typeWriteTxtIndex])
                    .then(typeWriteEnd)
            }
        }, 100)
    }, 2000);
}

typeWriteStart()
    .then(typeWriteEnd)

// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------- * Client Actions * ---------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_

// add&remove social-list in nav-list

if (window.innerWidth <= 812) {
    addSocialListToNavList()
} else {
    removeSocialListInNavList()
}
window.addEventListener('resize', () => {
    if (window.innerWidth <= 812) {
        removeSocialListInNavList()
        addSocialListToNavList()
    } else {
        removeSocialListInNavList()
    }
})
function addSocialListToNavList() {
    navListElem.insertAdjacentHTML('beforeend', `
        <ul class="social__list">
            <li class="social__item"><a href="#" class="social__link"><i class="fa-brands fa-linkedin-in"></i></a></li>
            <li class="social__item"><a href="#" class="social__link"><i class="fa-brands fa-github"></i></a></li>
            <li class="social__item"><a href="#" class="social__link"><i class="fa-brands fa-telegram"></i></a></li>
            <li class="social__item"><a href="#" class="social__link"><i class="fa-brands fa-instagram"></i></a></li>
        </ul>
    `)
}
function removeSocialListInNavList() {
    navListElem.querySelector('.social__list')?.remove()
}
// ---------------------------------------------------------------------------------------------------------------
// add active class to nav-links when scroll

window.addEventListener('scroll', () => {
    document.querySelectorAll('.inner-container > *').forEach(item => {
        if (item.offsetTop < window.scrollY + window.innerHeight) {
            navListElem.querySelectorAll('a').forEach(item => {
                item.classList.remove('active')
            })
            navListElem.querySelector(`a[href$=${item.id}]`).classList.add('active')
        }
    })
})
// ---------------------------------------------------------------------------------------------------------------
// set background and shadow to nav when scroll

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navElem.classList.add('scroll')
    } else {
        navElem.classList.remove('scroll')
    }
})
// ---------------------------------------------------------------------------------------------------------------
// show and hide nav-menu

navListToggleBtn.addEventListener('click', () => {
    navListElem.classList.toggle('show')
    closeColorPallet()
})
// ---------------------------------------------------------------------------------------------------------------
// fullscreen document

screenModeToggleBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        screenModeToggleBtn.innerHTML = '<i class="fa-sharp fa-solid fa-expand"></i>'
    } else {
        htmlElem.requestFullscreen();
        screenModeToggleBtn.innerHTML = '<i class="fa-solid fa-compress"></i>'
    }
})
// ---------------------------------------------------------------------------------------------------------------
// open & close color pallet

colorPalletToggleBtn.addEventListener('click', () => {
    colorPalletElem.classList.toggle('open')
})
// ---------------------------------------------------------------------------------------------------------------
// change mode color

if (!localStorage.getItem('mode')) {
    bodyElem.classList.remove('dark')
} else if (localStorage.getItem('mode') == 'light') {
    bodyElem.classList.remove('dark')
} else {
    bodyElem.classList.add('dark')
}
colorPalletLightBtn.addEventListener('click', () => {
    bodyElem.classList.remove('dark')
    localStorage.setItem('mode', 'light')
})
colorPalletDarkBtn.addEventListener('click', () => {
    bodyElem.classList.add('dark')
    localStorage.setItem('mode', 'dark')
})
// ---------------------------------------------------------------------------------------------------------------
// change color pallet

if (localStorage.getItem('color-pallet')) {
    htmlElem.style.setProperty('--primary-color', localStorage.getItem('color-pallet'))
}
colorPalletThemeColors.forEach(item => {
    item.style.backgroundColor = item.dataset.color
    item.addEventListener('click', () => {
        htmlElem.style.setProperty('--primary-color', item.dataset.color)
        localStorage.setItem('color-pallet', item.dataset.color)
    })
})
// ---------------------------------------------------------------------------------------------------------------
// animation portfolios

// fade-in effect when scroll
const portfolioItemElems = document.querySelectorAll('.portfolio__item')
window.addEventListener('scroll', () => {
    portfolioItemElems.forEach(portfolioItemElem => {
        if (portfolioItemElem.offsetTop < window.scrollY + window.innerHeight
            && portfolioItemElem.offsetTop + portfolioItemElem.offsetHeight > window.scrollY) {
            portfolioItemElem.style.transform = 'scale(1)'
        }
    })
})

// show برای دیدن کلیک کنید when mouse-hover
let opacityAnime, scaleAnime, backgroundColorAnime
portfolioItemElems.forEach(portfolioItemElem => {
    portfolioItemElem.addEventListener('mouseenter', () => {
        opacityAnime = 1
        scaleAnime = 1
        backgroundColorAnime = getComputedStyle(htmlElem).getPropertyValue('--primary-color') + 'dd'
        portfolioItemElem.style.setProperty('--backgroundColorAnime', backgroundColorAnime)
        portfolioItemElem.style.setProperty('--opacityAnime', opacityAnime)
        portfolioItemElem.style.setProperty('--scaleAnime', scaleAnime)
    })
    portfolioItemElem.addEventListener('mouseleave', () => {
        opacityAnime = 0
        scaleAnime = 0.7
        backgroundColorAnime = getComputedStyle(htmlElem).getPropertyValue('--primary-color') + 'dd'
        portfolioItemElem.style.setProperty('--backgroundColorAnime', backgroundColorAnime)
        portfolioItemElem.style.setProperty('--opacityAnime', opacityAnime)
        portfolioItemElem.style.setProperty('--scaleAnime', scaleAnime)
    })
})
// ---------------------------------------------------------------------------------------------------------------
// animation for skills bar

window.addEventListener('scroll', () => {
    document.querySelectorAll('.skills__progress-bar').forEach(skillProgressBar => {
        if (skillProgressBar.offsetTop < window.scrollY + window.innerHeight
            && skillProgressBar.offsetTop + skillProgressBar.offsetHeight > window.scrollY) {
            skillProgressBar.style.width = skillProgressBar.dataset.percent + '%'
        }
    })
})
// ---------------------------------------------------------------------------------------------------------------
// about-me animation

window.addEventListener('scroll', () => {
    if (aboutMeElem.offsetTop < window.scrollY + window.innerHeight
        && aboutMeElem.offsetTop + aboutMeElem.offsetHeight > window.scrollY) {
        document.querySelector('.about-me__picture').style.transform = 'scale(1)'
        document.querySelector('.about-me__content').style.transform = 'scale(1)'
    }
})

// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_
// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- * Functions * -----------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_

function closeColorPallet() {
    colorPalletElem.classList.remove('open')
}
function openColorPalet() {
    colorPalletElem.classList.add('open')
}