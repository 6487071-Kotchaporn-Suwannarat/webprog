// async function selectAll() {
//     const res = await (await fetch('http://localhost:3003/admin/selectall', {method: 'GET'})).json()
//     let list = `<ul>`
//     res.data.forEach(element => {
//         list += `<li>${element}</li?`
//     });
//     list += `</ul>`
//     document.querySelector('#id').innerHTML = list
// }