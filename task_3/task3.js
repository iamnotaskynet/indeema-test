const form = document.querySelector('#formInput');
const output = document.querySelector('#output');

/**
 * Returns rendered html structure
 * from array of objects
 */
const arrObjsToHtml = (array) => {
    let htmlRow = ''
    array.forEach(row => {
        htmlRow += `
            <div>
            <input type="hidden" value="${row.id}">
            <b>${row.datetime}</b>
            <input id="firstname"   class="inputEnter" type="text" value="${row.firstname}">
            <input id="lastname"    class="inputEnter" type="text" value="${row.lastname}">
            <input id="email"       class="inputEnter" type="text" value="${row.email}">
            <button class="btnClose">X</button>
            </div>
        `;
    });
    return htmlRow;
};

/**
 * Adds events on inputs in table
 * it trigers when ENTER presed after edditing
 */
const addInputEnterEvent = () => {
    const inputs = document.querySelectorAll('.inputEnter');
    inputs.forEach(input => {
        input.addEventListener("keyup", event => {
            if (event.keyCode === 13) {
                const id = event.currentTarget.parentNode.childNodes[1].value;
                const prop =  event.currentTarget.id;
                const text = event.currentTarget.value;

                const db = JSON.parse(localStorage.getItem('indeema_test'));

                db.forEach(row => {
                    if(row.id == id) row[prop] = text;
                });

                localStorage.setItem('indeema_test', JSON.stringify(db));
                output.innerHTML = arrObjsToHtml(db);
                addInputEnterEvent();
                addCloseEvent();
            };
        });
    });
};

/**
 *  Adds close event on each button of row
 *  and re-render it if it was pushed
 */
const addCloseEvent = () => {
    const btnsClose = document.querySelectorAll('.btnClose');
    //console.log(btnsClose);
    
    btnsClose.forEach(btn => {
        btn.addEventListener('click', event => {
            const id = event.currentTarget.parentNode.childNodes[1].value;
            const db = 
                JSON.parse(localStorage.getItem('indeema_test')).filter(row => row.id != id);

            localStorage.setItem('indeema_test', JSON.stringify(db));
            output.innerHTML = arrObjsToHtml(db);
            addInputEnterEvent();
            addCloseEvent();
        });
    })
};

/**
 *  Creates or renders pseudo db
 *  localstorage 
 */
const dbConnect = () => {
    if(!localStorage.getItem('indeema_test')) {
        localStorage.setItem('indeema_test', JSON.stringify([]));
    } else {
        const db = JSON.parse(localStorage.getItem('indeema_test'));
        output.innerHTML = arrObjsToHtml(db);
        addInputEnterEvent();
        addCloseEvent();
    };
};

/**
 *  Adds event on button when 
 *  for entering new user
 */
const addUserEvent = () => {
    form.addEventListener('submit', event => { 
        event.preventDefault(); // disable reloading page
        
        const db = JSON.parse(localStorage.getItem('indeema_test'));
    
        let lastID = 0;
        if(db.length > 0) lastID = db[db.length - 1].id;
    
        const row = {
            id:         ++lastID,
            datetime:   new Date().toString().split('GMT')[0],
            firstname:  document.querySelector('#firstname').value,
            lastname:   document.querySelector('#lastname').value,
            email:      document.querySelector('#email').value
        };
        db.push(row);
    
        localStorage.setItem('indeema_test', JSON.stringify(db));
        output.innerHTML = arrObjsToHtml(db);
        addInputEnterEvent();
        addCloseEvent();
    });
};

const start = () => {
    dbConnect();
    addUserEvent()
};

start();