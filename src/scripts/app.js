const slider = require('./common/slider')
const $ = require('jquery') // если будет нужен

slider() // инициализируем слайдер

$('.hamburger').click(function(){
    $(this).next('.nav').toggle()
})

