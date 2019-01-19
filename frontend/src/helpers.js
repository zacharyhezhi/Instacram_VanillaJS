/* returns an empty array of size max */
export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

/**
 * You don't have to use this but it may or may not simplify element creation
 * 
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
   
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post 
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post' });

    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    section.appendChild(createElement('img', null, 
        { src: '/images/'+post.src, alt: post.meta.description_text, class: 'post-image' }));

    return section;
}

export function createPostTileBase64(post) {
    const section = createElement('section', null, { class: 'post' });
    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    section.appendChild(createElement('img', null, 
        { src: 'data:image/png;base64, ' + post.src, alt: post.meta.description_text, class: 'post-image' }));

    section.appendChild(createElement('h3',post.meta.description_text,{class: 'post-description'}));

    let time = new Date(post.meta.published * 1000);
    section.appendChild(createElement('time', time,{class:'time'}));

    section.appendChild(createElement('h4', 'Likes ' + post.meta.likes.length,{class: 'likes_number'}));

    section.appendChild(createElement('h4', 'Comments ' + post.comments.length,{class: 'comments_number'}));

    // section.appendChild(createElement('h5'), '')
    post.meta.likes.forEach( user_id =>  {
        //go_fetch_user_info_and_show_user_name
        let url = 'http://127.0.0.1:5000/user/?id=' + user_id;
        fetch(url,{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }).then(res =>{
                console.log(res.name);
            })
        })



       })

    return section;
}



id.forEach(function(ele){
    var url = 'http://127.0.0.1:5000/user/?id=' + ele;//how to use virable here?

    fetch(url, {
        method: 'GET', // or 'PUT'
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => {
        console.log(res.name);
    })
    .then(resp => {


    })

    })




// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event) {
    const [ file ] = event.target.files;

    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);

    // bad data, let's walk away
    if (!valid)
        return false;
    
    // if we get here we have a valid image
    const reader = new FileReader();
    
    reader.onload = (e) => {
        // do something with the data result
        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL });
        document.body.appendChild(image);
    };

    // this returns a base64 image
    reader.readAsDataURL(file);
}

/* 
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null

}


