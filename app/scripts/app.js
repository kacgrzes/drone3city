//Zamockowane dane
var mockedData = {
    people: [
        {
            id: 0,
            firstName: 'Tomasz',
            lastName: 'Ciunel'
        },
        {
            id: 1,
            firstName: 'Kacper',
            lastName: 'Grzeszczyk'
        },{
            id: 2,
            firstName: 'Jakub',
            lastName: 'Baczyński'
        }
    ]
};

//Nowy komponent "mapa"
var map = Vue.extend({
    template: '<div>Test komponentów - tutaj będzie mapa</div>'
});

//Rejestracja komponentów
Vue.component('google-map', map);

var people = new Vue({
    el: '#table',
    data: {
        people: mockedData.people
    }
});

//Root apki
var app = new Vue({
    el: '#app',
    data: {
        show: true
    }
});