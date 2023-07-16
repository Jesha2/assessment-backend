const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneBtn");


const baserUrl = "http://localhost:4000/api/";


const getFortune=()=>{
  axios.get(`${baserUrl}fortune`)
  .then(res=>{
      const data = res.data;
          alert(data);
  })
  .catch(err=>{
      console.log(err);

  })
}


const addCompliment = () => {
  let newCompliment = document.getElementById("add").value;
  //console.log(newCompliment);
  const body={newCompliment}// same as {newCompliment:newCompliment}when value same as key
  axios.post("http://localhost:4000/api/compliment",body)
      .then(res => {
        document.getElementById("add").value = "";
          console.log(res.data);
          //alert(res.data);
          getComplimentAll();
          
  });
};

const getComplimentAll=()=> {
axios.get(`${baserUrl}compliment/all`)
  .then(response => {
    const compliments = response.data;
    const complimentList = document.getElementById('complimentList');
    console.log("*****"+compliments);
    complimentList.innerHTML = '';

    compliments.forEach(compliment => {
      const complimentContainer = document.createElement('div');
      complimentContainer.classList.add('compliment-container');

      const complimentText = document.createElement('div');
      complimentText.classList.add('compliment-text');
      complimentText.innerText = compliment;

      const complimentActions = document.createElement('div');
      complimentActions.classList.add('compliment-actions');

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deleteCompliment(compliment));

      const updateButton = document.createElement('button');
      updateButton.innerText = 'Update';
      updateButton.addEventListener('click', () => updateCompliment(compliment));
      
      complimentActions.appendChild(updateButton);
      complimentActions.appendChild(deleteButton);
      

      complimentContainer.appendChild(complimentText);
      complimentContainer.appendChild(complimentActions);

      complimentList.appendChild(complimentContainer);
    });
  })
  .catch(error => {
    console.error(error);
  });
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment")
        .then(res => {
            const data = res.data;
            console.log(res);
            console.log(res.data);
            alert(data);
            //getComplimentAll();
    });
};

function updateCompliment(compliment) {
  const updatedCompliment = prompt('Enter the updated compliment:');
 //const body={ oldCompliment: compliment, newCompliment: updatedCompliment }
  if (updatedCompliment) {
    axios.put(`${baserUrl}compliment`,{ oldCompliment: compliment, newCompliment: updatedCompliment } )
      .then(response => {
        console.log(response.data);
        getComplimentAll();
      })
      .catch(error => {
        console.error(error);
      });
  }
}

//axios.delete method does not take a second method like its get() and so we usually do delete method by passing the query as a req parameter for example here we will pass compliment in its url   :-[ axios.delete(`http://localhost:4000/api/compliment/${compliment}`)]. in this method we will use a diff approach.
/**By default, when you make a DELETE request with axios, it does not send a request payload. However, in some cases, you may want to include a payload with the DELETE request, such as when using frameworks or APIs that expect a request payload for DELETE operations.
To include a request payload with a DELETE request using axios, you need to use the data property in the configuration object, { data: body }. This tells axios to include the payload in the request.*/
function deleteCompliment(compliment) {
  console.log("^^^^^^ deleting " + compliment)
  const body ={compliment};

  axios.delete("http://localhost:4000/api/compliment/" , { data: body } )
    .then(response => {
      //console.log(response.data);
      getComplimentAll();
    })
    .catch(error => {
      console.error(error);
    });
}
//Event listeners
document.addEventListener("DOMContentLoaded", getComplimentAll);
//getComplimentAll();
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
addCompBtn.addEventListener('click', addCompliment)


    
 
