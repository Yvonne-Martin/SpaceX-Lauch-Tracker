document.addEventListener('DOMContentLoaded', function() {
    const upcomingLaunchesDiv = document.getElementById('upcoming-launches');
    const pastLaunchesDiv = document.getElementById('past-launches');
    // Function to create a launch element
    function createLaunchElement(launch) {
        const launchElement = document.createElement('div');
        launchElement.classList.add('launch');
        const launchName = document.createElement('h3');
        launchName.textContent = launch.name;
        const launchDate = document.createElement('p');
        launchDate.textContent = `Date: ${new Date(launch.date_utc).toLocaleDateString()}`;
        const launchDetails = document.createElement('p');
        launchDetails.textContent = `Details: ${launch.details || 'No details available'}`;
        // TODO: Create an image element and add a placeholder image for each item
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
        //filter
        const filterLaunchesByYear=(launches,year)=>{
            if(!year) return launches;
            return launches.filter(launch => new
               Date(launch.date_utc).getFullYear().toString() === year );
        };
        const init = async()=>{
            const launches =await fetchLauches();
            displayLaunches(launches),
           yearFilterElement.addEventListener('input',(event)=>{
                const year = event.target.value;
              const filteredLaunches=year?filterLaunchesByYear(launches,year):launches;
               displayLaunches(filteredLaunches)
          });
        };
     
 });