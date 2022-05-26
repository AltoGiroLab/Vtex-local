const filterParent = document.getElementsByClassName('menu-departamento')[0]
const colorParent = filterParent.getElementsByTagName('h5')[0].nextElementSibling
const sizeParent = filterParent.getElementsByTagName('h5')[1].nextElementSibling
const colorList = colorParent.getElementsByTagName('li')
const sizeList = sizeParent.getElementsByTagName('li')

const selectParent = document.createElement('div')
selectParent.setAttribute('class','select-parent')
const activeParent = document.createElement('div')
activeParent.setAttribute('class', 'active-parent')
filterParent.append(selectParent, activeParent)

let colorListAtivo = colorList[0].getAttribute('class')
if (colorListAtivo === 'filtro-ativo') {
    const label = colorList[0].innerText
    const url = colorParent.getElementsByTagName('a')[0].attributes[0].value.replace(' ', '%20')
    activeLabel(label, url)
} else {
    colorListFunc()
}

let sizeListAtivo = sizeList[0].getAttribute('class')
if (sizeListAtivo === 'filtro-ativo') {
    const label = `tam ${sizeList[0].innerText}`
    const url = sizeParent.getElementsByTagName('a')[0].attributes[0].value.replace(' ', '%20')
    activeLabel(label, url)
} else {
    sizeListFunc()
}

function colorListFunc() {
    // Create div and select with colorList title value
    let selectColor = document.createElement('select')
    selectColor.setAttribute('id', 'selectColor')
    selectColor.setAttribute('class', 'select')
    let option = document.createElement('option')
    option.value = ''
    option.innerHTML = 'cor'
    selectColor.appendChild(option)
    selectParent.append(selectColor)

    // Go to url when selectColor changes
    $('#selectColor').bind('change', function () {
        var url = $(this).val()
        if (url != '') {
            window.location = url + '&lid=80a07dd3-fa3e-4539-8821-f4591d3e5966'
        }
        return false
    })

    // Hide Color title and Color ul
    filterParent.getElementsByTagName('h5')[0].setAttribute('style', 'display:none;')
    filterParent.getElementsByTagName('h5')[0].nextElementSibling.setAttribute('style', 'display:none;')

    // Feed select with colorList values
    Array.from(colorList).map((item) => {
        let attrs = item.getElementsByTagName('a')[0].attributes
        let url = attrs[0].value.replace(' ', '%20')
        let title = attrs[1].value
    
        let option = document.createElement('option')
        option.value = url
        option.innerHTML = title.toLowerCase()
    
        selectColor.appendChild(option)
    })
}

function sizeListFunc() {
    // Create div and select with sizeList title value
    let selectSize = document.createElement('select')
    selectSize.setAttribute('id', 'selectSize')
    selectSize.setAttribute('class', 'select')
    let option2 = document.createElement('option')
    option2.value = ''
    option2.innerHTML = 'tamanho'
    selectSize.appendChild(option2)
    selectParent.append(selectSize)

    // Go to url when sizeList changes
    $('#selectSize').bind('change', function () {
        var url = $(this).val()
        if (url != '') {
            window.location = url + '&lid=80a07dd3-fa3e-4539-8821-f4591d3e5966'
        }
        return false
    })

    // Hide Size title and Size ul
    filterParent.getElementsByTagName('h5')[1].setAttribute('style', 'display:none;')
    filterParent.getElementsByTagName('h5')[1].nextElementSibling.setAttribute('style', 'display:none;')

    // Feed select with sizeList values
    Array.from(sizeList).map((item) => {
        let attrs = item.getElementsByTagName('a')[0].attributes
        let url = attrs[0].value.replace(' ', '%20')
        let title = attrs[1].value
    
        let option = document.createElement('option')
        option.value = url
        option.innerHTML = title.toLowerCase()
    
        selectSize.appendChild(option)
    })
}

function activeLabel(label, url) {
    const activeLabelDiv = document.createElement('div')
    activeLabelDiv.setAttribute('class', 'active-label')
    activeLabelDiv.innerHTML = `${label} <a href="${url}">X</a>`

    activeParent.append(activeLabelDiv)
}

const navigationParent = document.getElementsByClassName('navigation')[0]
const orderParent = document.createElement('div')
orderParent.setAttribute('class', 'order-by')
navigationParent.append(orderParent)

const orderBy = document.getElementsByClassName('orderBy')[0]
orderParent.append(orderBy)


setTimeout(() => {
    const paginationParent = document.getElementsByClassName('pager')[1]
    const firstPage = paginationParent.getElementsByClassName('first')[0]
    const prevPage = paginationParent.getElementsByClassName('previous')[0]
    const nextPage = paginationParent.getElementsByClassName('next')[0]
    const lastPage = paginationParent.getElementsByClassName('last')[0]
    
    firstPage.remove()
    prevPage.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'
    nextPage.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'
    lastPage.remove()
}, 500);