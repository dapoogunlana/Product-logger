function D(arg){
    return document.getElementById(arg);
}
console.log('combined scripts');
if (document.cookie){
    console.log('Cookie De')
    D('login').style.display = 'none';
    D('register').style.display = 'none';
    D('logout').style.display = '';
}else{
    D('login').style.display = '';
    D('register').style.display = '';
    D('logout').style.display = 'none';
}

function logout(){
    console.log('Sorting')
    fetch('/login/logout',{
        method:'POST'
    })
    .then(res => res.text())
    .then(res => {
        setTimeout(()=>{
            location.reload()
        },100)
    })
}

//make any div with class "nini" collapsable
const clicker = document.querySelectorAll('.nini button');
const content = document.querySelectorAll('.nini div');
for(let i = 0; i < clicker.length; i++){
    content[i].style.height = '0px';
    content[i].style.padding = '0';
}
for(let i = 0; i < clicker.length; i++){
    clicker[i].addEventListener('click', function(){
        if(content[i].style.height === '0px'){
            content[i].style.height = ''
            content[i].style.padding = ''
        }else {
            content[i].style.height = '0px'
            content[i].style.padding = '0';
        }
    })
}