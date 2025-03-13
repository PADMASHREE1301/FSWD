const api_url = "https://raw.githubusercontent.com/Prashanth-4503/Api/refs/heads/main/data.json"; // Replace with actual API URL

// Defining async function
async function getapi(url) {
    // Storing response
    const response = await fetch(url);

    if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
        return;
    }

    var data = await response.json(); 
    console.log(data);

    if (response) {
        hideloader();
    }

    // Passing the actual data to the show function
    show(data);
}

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    let tab = 
        `<tr>
          <th>Name</th>
          <th>Office</th>
          <th>Position</th>
          <th>Salary</th>
         </tr>`;

    // Check if data.list exists
    if (data.list) {
        // Loop to access all rows
        for (let r of data.list) {
            tab += `<tr> 
                        <td>${r.name}</td> 
                        <td>${r.office}</td> 
                        <td>${r.position}</td>  
                        <td>${r.salary}</td>           
                    </tr>`;
        }
    } else {
        console.error('No list found in the data.');
    }

    // Setting innerHTML as tab variable
    document.getElementById("employees").innerHTML = tab;
}

// Simulating the fetch response with real data by calling the getapi function
window.onload = () => {
    getapi(api_url);
};