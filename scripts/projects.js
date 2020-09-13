let projects = {
    'project1': 'all live website',
    'project2': 'all website',
    'project3': 'all mobile'
}

let filterProjects = function(dataFind) {
    Object.keys(projects).forEach(proj => {
        // Find the project element
        let foundProject = document.querySelector('#' + proj)
        foundProject.classList.remove("d-none");
        // Check if element belongs in query
        if(!projects[proj].includes(dataFind)){
            foundProject.classList.add("d-none");
        }
    })
}