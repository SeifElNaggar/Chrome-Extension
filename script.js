let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ulEl")
const deleteBtn = document.getElementById("deleteEl")
const saveTab = document.getElementById("saveTab")

const leadsLocalstorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsLocalstorage){
  myLeads = leadsLocalstorage
  renderData()
} 

saveTab.addEventListener('click' ,function(){

  chrome.tabs.query({active:true,currentWindow:true,},function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderData()
  }) 
})

deleteBtn.addEventListener('click' ,function(){
  localStorage.clear()
  myLeads = []
  renderData()
})

inputBtn.addEventListener('click', function(){
  myLeads.push(inputEl.value);
  inputEl.value = ""
  localStorage.setItem("myLeads" ,JSON.stringify(myLeads))
  renderData()
})
function renderData(){
    let listItems = ""
    for(let i = 0;i<myLeads.length;i++){
        // listItems += "<li><a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
           listItems += `
           <li>
           <a target ='_blank' href='${myLeads[i]}'>
             ${myLeads[i]}
           </a> 
           </li> `
    }
    ulEl.innerHTML = listItems 
}
