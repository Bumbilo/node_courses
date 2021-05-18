module.exports = ({location, current}) => {
    console.log('==========================================');
    console.log('Город: ', location.name)
    console.log('Мeстное время: ',location.localtime)
    console.log('Температура воздуха: ', current.temperature);
    console.log('Влажность воздуха: ', current.humidity);
    console.log('==========================================');
};