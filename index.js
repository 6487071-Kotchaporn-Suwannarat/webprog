async function selectAll() {
    const res = await (await fetch('http://localhost:3003/admin/selectall', { method: 'GET' })).json()
    let list = `<ul>`
    res.data.forEach(element => {
        list += `<li>${element}</li?`
    });
    list += `</ul>`
    document.querySelector('#id').innerHTML = list
}

async function select(id) {
    const res = await (await fetch('http://localhost:3003/admin/id', { method: 'GET', body: JSON.stringify({ admin_id: id }) })).json()
    document.querySelector('#id').innerHTML = `<div>${res.data}</div>`
}

async function insert(admin) {
    console.log(admin);
    const res = await (await fetch('http://localhost:3003/admin/insert', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ admin })
    })).json()
    document.querySelector('#id').innerHTML = `<div>${res.data}</div>`
}

