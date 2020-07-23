let lang = [
    {id:1, title: 'JavaScript', price: 1000, img: 'https://umbrellajs.com/umbrella.png?1'},
    {id:2, title: 'Php', price: 725, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqrqZ1Jxz3YDPDYsASlb4c_IHmEd5smNog2w&usqp=CAU'},
    {id:3, title: 'Python', price: 300, img: 'https://www.dataoptimal.com/wp-content/uploads/python-programming-for-beginners-2019-1024x574.jpg'},
]

const toHtml = langs => `
 <div class="col">
            <div class="card">
            <img class="card-img-top" style="height: 300px" src="${langs.img}" alt="${langs.title}">
            <div class="card-body">
                 <h5 class="card-title">${langs.title}</h5>
                 <a href="#" class="btn btn-primary" data-btn="price" data-id="${langs.id}">Посмотреть цену</a>
                 <a href="#" class="btn btn-danger" data-btn="remove" data-id="${langs.id}">Удалить цену</a>
            </div>
      </div>
  </div>
`

function render() {
    const html = lang.map(toHtml).join('');
    document.querySelector('#lang').innerHTML = html;
};
render();

const priceModal = $.modal({
    title: 'Цена на Товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close();
        }}
    ]
});

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const langs = lang.find(l => l.id === id);

    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${langs.title}: <strong>${langs.price}$</strong></p>
        `)
        priceModal.open();
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${langs.title}</strong></p>`
        }).then(() => {
           lang = lang.filter(f => f.id !== id)
            render();
        }).catch(() => {
            console.log('Cancel')
        });
    }
});