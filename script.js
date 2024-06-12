    document.addEventListener('DOMContentLoaded', function(){
    const upcomingLaunchesDiv = document.getElementById('upcoming-launches');
    const pastLaunchesDiv = document.getElementById('past-launches');
    
    // Function to create a launch element
    function createLaunchElement(launch) {
        const launchElement = document.createElement('div');
        launchElement.classList.add('launch');
    
        const image = document.createElement('img')
        image.src='https://i.pinimg.com/474x/73/38/22/73382231735a314578da9c58a5194cf8.jpg'
        image.height = 400
        image.width = 350
        
        
        // image = launch.image;
        const launchName = document.createElement('h3');
        
        launchName.textContent = launch.name;
        const launchDate = document.createElement('p');
        launchDate.textContent = `Date: ${new Date(launch.date_utc).toLocaleDateString()}`;
        const launchDetails = document.createElement('p');
        launchDetails.textContent = `Details: ${launch.details || 'No details available'}`;
        // launchDetails= launch.details.substring(0,50);
        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read More';
        


     
        launchElement.appendChild(image);
        launchElement.appendChild(launchName);
        launchElement.appendChild(launchDate);
        launchElement.appendChild(launchDetails);

        
        

        return launchElement;
    }
    // Fetch upcoming launches
    fetch('https://api.spacexdata.com/v4/launches/upcoming')
        .then(response => response.json())
        .then(data => {
            data.forEach(launch => {

                const launchElement = createLaunchElement(launch);
                upcomingLaunchesDiv.appendChild(launchElement);
            });
        })
        .catch(error => console.error('Error fetching upcoming launches:', error));
    // Fetch past launches
    fetch('https://api.spacexdata.com/v4/launches/past')
        .then(response => response.json())
        .then(data => {
            data.forEach(launch => {
                const launchElement = createLaunchElement(launch);
                pastLaunchesDiv.appendChild(launchElement);

        
           
        });

        })
        .catch(error => console.error('Error fetching past launches:', error));

        fetch('https://api.spacexdata.com/v4/launches/past')
   .then(response => response.json())
   .then(launches => {
    launches.forEach(launch => {
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'launch-details';
        const truncatedDetails = launch.details.substring(0, 50); // Truncate to approximately 10 words
        const readMoreButton = document.createElement('button');
        readMoreButton.textContent = 'Read More';
        readMoreButton.onclick = () => {
            detailsContainer.innerHTML = launch.details; // Show full details on click
            readMoreButton.textContent = 'Read Less';
        };
        detailsContainer.innerHTML = `${truncatedDetails} ${readMoreButton.outerHTML}`;
        pastLaunchesDiv.appendChild(launchElement);
        pastLaunchesDiv.appendChild(detailsContainer);
    });
})
.catch(error => console.error('Error:', error));






   

  
    });


    

   

    
