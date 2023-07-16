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

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment")
        .then(res => {
            const data = res.data;
            console.log(res);
            console.log(res.data);
            alert(data);
            getCompliments();
    });
};

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

        complimentActions.appendChild(deleteButton);
        complimentActions.appendChild(updateButton);

        complimentContainer.appendChild(complimentText);
        complimentContainer.appendChild(complimentActions);

        complimentList.appendChild(complimentContainer);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteCompliment(compliment) {
  console.log("^^^^^^compliment delete " + compliment)
  const body ={compliment:compliment};

  axios.delete("http://localhost:4000/api/compliment",body)
    .then(response => {
      //console.log(response.data);
      getComplimentAll();
    })
    .catch(error => {
      console.error(error);
    });
}

function updateCompliment(compliment) {
  const updatedCompliment = prompt('Enter the updated compliment:');
 const body={ oldCompliment: compliment, newCompliment: updatedCompliment }
  if (updatedCompliment) {
    axios.put(`${baserUrl}compliment`,body )
      .then(response => {
        console.log(response.data);
        getComplimentAll();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
//Event listeners
document.addEventListener("DOMContentLoaded", getComplimentAll);
//getComplimentAll();
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
addCompBtn.addEventListener('click', addCompliment)


    
 
